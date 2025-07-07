"use client";

import * as React from "react";
import { OTPInput, SlotProps } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

type InputOTPProps = Omit<React.ComponentProps<typeof OTPInput>, "render"> & {
  containerClassName?: string;
};

function InputOTP({
  className,
  containerClassName,
  maxLength = 6,
  ...props
}: InputOTPProps) {
  return (
    <OTPInput
      containerClassName={cn(
        "group flex items-center has-[:disabled]:opacity-30",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      maxLength={maxLength}
      render={({ slots }) => (
        <>
          <div className="flex">
            {slots.slice(0, maxLength / 2).map((slot, idx) => (
              <InputOTPSlot key={idx} {...slot} />
            ))}
          </div>

          <InputOTPSeparator />

          <div className="flex">
            {slots.slice(maxLength / 2).map((slot, idx) => (
              <InputOTPSlot key={idx} {...slot} />
            ))}
          </div>
        </>
      )}
      {...props}
    />
  );
}

function InputOTPSlot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-10 h-14 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-4 outline-accent-foreground": props.isActive }
      )}
    >
      {props.char}
      {props.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-border">
        <MinusIcon />
      </div>
    </div>
  );
}

export { InputOTP, InputOTPSlot, InputOTPSeparator };
