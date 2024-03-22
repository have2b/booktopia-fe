"use client";
import { getStatisticsByDateRange } from "@/actions/admin/dashboard";
import Card, { CardProps } from "@/components/admin/card";
import { DateRangePickerForm } from "@/components/admin/date-range-picker";
import { usdFormatter } from "@/lib/utils";
import { DateRangePickerSchema } from "@/schemas";
import { CreditCard, DollarSign } from "lucide-react";
import { useState, useTransition } from "react";
import { z } from "zod";
const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: "$0",
    icon: DollarSign,
  },
  {
    label: "Sales",
    amount: "+0",
    icon: CreditCard,
  },
  {
    label: "Profit",
    amount: "$0",
    icon: DollarSign,
  },
];
// usd formatter.

export function StatisticsByDateRange() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  function onSubmit(values: z.infer<typeof DateRangePickerSchema>) {
    setError("");
    startTransition(() => {
      getStatisticsByDateRange(values).then((data) => {
        setError(data.error?.message);
        cardData[0].amount = `${
          usdFormatter.format(data.payload.revenue) ?? 0
        }`;
        cardData[1].amount = `${data.payload.numberOfOrders ?? 0}`;
        cardData[2].amount = `${usdFormatter.format(data.payload.profit) ?? 0}`;
      });
    });
  }
  return (
    <>
      <div className="flex items-center space-x-2">
        <DateRangePickerForm
          error={error}
          handleSubmit={onSubmit}
          isPending={isPending}
        />
      </div>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all xl:grid-cols-3">
        {cardData.map((d, i) => (
          <Card key={i} amount={d.amount} icon={d.icon} label={d.label} />
        ))}
      </section>
    </>
  );
}
