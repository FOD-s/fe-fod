import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function RadioButton({ className, defaultValue, options, control, name }) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<RadioGroup
					defaultValue={defaultValue}
					className="w-1/2 py-2"
					value={field.value}
					onValueChange={field.onChange}
				>
					<div className={className}>
						{options &&
							options?.map((option) => (
								<div key={option.value} className="flex items-center space-x-2">
									<RadioGroupItem value={option.value} id={option.value}  />
									<Label htmlFor={option.value}>{option.label}</Label>
								</div>
							))}
					</div>
				</RadioGroup>
			)}
		/>
	);
}

export default RadioButton;
