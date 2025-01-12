import { Label } from "@/components/ui/label";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button.tsx"


export default function Datepick({ label }) {
  const CustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <Button className={className} onClick={onClick} ref={ref} type="button" variant="ghost">
        {value}
      </Button>
    ),
  );
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex items-center gap-3">
      <Label className="font-bold space-y-1">{label}</Label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<CustomInput />}
      />
    </div>
  );
}
