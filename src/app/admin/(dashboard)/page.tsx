/** @format */

import PageTitle from "@/components/admin/page-title";
import { CardContent } from "@/components/admin/card";
import BarChart from "@/components/admin/bar-chart";
import { StatisticsByDateRange } from "@/components/admin/statistics-by-date-range";
import RecentSales from "@/components/admin/recent-sales";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <StatisticsByDateRange />
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Revenue Overview</p>
          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <RecentSales />
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
