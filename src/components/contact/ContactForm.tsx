"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name (at least 2 characters).";
  if (!EMAIL.test(v.email.trim())) e.email = "Please enter a valid email address, like name@example.com.";
  if (v.message.trim().length < 20) e.message = "Please tell me a little more (at least 20 characters).";
  return e;
}

/**
 * Accessible contact form: labels tied to inputs, errors announced via
 * aria-describedby + a live summary, focus moved to the first invalid field.
 * Sends to NEXT_PUBLIC_FORM_ENDPOINT when set; otherwise opens the visitor's
 * mail client with the message pre-filled so the form always works.
 */
export function ContactForm() {
  const reduce = useReducedMotion();
  const uid = useId();
  const [values, setValues] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if ((form.elements.namedItem("company") as HTMLInputElement | null)?.value) return; // honeypot
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    const first = (Object.keys(errs) as (keyof Fields)[])[0];
    if (first) {
      ({ name: nameRef, email: emailRef, message: messageRef })[first].current?.focus();
      return;
    }
    if (!site.formEndpoint) {
      const subject = encodeURIComponent(`Project enquiry from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }
    try {
      setStatus("sending");
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const errorList = (Object.keys(errors) as (keyof Fields)[]).filter((k) => touched[k] && errors[k]);
  const fieldCls = (k: keyof Fields) =>
    cn(
      "w-full rounded-[var(--radius-md)] border bg-surface px-4 text-[0.9375rem] text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4",
      touched[k] && errors[k] ? "border-danger focus:border-danger focus:ring-danger/15" : "border-border hover:border-border-strong focus:border-accent focus:ring-accent/15",
    );

  if (status === "sent") {
    return (
      <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOut }} className="surface-card flex flex-col items-start gap-4 p-8" role="status" aria-live="polite">
        <span className="grid size-12 place-items-center rounded-full bg-success-soft text-success">
          <Icon name="check" size={22} strokeWidth={2.25} />
        </span>
        <h3 className="text-h3 font-medium text-ink">Message sent</h3>
        <p className="text-text-2">Thanks for reaching out. I&apos;ll reply to your email within a day or two.</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card flex flex-col gap-5 p-6 md:p-8" aria-describedby={`${uid}-help`}>
      <p id={`${uid}-help`} className="text-small text-muted">
        All fields are required. {site.formEndpoint ? "" : "Submitting opens your email app with the message ready to send."}
      </p>

      <AnimatePresence>
        {errorList.length > 0 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            role="alert"
            className="overflow-hidden rounded-[var(--radius-md)] border border-danger/30 bg-danger-soft px-4 py-3 text-small text-danger"
          >
            <p className="font-medium">Please fix the following:</p>
            <ul className="mt-1 list-disc pl-5">
              {errorList.map((k) => (
                <li key={k}>
                  <a href={`#${uid}-${k}`} className="underline underline-offset-2">
                    {errors[k]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-name`} className="text-small font-medium text-ink">
            Name
          </label>
          <input ref={nameRef} id={`${uid}-name`} name="name" type="text" autoComplete="name" required value={values.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={Boolean(touched.name && errors.name)} aria-describedby={touched.name && errors.name ? `${uid}-name-err` : undefined} placeholder="Your name" className={cn(fieldCls("name"), "h-12")} />
          {touched.name && errors.name && (
            <p id={`${uid}-name-err`} className="flex items-center gap-1.5 text-small text-danger">
              <Icon name="alert" size={14} /> {errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-email`} className="text-small font-medium text-ink">
            Email
          </label>
          <input ref={emailRef} id={`${uid}-email`} name="email" type="email" autoComplete="email" inputMode="email" required value={values.email} onChange={set("email")} onBlur={blur("email")} aria-invalid={Boolean(touched.email && errors.email)} aria-describedby={touched.email && errors.email ? `${uid}-email-err` : undefined} placeholder="name@example.com" className={cn(fieldCls("email"), "h-12")} />
          {touched.email && errors.email && (
            <p id={`${uid}-email-err`} className="flex items-center gap-1.5 text-small text-danger">
              <Icon name="alert" size={14} /> {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <label htmlFor={`${uid}-message`} className="text-small font-medium text-ink">
            Message
          </label>
          <span className="font-mono text-[0.6875rem] text-muted" aria-hidden>
            {values.message.trim().length} chars
          </span>
        </div>
        <textarea ref={messageRef} id={`${uid}-message`} name="message" required rows={6} value={values.message} onChange={set("message")} onBlur={blur("message")} aria-invalid={Boolean(touched.message && errors.message)} aria-describedby={touched.message && errors.message ? `${uid}-message-err` : undefined} placeholder="What are you building, who is it for, and when do you need it?" className={cn(fieldCls("message"), "min-h-[9rem] resize-y py-3")} />
        {touched.message && errors.message && (
          <p id={`${uid}-message-err`} className="flex items-center gap-1.5 text-small text-danger">
            <Icon name="alert" size={14} /> {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: invisible to people, tempting to bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" icon="arrowRight" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-small text-danger">
            Something went wrong. Please email me directly at{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
        {status === "mailto" && (
          <p role="status" className="text-small text-text-2">
            Your email app should have opened. If not, write to{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
