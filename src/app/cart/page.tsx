"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { CartState } from "../books/page";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface CheckOut {
  bookId: number;
  quantity: number;
  discount: number;
}

const deleteCart = () => {
  localStorage.removeItem("cart");
};

export default function Cart() {
  const [isClient, setIsClient] = useState(false);
  const [cartData, setCartData] = useState<CartState[]>([]);
  const [address, setAddress] = useState("");
  const { data: session } = useSession();
  const checkout = (token: string | undefined) => {
    const body: CheckOut[] = cartData.map((book) => ({
      bookId: parseInt(book.bookId),
      quantity: book.quantity,
      discount: 0,
    }));

    if (body.length > 0) {
      axios
        .post(
          "http://localhost:7105/api/Orders",
          {
            shipAddress: address,
            orderDetails: body,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, //the token is a variable which holds the token
            },
          }
        )
        .then((res) => {
          swal("Success!", "Checkout successfully!", "success");
          deleteCart();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal("Error!", "Cart is empty!", "error");
    }
  };

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
      <div className="flex justify-end gap-12">
        <Button type="button" onClick={() => deleteCart()} className="text-lg">
          Remove all
        </Button>
        <Input
          type="text"
          placeholder="Ship address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <Button
          type="button"
          onClick={() => {
            if (!address) {
              swal(
                "Missing ship address!",
                "Please enter ship address!",
                "error"
              );
            }
            checkout(session?.user.accessToken);
          }}
          className="text-lg"
        >
          Checkout
        </Button>
      </div>
      <DataTable columns={columns} data={cartData} />
    </div>
  );
}
