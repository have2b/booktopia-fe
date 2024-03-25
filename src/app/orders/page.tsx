"use client";

import { Order } from "@/models";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    axios
      .get<{ payload: Order[] }>(`http://localhost:7105/api/orders/user`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        setOrders(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [session?.user.accessToken]);
  return (
    <>
      <DataTable columns={columns} data={orders} />
    </>
  );
}
