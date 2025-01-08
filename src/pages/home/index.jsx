import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
	return (
		<div>
			<div className="block p-5 rounded-md mt-5 mb-2 bg-primary w-[80%] m-auto flex-center gap-3 flex-col">
				<h1 className="w-1/2 pt-2 mb-5 text-xl font-bold text-center text-white">
					Boilerplate Project React + Vite + JavaScript
					<div className="text-sm divider text-slate-900">ROUTER</div>
					React router dom
					<div className="text-sm divider text-slate-900">STORE</div>
					Redux Toolkit + Redux Persist
					<div className="text-sm divider text-slate-900">FORM VALIDATION</div>
					Yup + React hook form
					<div className="text-sm divider text-slate-900">DATA TABLE</div>
					React data table component
					<div className="text-sm divider text-slate-900">
						CSS REACT COMPONENT
					</div>
					Material UI
					<div className="text-sm divider text-slate-900">CUSTOM CSS</div>
					Tailwind + Daisy
				</h1>
				<div className="gap-3 flex-center">
					<Link to="/login" className="btn btn-active btn-secondary">
						Simulasi Redux Store
					</Link>

					<Link to="/vehicle" className="btn btn-active btn-warning">
						Simulasi Data Table Pagination
					</Link>
				</div>
			</div>
			<div className="z-50 toast">
				<div className="alert alert-info">
					<span>Daisy connected successfully.</span>
				</div>
			</div>
			<Button>Click me</Button>
		</div>
	);
};

export default Home;
