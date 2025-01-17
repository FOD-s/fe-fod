import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";

export default function CheckboxCustom({ label, name, control }) {
	return (
		<div className="flex items-center space-x-2">
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Checkbox
						id={name}
						name={name}
						checked={field.value}
						onCheckedChange={field.onChange}
					/>
				)}
			/>
			<label
				htmlFor={name}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{label}
			</label>
		</div>
	);
}
