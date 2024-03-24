"use client";

import { DataTable } from "@/components/admin/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState, useTransition } from "react";
import PageTitle from "@/components/admin/page-title";
import { Book } from "@/models";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/actions/admin/product";
import Link from "next/link";
import { Router } from "next/router";
import { usdFormatter } from "@/lib/utils";

type Props = {};

const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "bookId",
    header: "ID",
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
    header: "author",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
    cell: ({ row }) => {
      return usdFormatter.format(row.getValue("costPrice"));
    },
  },
  {
    accessorKey: "sellPrice",
    header: "Sell Price",
    cell: ({ row }) => {
      return usdFormatter.format(row.getValue("sellPrice"));
    },
  },
  {
    accessorKey: "",
    header: " ",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Button variant="secondary">
            <Link href={`/admin/products/${row.getValue("bookId")}`}>
              Detail
            </Link>
          </Button>
          <Button variant="outline">
            <Link href={`/admin/products/${row.getValue("bookId")}/edit`}>
              Edit
            </Link>
          </Button>
          <Button variant="destructive">
            <Link href={`/admin/products/${row.getValue("bookId")}/delete`}>
              Delete
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export default function ProductsAdminPage({}: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      getBooks().then((data) => {
        console.log(data);
        setBooks(data.payload);
      });
    });
  }, []);
  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex items-center justify-between mb-4">
        <PageTitle title="Products" />
        <Button>
          <Link href="/admin/products/create">Add new book</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={books} />
    </div>
  );
}
