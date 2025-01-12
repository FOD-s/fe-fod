import ErrorInputForm from "@/components/atoms/ErrorInputForm";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const SelectComponent = ({
  name,
  label,
  errors,
  placeholder,
  control,
  options,
  onValueChange, // Add this prop
}) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="font-bold">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) onValueChange(value); // Call the callback
            }}
            {...field}
          >
            <SelectTrigger  className="!shadow-neumorphism-inner">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-bg-neumorphism shadow-neumorphism">
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && <ErrorInputForm message={errors[name].message} />}
    </div>
  );
};

export default SelectComponent;
