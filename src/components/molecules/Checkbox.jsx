import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxDemo({ label, name, control, schema }) {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				id={name}
				name={name}
				control={control}
				schema={schema}
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
