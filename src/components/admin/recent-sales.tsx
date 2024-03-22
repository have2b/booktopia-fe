"use client";
import { getRecentSales } from "@/actions/admin/dashboard";
import SalesCard, { SalesProps } from "@/components/admin/sales-card";
import { useEffect, useTransition } from "react";

let userSalesData: Array<SalesProps> = [];
export default function RecentSales() {
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      getRecentSales().then((data) => {
        userSalesData = data.payload;
      });
    });
  }, []);
  return (
    <>
      <section>
        <p>Recent Sales</p>
        <p className="text-sm text-gray-400"></p>
      </section>
      {userSalesData.map((d, i) => (
        <SalesCard
          key={i}
          phoneNumber={d.phoneNumber}
          email={d.email}
          name={d.name}
          saleAmount={d.saleAmount}
        />
      ))}
    </>
  );
}
