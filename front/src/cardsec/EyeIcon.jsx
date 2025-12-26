import React from "react";

export default function EyeIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 7C2.8 3.5 6.4 1 11 1C15.6 1 19.2 3.5 21 7C19.2 10.5 15.6 13 11 13C6.4 13 2.8 10.5 1 7Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        cx="11"
        cy="7"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
