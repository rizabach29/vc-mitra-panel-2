"use client";

import { cn } from "@/lib/utils";
import { PatternFormat } from "react-number-format";
import React, { useState } from "react";
import { Input, InputProps } from "./input";
import { Button } from "./button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: string | number | null | undefined;
  onValueChange?: (e: number | undefined) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <PatternFormat
        className={cn(
          "flex h-9 w-full rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        format="### ### ### ### ###"
        type="tel"
        value={value}
        disabled={props.disabled}
        onValueChange={(v, s) => {
          if (props.onValueChange) props.onValueChange(v.floatValue);
        }}
        placeholder={props.placeholder}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";

const PhoneInputIndo = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <div
        className={cn(
          "overflow-clip flex items-center h-9 w-full rounded-full border border-input bg-transparent  text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <div className="bg-slate-100 h-full flex justify-center items-center px-3 text-muted-foreground font-semibold">
          <p>+62</p>
        </div>
        <PatternFormat
          className="w-full file:border-0 focus-visible:outline-none px-3 h-full disabled:cursor-not-allowed disabled:opacity-50"
          format="### ### ### ###"
          type="tel"
          value={
            (value as string).substring(0, 2) == "62"
              ? (value as string).replace(/\D/g, "").substring(2)
              : value
          }
          disabled={props.disabled}
          onValueChange={(v, s) => {
            if (props.onValueChange) props.onValueChange(v.floatValue);
          }}
          placeholder={props.placeholder}
        />
      </div>
    );
  }
);
PhoneInputIndo.displayName = "PhoneInputIndo";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOpenIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeClosedIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PhoneInput, PhoneInputIndo, PasswordInput };
