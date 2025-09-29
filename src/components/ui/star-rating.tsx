"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
// SVG for half star
const StarHalfIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill="url(#half)"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);
import React, { useState, useCallback, KeyboardEvent } from "react";

// StarRating component for shadcn-style apps
// - Uses Tailwind utility classes (shadcn default)
// - Accessible (keyboard + screen reader)
// - Controlled or uncontrolled via `value` + `onChange`
// - Props: count (default 5), value, defaultValue, readOnly, size

type StarRatingProps = {
  count?: number;
  value?: number; // controlled value (0..count, supports half e.g. 3.5)
  defaultValue?: number; // uncontrolled initial value
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number; // icon size
  className?: string;
};

export default function StarRating({
  count = 5,
  value,
  defaultValue = 0,
  onChange,
  readOnly = false,
  size = 20,
  className = "",
}: StarRatingProps) {
  const [internal, setInternal] = useState<number>(defaultValue);

  const current = typeof value === "number" ? value : internal;

  const setValue = useCallback(
    (v: number) => {
      if (readOnly) return;
      // Clamp to nearest 0.5
      const rounded = Math.max(0, Math.min(count, Math.round(v * 2) / 2));
      if (typeof value !== "number") setInternal(rounded);
      onChange?.(rounded);
    },
    [onChange, readOnly, value, count]
  );

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (readOnly) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setValue(idx + 1);
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setValue(Math.min(count, current + 0.5));
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setValue(Math.max(0, current - 0.5));
      return;
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      role="radiogroup"
      aria-label="Star rating"
    >
      {Array.from({ length: count }).map((_, idx) => {
        const starValue = idx + 1;
        let icon;
        if (current >= starValue) {
          icon = <StarFilledIcon style={{ width: size, height: size }} />;
        } else if (current >= starValue - 0.5) {
          icon = <StarHalfIcon size={size} />;
        } else {
          icon = <StarIcon style={{ width: size, height: size }} />;
        }
        return (
          <span key={idx} className="relative flex">
            <button
              type="button"
              role="radio"
              aria-checked={current >= starValue}
              aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
              onClick={() => setValue(starValue)}
              onKeyDown={(e) => handleKey(e, idx)}
              disabled={readOnly}
              className={`p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-transform transform hover:scale-110 ${
                current >= starValue - 0.5
                  ? "text-yellow-500"
                  : "text-muted-foreground"
              }`}
              title={`${starValue} / ${count}`}
              style={{ zIndex: 2 }}
            >
              {icon}
            </button>
            {/* Half star click area */}
            {!readOnly && (
              <button
                type="button"
                aria-label={`Half ${starValue} star`}
                onClick={() => setValue(starValue - 0.5)}
                className="absolute left-0 top-0 w-1/2 h-full opacity-0 cursor-pointer"
                style={{ zIndex: 3 }}
                tabIndex={-1}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}

/*
Usage examples:

// Controlled
const [rating, setRating] = useState(3);
<StarRating value={rating} onChange={setRating} />

// Uncontrolled
<StarRating defaultValue={2} onChange={(v) => console.log(v)} />

// Read-only (for display)
<StarRating value={4} readOnly />

Styling notes:
- This component uses Tailwind utility classes consistent with shadcn defaults.
- If you use shadcn's theme tokens, replace text-yellow-500 / text-muted-foreground with the token classes you prefer.
*/
