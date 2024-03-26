"use client";

import { DataTable } from "@/components/admin/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/admin/page-title";
import { cn } from "@/lib/utils";
import { User } from "@/models";
import { GetUsers } from "@/actions/admin/user";

type Props = {};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "userName",
    header: "UserName",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("userName")} </p>
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isActive",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("isActive") === false,
            "bg-green-200": row.getValue("isActive") === true,
          })}
        >
          {row.getValue("isActive") ? "True" : "False"}
        </div>
      );
    },
  },
];

export default function UsersPage({}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    GetUsers().then((data) => {
      console.log(data.payload);
      if (data.payload) {
        setUsers(data.payload);
      } else {
        setUsers([]);
      }
    });
  }, []);
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Users" />
      <DataTable columns={columns} data={users} />
    </div>
  );
}
