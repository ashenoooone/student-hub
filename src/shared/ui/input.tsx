import * as React from "react";

import { cn } from "@/shared/utils";
import { Label } from "@radix-ui/react-label";
import { Typography } from "./typography";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  inputStyles?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, error, inputStyles, required, icon, ...props },
    ref
  ) => {
    let inputElement = (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          inputStyles
        )}
        ref={ref}
        required={required}
        {...props}
      />
    );

    if (label) {
      inputElement = (
        <Label>
          {label}{" "}
          {required && <span className="text-red-500 font-bold">*</span>}
          {inputElement}
        </Label>
      );
    }

    return (
      <div className={cn("relative", className)}>
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}
        {inputElement}
        {error && (
          <Typography affects={"error"} variant={"p"}>
            {error}
          </Typography>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
