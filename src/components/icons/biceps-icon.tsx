
import { SVGProps } from "react";

export function BicepsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 4c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6l-5 1-5-1V4z" />
      <path d="M11 9 9 4h6l-2 5" />
      <path d="M18 11v5c0 3-2 4-6 4H7c-1.1 0-2-.9-2-2v-5.5C5 9.2 7.2 7 10 7h1c.8 0 1.7.2 2 .5" />
    </svg>
  );
}
