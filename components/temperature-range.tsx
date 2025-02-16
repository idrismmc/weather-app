"use client";
import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  minStepsBetweenThumbs?: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
};

const TemperatureRange = React.forwardRef(
  (
    {
      className,
      min,
      max,
      formatLabel,
      value,
      onValueChange,
      ...props
    }: SliderProps,
    ref
  ) => {
    const initialValues = Array.isArray(value) ? value : [min, max];

    const handleValueChange = (newValues: number[]) => {
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        value={initialValues}
        onValueChange={handleValueChange}
        disabled={true}
        className={cn(
          "relative flex w-full max-w-[17rem] touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow select-none overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-l from-blue-500 via-green-400 to-red-500" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Root>
    );
  }
);

TemperatureRange.displayName = SliderPrimitive.Root.displayName;

export { TemperatureRange };
