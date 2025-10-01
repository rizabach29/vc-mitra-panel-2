"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import React, { useState, useCallback, KeyboardEvent } from "react";

// StarRating component for shadcn-style apps
// - Uses Tailwind utility classes (shadcn default)
// - Accessible (keyboard + screen reader)
// - Controlled or uncontrolled via `value` + `onChange`
// - Props: count (default 5), value, defaultValue, readOnly, size

type StarRatingProps = {
  count?: number;
  value?: number; // controlled value (0..count, integer only)
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
      // Clamp to integer
      const rounded = Math.max(0, Math.min(count, Math.round(v)));
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
      setValue(Math.min(count, current + 1));
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setValue(Math.max(0, current - 1));
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
        const isActive = current >= starValue;
        return (
          <button
            key={idx}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
            onClick={() => setValue(starValue)}
            onKeyDown={(e) => handleKey(e, idx)}
            disabled={readOnly}
            className={`p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-transform transform hover:scale-110 ${
              isActive ? "text-yellow-500" : "text-muted-foreground"
            }`}
            title={`${starValue} / ${count}`}
            style={{ width: size, height: size }}
          >
            {isActive ? (
              <StarFilledIcon style={{ width: size, height: size }} />
            ) : (
              <StarIcon style={{ width: size, height: size }} />
            )}
          </button>
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
