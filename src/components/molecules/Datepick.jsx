import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Label } from "@/components/ui/label";

export default function Datepick({ label }) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}
