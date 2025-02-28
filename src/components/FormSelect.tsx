
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface FormSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: string[];
  required?: boolean;
  className?: string;
  error?: string;
}

const FormSelect = ({
  label,
  id,
  value,
  onChange,
  placeholder = "اختر...",
  options,
  required = false,
  className,
  error,
}: FormSelectProps) => {
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
        <Select
          value={value}
          onValueChange={onChange}
          onOpenChange={(open) => setIsFocused(open)}
        >
          <SelectTrigger
            id={id}
            className={cn(
              "w-full transition-all duration-200 border-2",
              isFocused
                ? "border-primary/30 ring-2 ring-primary/10"
                : "border-input",
              error && "border-destructive"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position="popper" align="end" className="min-w-[220px]">
            <div className="max-h-[300px] overflow-y-auto p-1">
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="cursor-pointer"
                >
                  {option}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none rounded-md ring-1 ring-primary/30 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default FormSelect;
