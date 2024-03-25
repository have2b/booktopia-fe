"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CartState } from "../books/page";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const deleteCart = () => {
  localStorage.removeItem("cart");
};

export default function Cart() {
  const [isClient, setIsClient] = useState(false);
  const [cartData, setCartData] = useState<CartState[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const data = localStorage.getItem("cart");
      setCartData(data ? JSON.parse(data) : []);
    }
  }, [isClient, cartData]);

  return (
    <div className="container mx-auto py-10">
      <Button type="button" onClick={() => deleteCart()}>
        Remove all
      </Button>
      <DataTable columns={columns} data={cartData} />
    </div>
  );
}
