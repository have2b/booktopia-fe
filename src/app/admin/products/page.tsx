"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState, useTransition } from "react";
import PageTitle from "@/components/admin/page-title";
import { Book } from "@/models";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/actions/admin/product";
import Link from "next/link";
import { cn, usdFormatter } from "@/lib/utils";
import { useProductSearchParamsStore } from "@/hooks/useProductSearchParamsStore";
import { searchBookSchema } from "@/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PaginationButton } from "@/components/admin/pagination-button";
import { DataTableWithoutPaginationButton } from "@/components/admin/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCategories from "@/hooks/useCategories";
import usePublishers from "@/hooks/usePublishers";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
            src={
              row.getValue("imageUrl") === "default_product.png"
                ? `/images/books/book_1.webp`
                : row.getValue("imageUrl")
            }
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
  const [totalBook, setTotalBook] = useState<number>(0);
  const categories = useCategories();
  const publishers = usePublishers();
  const { searchParams, setPageIndex, setSearchParams, setSortType } =
    useProductSearchParamsStore();
  const form = useForm<z.infer<typeof searchBookSchema>>({
    resolver: zodResolver(searchBookSchema),
  });
  var pageIndex = searchParams.pageIndex;
  var sortType = searchParams.sortType;
  var pageSize = searchParams.pageSize;
  var pageCount = Math.ceil(totalBook / pageSize);

  useEffect(() => {
    startTransition(() => {
      getBooks(searchParams).then((data) => {
        if (data.payload) {
          setBooks(data.payload.books);
          setTotalBook(data.payload.total);
        } else {
          setBooks([]);
          setTotalBook(0);
        }
      });
    });
  }, [searchParams]);

  function onSubmit(values: z.infer<typeof searchBookSchema>) {
    setSearchParams(values);
  }

  const handleClickNewPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex + 1 <= pageCount) {
      setPageIndex(pageIndex);
    }
  };
  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex items-center justify-between mb-4">
        <PageTitle title="Products" />
        <Button>
          <Link href="/admin/products/create">Add new book</Link>
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-white shadow-lg rounded-lg px-10 py-2"
        >
          <div className="flex">
            {" "}
            <FormField
              control={form.control}
              name="bookName"
              render={({ field }) => (
                <FormItem className="w-full border-r-8 border-transparent">
                  <FormLabel>Book name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doraemon..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem className="w-full border-r-8 border-transparent">
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisherName"
              render={({ field }) => (
                <FormItem className="w-full border-r-8 border-transparent">
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input placeholder="Publisher..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full border-r-8 border-transparent">
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) =>
                                  category.categoryId.toString() === field.value
                              )?.categoryName
                            : "Select category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                      <Command>
                        <CommandInput placeholder="Search Category..." />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandList>
                          <CommandItem
                            value="All"
                            onSelect={() => {
                              form.setValue("categoryId", "");
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                "" === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            All
                          </CommandItem>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.categoryName}
                              key={category.categoryId.toString()}
                              onSelect={() => {
                                form.setValue(
                                  "categoryId",
                                  category.categoryId.toString()
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.categoryId.toString() === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.categoryName}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Search</Button>
        </form>
      </Form>
      <DataTableWithoutPaginationButton columns={columns} data={books} />
      <PaginationButton
        onClickNewPage={handleClickNewPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
    </div>
  );
}
