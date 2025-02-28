
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface GenerateButtonProps extends ButtonProps {
  isLoading?: boolean;
  label: string;
  loadingLabel?: string;
  icon?: React.ReactNode;
}

const GenerateButton = ({
  isLoading = false,
  label,
  loadingLabel = "جاري المعالجة...",
  icon,
  className,
  ...props
}: GenerateButtonProps) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isLoading && "cursor-not-allowed opacity-90",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      <span
        className={cn(
          "flex items-center gap-2 transition-all duration-300",
          isLoading && "opacity-0"
        )}
      >
        {icon}
        {label}
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-all duration-300",
          isLoading && "opacity-100"
        )}
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        {loadingLabel}
      </span>
      {isLoading && (
        <span className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
      )}
    </Button>
  );
};

export default GenerateButton;
