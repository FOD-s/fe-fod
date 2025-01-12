import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

function Modal(props) {
	return (
		<Dialog open={props.isDialogOpen} onOpenChange={props.onOpenChange}>
			<DialogContent className="w-full md:w-[50%] p-0 shadow-lg overflow-auto bg-bg-neumorphism !max-w-2xl">
				<DialogHeader>
					<DialogTitle className="py-5 text-xl text-center border-b">
						{props.title}
					</DialogTitle>
				</DialogHeader>
				{props.children}
			</DialogContent>
		</Dialog>
	);
}

export default Modal;
