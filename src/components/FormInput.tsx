
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface FormInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type?: "text" | "email" | "password" | "number";
  error?: string;
}

const FormInput = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  className,
  type = "text",
  error,
}: FormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            isFocused ? "text-primary" : "text-foreground"
          )}
        >
          {label}
          {required && <span className="text-destructive mr-1">*</span>}
        </Label>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-destructive"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          type={type}
          className={cn(
            "transition-all duration-200 border-2",
            isFocused
              ? "border-primary/30 ring-2 ring-primary/10"
              : "border-input",
            error && "border-destructive"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none rounded-md ring-1 ring-primary/30 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default FormInput;
