import { GetOrderDetailByOrderId } from "@/actions/admin/order";
import { CollapsibleItemProps, OrderDetail } from "@/models";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, useTransition } from "react";
import { DataTable } from "../data-table";
import PageTitle from "../page-title";
import { usdFormatter } from "@/lib/utils";

const columns: ColumnDef<OrderDetail>[] = [
  {
    accessorKey: "bookId",
    header: "BookId",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`/images/books/book_1.webp`}
            alt="product-image"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "bookName",
    header: "Name",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "publisherName",
    header: "Publisher",
  },
  {
    accessorKey: "sellPrice",
    header: "Price",
    cell: ({ row }) => {
      return usdFormatter.format(Number(row.getValue("sellPrice")) ?? 0);
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      return row.getValue("discount") + "%";
    },
  },
  {
    accessorKey: "",
    header: "Sale Amount",
    cell: ({ row }) => {
      return usdFormatter.format(
        Number(row.getValue("sellPrice")) *
          Number(row.getValue("quantity")) *
          (1 - Number(row.getValue("discount")) / 100) ?? 0
      );
    },
  },
];
export default function OrderDetailTable({ parentId }: CollapsibleItemProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [isPending, startTransition] = useTransition();
  var orderIdNum = Number(parentId);
  useEffect(() => {
    startTransition(() => {
      GetOrderDetailByOrderId(orderIdNum).then((data) => {
        setOrderDetails(data.payload);
      });
    });
  }, []);
  if (isNaN(orderIdNum)) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Order #{parentId} was not found!
            </h1>
          </div>
        </div>
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Loading....
            </h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5  w-full">
      <h2>{`Order Details #${parentId}`}</h2>
      <DataTable columns={columns} data={orderDetails} />
    </div>
  );
}
