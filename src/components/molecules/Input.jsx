import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ErrorInputForm from "@/components/atoms/ErrorInputForm";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

const InputComponent = ({
  name,
  label,
  type,
  errors,
  placeholder,
  control,
  disabled,
}) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="font-bold">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={
          label === "Alamat"
            ? ({ field }) => (
                <Textarea
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  {...field}
                  className="bg-bg-neumorphism !shadow-neumorphism-inner"
                />
              )
            : ({ field }) => (
                <Input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  {...field}
                  className="bg-bg-neumorphism !shadow-neumorphism-inner"
                />
              )
        }
      />
      {errors[name] && <ErrorInputForm message={errors[name].message} />}
    </div>
  );
};

export default InputComponent;
