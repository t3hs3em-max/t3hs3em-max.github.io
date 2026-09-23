import type { SVGProps } from "react";

const paths = {
  arrowRight: <path d="M4 10h12m-5-5 5 5-5 5" />,
  arrowLeft: <path d="M16 10H4m5-5-5 5 5 5" />,
  arrowUpRight: <path d="M6 14 14 6M7 6h7v7" />,
  arrowDown: <path d="M10 4v12m-5-5 5 5 5-5" />,
  menu: <path d="M3 6h14M3 10h14M3 14h14" />,
  close: <path d="m5 5 10 10M15 5 5 15" />,
  sun: (
    <>
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 2.5v1.5M10 16v1.5M2.5 10H4m12 0h1.5M4.7 4.7l1 1m8.6 8.6 1 1m0-10.6-1 1m-8.6 8.6-1 1" />
    </>
  ),
  moon: <path d="M16.5 12.2A6.8 6.8 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3 6 7 5 7-5" />
    </>
  ),
  phone: <path d="M6.6 2.8 8.2 6a1 1 0 0 1-.3 1.2L6.6 8.3a10 10 0 0 0 5 5l1.1-1.3a1 1 0 0 1 1.2-.3l3.2 1.6a1 1 0 0 1 .5 1.1 3 3 0 0 1-3 2.6C8.3 17 3 11.7 3 5.4a3 3 0 0 1 2.6-3 1 1 0 0 1 1 .4Z" />,
  external: <path d="M8.5 4.5H5a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 5 16.5h9a1.5 1.5 0 0 0 1.5-1.5v-3.5M12 3.5h4.5V8M16 4l-7 7" />,
  check: <path d="m4 10.5 4 4 8-9" />,
  alert: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6.5v4M10 13.5h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 9v4.5M10 6.5h.01" />
    </>
  ),
  plus: <path d="M10 4v12M4 10h12" />,
  search: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13.5 13.5 3 3" />
    </>
  ),
  layers: <path d="m10 3 7 4-7 4-7-4 7-4Zm-7 7 7 4 7-4M3 13.5l7 4 7-4" />,
  grid: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" />
    </>
  ),
  cursor: <path d="M4 3.5 16 9l-5.2 1.6L9 16 4 3.5Z" />,
  pen: <path d="m12.5 3.5 4 4L7 17H3v-4l9.5-9.5Z" />,
  component: <path d="m10 3 3 3-3 3-3-3 3-3Zm4 4 3 3-3 3-3-3 3-3Zm-8 0 3 3-3 3-3-3 3-3Zm4 4 3 3-3 3-3-3 3-3Z" />,
  frame: <path d="M6 2.5v15M14 2.5v15M2.5 6h15m-15 8h15" />,
  play: <path d="M6.5 4.5v11l9-5.5-9-5.5Z" />,
  zoom: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13.5 13.5 3 3M9 6.5v5M6.5 9h5" />
    </>
  ),
  download: <path d="M10 3v10m-4-4 4 4 4-4M4 16.5h12" />,
  quote: <path d="M7.5 5C5 5.6 3.5 7.6 3.5 10.5V15h5v-5H6c0-1.5.8-2.7 2.3-3.2L7.5 5Zm8 0c-2.5.6-4 2.6-4 5.5V15h5v-5H14c0-1.5.8-2.7 2.3-3.2L15.5 5Z" />,
  spark: <path d="M10 2.5 11.8 8l5.7 2-5.7 2L10 17.5 8.2 12l-5.7-2 5.7-2L10 2.5Z" />,
  sparkle: <path d="M10 2.5 11.8 8l5.7 2-5.7 2L10 17.5 8.2 12l-5.7-2 5.7-2L10 2.5Z" />,
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
