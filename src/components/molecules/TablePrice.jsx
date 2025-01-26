import { formatRupiah } from "@/utils/formatRupiah";
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
  etcPrice
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
              <h2>Harga Produk</h2>
            </td>
            <td className="text-right">
              <h2>{productPrice ? formatRupiah(productPrice) : "0"}</h2>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <h2 className="font-bold">Custom</h2>
            </td>
          </tr>
          {customPrice.map((item, index) => (
            <tr key={index}>
              <td>
                <h2>{item.label}</h2>
              </td>
              <td className="text-right">
                <h2>{item.value ? formatRupiah(item.value) : "0"}</h2>
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td>
              <h1>Jumlah</h1>
            </td>
            <td className="text-right">
              <h1>{totalPrice ? formatRupiah(totalPrice) : "0"}</h1>
            </td>
          </tr>

          {etcCustom.some(
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
                        <h2>{item.keterangan}</h2>
                      </td>
                      <td className="text-right">
                        <h2>{item.nominal ? formatRupiah(item.nominal) : "0"}</h2>
                      </td>
                    </tr>
                  ) : (
                    false
                  )
                )}
                <tr className="font-bold">
                  <td>
                    <h1>Jumlah</h1>
                  </td>
                  <td className="text-right">
                    <h1>{etcPrice ? formatRupiah(etcPrice) : "0"}</h1>
                  </td>
                </tr>
              </>
            )}
        </tbody>
      </table>
      <span className="flex justify-between font-bold px-3">
        <h1>Harga Final :</h1>
        <h1> {formatRupiah(totalPrice + etcPrice)}</h1>
      </span >

    </>
  );
}
