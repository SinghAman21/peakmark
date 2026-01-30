"use client";

import * as React from "react";
import { toast as sonnerToast } from "sonner";

type ToastAction = {
  label: string;
  onClick: () => void;
};

type ToastInput = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastAction;
  duration?: number;
};

function toast({ title, description, action, duration }: ToastInput) {
  const message = title ?? description ?? "";
  const options = {
    description: title ? description : undefined,
    action,
    duration,
  } as const;

  return sonnerToast(message, options);
}

function useToast() {
  return { toast } as const;
}

export { useToast, toast };
