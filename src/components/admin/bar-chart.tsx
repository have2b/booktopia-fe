/** @format */
"use client";
import { getRevenueOverview } from "@/actions/admin/dashboard";
import { usdFormatter } from "@/lib/utils";
import React, { useEffect, useTransition } from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

type Props = {};

const revenueData = [
  {
    name: "Jan",
    total: 0,
  },
  {
    name: "Feb",
    total: 0,
  },
  {
    name: "Mar",
    total: 0,
  },
  {
    name: "Apr",
    total: 0,
  },
  {
    name: "May",
    total: 0,
  },
  {
    name: "Jun",
    total: 0,
  },
  {
    name: "Jul",
    total: 0,
  },
  {
    name: "Aug",
    total: 0,
  },
  {
    name: "Sep",
    total: 0,
  },
  {
    name: "Oct",
    total: 0,
  },
  {
    name: "Nov",
    total: 0,
  },
  {
    name: "Dec",
    total: 0,
  },
];

export default function BarChart({}: Props) {
  const [isPending, startTransition] = useTransition();
  var currentYear = new Date().getFullYear();
  useEffect(() => {
    startTransition(() => {
      getRevenueOverview(currentYear).then((data) => {
        console.log(data);
        for (var i = 0; i < revenueData.length; i++) {
          revenueData[i].total = data.payload[i];
        }
      });
    });
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={revenueData}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => usdFormatter.format(value) ?? 0}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
