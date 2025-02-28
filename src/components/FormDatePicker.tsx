
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface FormDatePickerProps {
  label: string;
  id: string;
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

const FormDatePicker = ({
  label,
  id,
  value,
  onChange,
  placeholder = "اختر تاريخًا...",
  required = false,
  className,
  error,
}: FormDatePickerProps) => {
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
        <Popover onOpenChange={setIsFocused}>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className={cn(
                "w-full justify-between text-right transition-all duration-200 border-2",
                isFocused
                  ? "border-primary/30 ring-2 ring-primary/10"
                  : "border-input",
                error && "border-destructive"
              )}
            >
              {value ? (
                format(value, "dd/MM/yyyy", { locale: ar })
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
              locale={ar}
            />
          </PopoverContent>
        </Popover>
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none rounded-md ring-1 ring-primary/30 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default FormDatePicker;
