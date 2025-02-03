import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function RadioButton({
	className,
	defaultValue,
	options,
	control,
	name,
	label,
	disabled,
}) {
	return (
		<div className="flex flex-col gap-1 justify-evenly">
			<Label htmlFor={name} className="font-bold">
				{label}
			</Label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<RadioGroup
						// defaultValue={defaultValue}
						value={field.value}
						onValueChange={field.onChange}
						className={className}
					>
						{options &&
							options?.map((option) => (
								<div key={option.value} className="flex items-center gap-2">
									<RadioGroupItem
										value={option.value}
										id={option.value}
										disabled={disabled}
									/>
									{option.label}
								</div>
							))}
					</RadioGroup>
				)}
			/>
		</div>
	);
}

export default RadioButton;
