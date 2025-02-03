import { formatRupiah } from "@/utils/formatRupiah";
import { Label } from "@/components/ui/label";
export default function TablePrice({
	productPrice,
	materialPrice,
	coverPrice,
	buttonPrice,
	drawerPrice,
	doubleBackrestPrice,
	foamPrice,
	totalPrice,
	etcCustom,
	etcPrice,
}) {
	const customPrice = [
		{
			label: "Harga Kain",
			value: materialPrice,
		},
		{
			label: "Harga Amparan",
			value: coverPrice,
		},
		{
			label: "Harga Kancing",
			value: buttonPrice,
		},
		{
			label: "Harga Laci",
			value: drawerPrice,
		},
		{
			label: "Harga Double Sandaran",
			value: doubleBackrestPrice,
		},
		{
			label: "Harga Busa",
			value: foamPrice,
		},
	];
	return (
		<>
			<table className="table table-price">
				<tbody>
					<tr>
						<td className="w-1/2">
							<label className="text-sm lg:text-xl">Harga Produk</label>
						</td>
						<td className="text-right">
							<label className="text-sm lg:text-xl">
								{productPrice ? formatRupiah(productPrice) : "0"}
							</label>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<label className="text-sm font-bold lg:text-xl">Custom</label>
						</td>
					</tr>
					{customPrice.map((item, index) => (
						<tr key={index}>
							<td>
								<label className="text-sm lg:text-xl">{item.label}</label>
							</td>
							<td className="text-right">
								<label className="text-sm lg:text-xl">
									{item.value ? formatRupiah(item.value) : "0"}
								</label>
							</td>
						</tr>
					))}
					<tr className="font-bold bg-yellow-100">
						<td>
							<Label className="font-bold text-md lg:text-2xl">Jumlah</Label>
						</td>
						<td className="text-right">
							<Label className="font-bold text-md lg:text-2xl">
								{totalPrice ? formatRupiah(totalPrice) : "0"}
							</Label>
						</td>
					</tr>

					{etcCustom?.some(
						(item) => item.keterangan !== "" && item.nominal !== ""
					) && (
						<>
							<tr>
								<td colSpan={2}>
									<h2 className="font-bold">Lainnya</h2>
								</td>
							</tr>
							{etcCustom.map((item, index) =>
								item.keterangan !== "" && item.nominal !== "" ? (
									<tr key={index}>
										<td>
											<label className="text-sm lg:text-xl">
												{item.keterangan}
											</label>
										</td>
										<td className="text-right">
											<label className="text-sm lg:text-xl">
												{item.nominal ? formatRupiah(item.nominal) : "0"}
											</label>
										</td>
									</tr>
								) : (
									false
								)
							)}
							<tr className="font-bold bg-yellow-100">
								<td>
									<Label className="font-bold text-md lg:text-2xl">
										Jumlah
									</Label>
								</td>
								<td className="text-right">
									<Label className="font-bold text-md lg:text-2xl">
										{etcPrice ? formatRupiah(etcPrice) : "0"}
									</Label>
								</td>
							</tr>
						</>
					)}
				</tbody>
			</table>
			<span className="flex justify-between p-3 my-3 font-bold bg-yellow-500 rounded-xl">
				<Label className="font-bold text-md lg:text-2xl">Harga Final </Label>
				<Label className="font-bold text-md lg:text-2xl">
					{" "}
					{formatRupiah(totalPrice + etcPrice)}
				</Label>
			</span>
		</>
	);
}
