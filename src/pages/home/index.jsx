import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WithAuth from "@/hoc/WithAuth";
import {
	ArrowUp,
	ArrowDown,
	CheckCircle,
	Clock,
	MoreVertical,
} from "lucide-react";
import Chart from "react-apexcharts";

const Home = () => {
	const options = {
		chart: {
			id: "basic-bar",
		},
		xaxis: {
			categories: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des"],
		},
	};
	const series = [
		{
			name: "Order",
			data: [30, 40, 45, 50, 49, 60, 70, 91],
		},
	];

	return (
		<div className="min-h-screen mt-3 bg-bg-neumorphism">
			<h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
			{/* <h2 className="mb-4 text-xl font-semibold">
				Comfortable Living Solutions
			</h2> */}
			<div className="grid gap-6">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					<div className="p-4 rounded-lg shadow-neumorphism bg-bg-neumorphism">
						<h3 className="text-gray-500">Total Sales</h3>
						<p className="text-2xl font-bold">$24,780</p>
						<p className="flex items-center text-green-500">
							<ArrowUp className="w-4 h-4 mr-1" /> +12% vs last month
						</p>
					</div>
					<div className="p-4 rounded-lg shadow-neumorphism bg-bg-neumorphism">
						<h3 className="text-gray-500">Orders</h3>
						<p className="text-2xl font-bold">143</p>
						<p className="flex items-center text-green-500">
							<ArrowUp className="w-4 h-4 mr-1" /> +8% vs last month
						</p>
					</div>
					<div className="p-4 rounded-lg shadow-neumorphism bg-bg-neumorphism">
						<h3 className="text-gray-500">Customers</h3>
						<p className="text-2xl font-bold">892</p>
						<p className="flex items-center text-green-500">
							<ArrowUp className="w-4 h-4 mr-1" /> +15% vs last month
						</p>
					</div>
					<div className="p-4 rounded-lg shadow-neumorphism bg-bg-neumorphism">
						<h3 className="text-gray-500">Avg. Order Value</h3>
						<p className="text-2xl font-bold">$173</p>
						<p className="flex items-center text-red-500">
							<ArrowDown className="w-4 h-4 mr-1" /> ↓ 4% vs last month
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<div className="p-6 rounded-lg shadow-neumorphism bg-bg-neumorphism lg:col-span-2">
						<span className="flex justify-between">

						<h3 className="mb-4 text-xl font-semibold">Sales Overview</h3>
						<p className="text-gray-500">Last year</p>
						</span>
						<Chart options={options} series={series} type="bar" width='100%' height={250}/>
					</div>

					<div className="p-6 rounded-lg shadow-neumorphism bg-bg-neumorphism">
						<h3 className="mb-4 text-xl font-semibold">Recent Orders</h3>
						<div className="grid gap-6">
							<div className="flex items-center justify-between p-2 rounded shadow-neumorphism-inner">
								<div>
									<p className="font-semibold">Sarah Johnson</p>
									<p className="text-gray-500">King Size Bed - $899</p>
								</div>
								<MoreVertical className="text-gray-500" />
							</div>
							<div className="flex items-center justify-between p-2 rounded shadow-neumorphism-inner">
								<div>
									<p className="font-semibold">Mike Peterson</p>
									<p className="text-gray-500">Queen Size Bed - $749</p>
								</div>
								<MoreVertical className="text-gray-500" />
							</div>
							<div className="flex items-center justify-between p-2 rounded shadow-neumorphism-inner">
								<div>
									<p className="font-semibold">Emily Davis</p>
									<p className="text-gray-500">Single Bed - $499</p>
								</div>
								<MoreVertical className="text-gray-500" />
							</div>
						</div>
					</div>
				</div>

				<div className="p-6 rounded-lg shadow-neumorphism bg-bg-neumorphism">
					<h3 className="mb-4 text-xl font-semibold">Latest Orders</h3>
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead>
								<tr>
									<th className="text-left">Order ID</th>
									<th className="text-left">Customer</th>
									<th className="text-left">Product</th>
									<th className="text-left">Date</th>
									<th className="text-left">Amount</th>
									<th className="text-left">Status</th>
									<th className="text-left">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>#ORD-7843</td>
									<td>Robert Wilson</td>
									<td>King Size Bed</td>
									<td>Mar 15, 2025</td>
									<td>$899</td>
									<td>
										<span className="flex items-center text-green-500">
											<CheckCircle className="w-4 h-4 mr-1" /> Completed
										</span>
									</td>
									<td>
										<button className="text-blue-500">View Details</button>
									</td>
								</tr>
								<tr>
									<td>#ORD-7842</td>
									<td>Emma Thompson</td>
									<td>Queen Size Bed</td>
									<td>Mar 14, 2025</td>
									<td>$749</td>
									<td>
										<span className="flex items-center text-yellow-500">
											<Clock className="w-4 h-4 mr-1" /> Pending
										</span>
									</td>
									<td>
										<button className="text-blue-500">View Details</button>
									</td>
								</tr>
								<tr>
									<td>#ORD-7841</td>
									<td>David Brown</td>
									<td>Single Bed</td>
									<td>Mar 14, 2025</td>
									<td>$499</td>
									<td>
										<span className="flex items-center text-blue-500">
											<Clock className="w-4 h-4 mr-1" /> Processing
										</span>
									</td>
									<td>
										<button className="text-blue-500">View Details</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WithAuth(Home);
