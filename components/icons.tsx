import Image from "next/image";

import { twMerge as cs } from "tailwind-merge";

import hyperGif from "~/public/hyper.gif";

export function ExternalLink({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

export function ChessRapid({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 87.17 103.3"
      className={className}
    >
      <path
        fill="currentColor"
        d="m43.43.04c3.35,0,6.71.1,10.05-.03,2.68-.1,3.8,1.02,3.59,3.68-.09,1.16-.06,2.33.04,3.49.31,3.51-.44,5.97-4.77,5.38-.8-.11-1.93-.32-2.19.95-.21,1.03.48,1.73,1.21,2.25.5.36,1.14.6,1.75.7,8.27,1.42,14.99,5.81,20.92,11.43,6.94,6.56,10.63,14.82,12.46,24.21,4.1,21.1-10.95,44.56-32.54,49.96-22.74,5.69-46.15-8.86-52.17-30.48-4.33-15.58-.64-29.1,9.18-40.9,5.27-6.33,12.2-11.38,20.63-13.49,1.24-.31,2.45-.76,3.65-1.2,1.25-.46,1.93-1.34,1.49-2.7-.44-1.36-1.45-1.72-2.76-1.23-3.33,1.25-4.16-.48-4.09-3.4C30.11-1.33,28.32.11,38.4.06c1.68,0,3.35,0,5.03,0,0,0,0-.01,0-.02Zm.08,30.29c-16.33,0-29.45,13.96-28.92,28.94.62,17.35,12.78,29.28,29.29,28.93,16.24-.34,28.22-11.9,28.41-28.57.19-17.3-12.36-28.52-28.78-29.31Z"
      />
      <path
        fill="currentColor"
        d="m50.8,59.75c-.03,4.98-4.5,10.32-7.29,10.14-3.39-.21-8.18-6.13-7.32-9.59,1.47-5.85,1.95-11.85,2.92-17.77.41-2.46,1.56-2.98,3.61-2.85,2.14.14,4.9-.93,5.44,2.54.99,6.31,1.9,12.63,2.63,17.53Z"
      />
    </svg>
  );
}

export function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cs("animate-spin h-4 w-4 text-white", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-50"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export function NextIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      className={className}
    >
      <defs>
        <circle id="path-1" cx="128" cy="128" r="128"></circle>
        <linearGradient
          x1="55.6325605%"
          y1="56.3850422%"
          x2="83.2279093%"
          y2="96.0801119%"
          id="nextjsLinearGradient-3"
        >
          <stop stopColor="#FFFFFF" offset="0%"></stop>
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="49.9534722%"
          y2="73.4375%"
          id="nextjsLinearGradient-4"
        >
          <stop stopColor="#FFFFFF" offset="0%"></stop>
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g>
        <mask id="mask-2" fill="white">
          <use xlinkHref="#path-1"></use>
        </mask>
        <g mask="url(#mask-2)">
          <circle fill="#000000" cx="128" cy="128" r="128"></circle>
          <path
            d="M212.6336,224.028444 L98.3352889,76.8 L76.8,76.8 L76.8,179.157333 L94.0282311,179.157333 L94.0282311,98.6788978 L199.109689,234.446222 C203.851378,231.273244 208.368356,227.790222 212.6336,224.028444 Z"
            fill="url(#nextjsLinearGradient-3)"
          ></path>
          <rect
            fill="url(#nextjsLinearGradient-4)"
            x="163.555556"
            y="76.8"
            width="17.0666667"
            height="102.4"
          ></rect>
        </g>
      </g>
    </svg>
  );
}

export function HyperIcon({ className }: { className?: string }) {
  return <Image src={hyperGif} alt="hyper" className={className} />;
}
