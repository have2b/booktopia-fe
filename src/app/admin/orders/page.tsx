"use client";
import { DataTable } from "@/components/admin/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState, useTransition } from "react";
import PageTitle from "@/components/admin/page-title";
import { cn, usdFormatter } from "@/lib/utils";
import { Order } from "@/models";
import { GetOrders } from "@/actions/admin/order";
import { CollapsibleTable } from "@/components/admin/orders/collapsible-table";
import OrderDetailTable from "@/components/admin/orders/order-detail-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "OrderId",
  },
  {
    accessorKey: "userId",
    header: "UserId",
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
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created time",
  },
  {
    accessorKey: "",
    header: " ",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Button variant="secondary">
            <Link href={`/admin/orders/${row.getValue("orderId")}`}>
              Detail
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export default function OrdersPage({}: Props) {
  const [orders, serOrders] = useState<Order[]>([]);
  const [isPending, startTransition] = useTransition();
  const getRowId = (row: Order) => row.orderId.toString();
  useEffect(() => {
    startTransition(() => {
      GetOrders().then((data) => {
        serOrders(data.payload);
      });
    });
  }, []);
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Orders" />
      <CollapsibleTable
        columns={columns}
        data={orders}
        getRowId={getRowId}
        CollapsibleItem={OrderDetailTable}
      />
    </div>
  );
}
