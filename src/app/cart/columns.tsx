"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CartState, loadFromLocal, saveToLocal } from "../books/page";

export const columns: ColumnDef<CartState>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="relative w-12 h-16">
          <Image src={"/images/books/book_1.webp"} alt="book" fill />
        </div>
      );
    },
  },
  {
    accessorKey: "bookName",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const quantity = parseInt(row.getValue("quantity"));

      return <div className="">{price * quantity}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      let cart: CartState[] = loadFromLocal();
      const add = (id: string) => {
        const existingIndex = cart.findIndex((item) => item.bookId === id);
        const updatedCart = [...cart];
        updatedCart[existingIndex].quantity++;
        saveToLocal(updatedCart);
        return;
      };
      const subtract = (id: string) => {
        const existingIndex = cart.findIndex((item) => item.bookId === id);
        if (existingIndex === -1) return; // If the book is not in the cart, do nothing

        const updatedCart = [...cart];
        updatedCart[existingIndex].quantity = Math.max(
          0,
          updatedCart[existingIndex].quantity - 1
        );
        // If the quantity is 0, remove the book from the cart
        if (updatedCart[existingIndex].quantity === 0) {
          updatedCart.splice(existingIndex, 1);
        }
        saveToLocal(updatedCart);
      };

      const book = row.original;
      return (
        <div className="flex justify-center gap-2">
          <Button type="button" onClick={() => add(book.bookId.toString())}>
            +
          </Button>
          <Button
            type="button"
            onClick={() => subtract(book.bookId.toString())}
          >
            -
          </Button>
        </div>
      );
    },
  },
];
