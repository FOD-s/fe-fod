import { Label } from "@/components/ui/label";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button.tsx"


export default function Datepick({ label,date,onChange }) {
  const CustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <Button className={className} onClick={onClick} ref={ref} type="button" variant="ghost">
        {value}
      </Button>
    ),
  );

  return (
    <div className="flex items-center gap-3">
      <Label className="space-y-1 font-bold">{label}</Label>
      <DatePicker
        selected={date}
        onChange={(date) => onChange(date)}
        customInput={<CustomInput />}
      />
    </div>
  );
}
