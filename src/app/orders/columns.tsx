"use client";

import { cn, usdFormatter } from "@/lib/utils";
import { Order } from "@/models";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "shipAddress",
    header: "Ship Address",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "saleAmount",
    header: "Sale Amount",
    cell: ({ row }) => {
      return usdFormatter.format(row.getValue("saleAmount"));
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("status") === 0,
            "bg-orange-200": row.getValue("status") === 1,
            "bg-green-200": row.getValue("status") === 2,
          })}
        >
          {row.getValue("status") === 0 && "Processing"}
          {row.getValue("status") === 1 && "Delivering"}
          {row.getValue("status") === 2 && "Shipped"}
        </div>
      );
    },
  },
];
