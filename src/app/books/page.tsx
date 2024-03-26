"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useCategories from "@/hooks/useCategories";
import { useProductSearchParamsStore } from "@/hooks/useProductSearchParamsStore";
import { encodeQueryString } from "@/lib/utils";
import { Book, BookPagination } from "@/models";
import { searchBookSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Roboto_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddShoppingCart } from "react-icons/md";
import swal from "sweetalert";
import { z } from "zod";
import { create } from "zustand";
const roboto = Roboto_Mono({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export interface CartState {
  bookId: string;
  bookName?: string;
  quantity: number;
  discount?: number;
  price?: number;
}

// Define store using Zustand
interface CartStore {
  cart: CartState[];
  addToCart: (item: CartState) => void;
}

export const saveToLocal = (items: CartState[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

export const loadFromLocal = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const useCartStore = create<CartStore>((set) => ({
  cart: loadFromLocal(),
  addToCart: (item) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (book) => book.bookId === item.bookId
      );
      if (existingIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += item.quantity;
        saveToLocal(updatedCart); // Save to localStorage
        return { cart: updatedCart };
      } else {
        const updatedCart = [...state.cart, item];
        saveToLocal(updatedCart); // Save to localStorage
        return { cart: updatedCart };
      }
    }),
}));

function ShowBooks(books?: Book[]) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  return (
    <>
      {books?.map((book, index) => (
        <div key={index}>
          <div className="relative">
            <Card className="peer">
              <CardContent className="!p-6">
                <div className="relative w-36 h-48">
                  <Image
                    src={"/images/books/book_1.webp"}
                    alt=""
                    fill
                    objectFit="cover"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="absolute group block w-full h-full top-0 bg-black z-30 bg-opacity-0 hover:bg-opacity-30 transition-all">
              <Button
                type="button"
                onClick={() => {
                  toast({
                    title: "Added to cart",
                    description: "Go to your cart to see details",
                  });
                  addToCart({
                    bookId: book.bookId.toString(),
                    bookName: book.bookName,
                    quantity: 1,
                    discount: 0,
                    price: book.sellPrice,
                  });
                }}
                className="absolute top-2/3 left-1/2 -translate-x-1/2 text-white py-2 hidden group-hover:block hover:block w-full bg-red-500 text-center"
              >
                <MdAddShoppingCart size={20} className="inline-block me-1" />
                <span>Add</span>
              </Button>
            </div>
          </div>
          <div className="w-48 flex flex-col gap-2 justify-center items-center text-center">
            <Link href={`/books/${book.bookId}`} className="w-3/4">
              <p className="truncate">{book.bookName}</p>
            </Link>
            <p className="text-xl font-semibold text-blue-600 truncate w-full">
              {book.author}
            </p>
            <p className="text-red-800 font-bold">${book.sellPrice}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBook, setTotalBook] = useState<number>(0);
  const categories = useCategories();
  const { searchParams, setPageIndex, setSearchParams, setSortType } =
    useProductSearchParamsStore();
  const form = useForm<z.infer<typeof searchBookSchema>>({
    resolver: zodResolver(searchBookSchema),
  });
  var pageIndex = searchParams.pageIndex;
  var sortType = searchParams.sortType;
  var pageSize = searchParams.pageSize;
  var pageCount = Math.ceil(totalBook / pageSize);
  // Fetch default list of books
  useEffect(() => {
    axios
      .get<{ payload: BookPagination }>(
        `http://localhost:7105/api/Books?pageIndex=${pageIndex}&sort=${sortType}&pageSize=${pageSize}&` +
          encodeQueryString(searchParams.params)
      )
      .then((res) => {
        setBooks(res.data.payload.books);
        setTotalBook(res.data.payload.total);
      })
      .catch((err) => {
        swal("Book not found", "There is no book like your search", "error");
      });
  }, [searchParams]);

  function onSubmit(values: z.infer<typeof searchBookSchema>) {
    setSearchParams(values);
  }

  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex + 1 < pageCount) {
      setPageIndex(pageIndex + 1);
    }
  };

  return (
    <div
      className={
        roboto.className +
        " w-full flex flex-col justify-center items-center text-center"
      }
    >
      <div className="w-full bg-amber-950 text-white py-6">
        <p className="text-5xl uppercase font-semibold">All Books</p>
      </div>

      <div className="flex justify-center gap-48 mt-12">
        {/* Filter */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-white shadow-lg rounded-lg px-10 py-6"
          >
            <h1>Filter</h1>
            <FormField
              control={form.control}
              name="bookName"
              render={({ field }) => (
                <FormItem>
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={0} value={" "}>
                        All
                      </SelectItem>
                      {categories.map((category, index) => (
                        <SelectItem
                          key={index}
                          value={category.categoryId.toString()}
                        >
                          {category.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input placeholder="Publisher..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
        {/* List books */}
        <div>
          <div className="flex w-full justify-center gap-3 items-center">
            <span>
              Showing{" "}
              <span className="font-semibold text-2xl text-red-600">
                {books?.length}/{totalBook}{" "}
              </span>
              books
            </span>
            |
            <span>
              <span className="font-semibold text-2xl text-red-600">
                {pageIndex + 1}/{pageCount}{" "}
              </span>{" "}
              pages
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-6 ">
            {/* Loop to represent each book card */}
            {ShowBooks(books)}
          </div>

          <div className="flex justify-center gap-2 mt-10">
            <Button type="button" onClick={handlePreviousPage}>
              Prev
            </Button>
            <Button type="button" onClick={handleNextPage}>
              Next
            </Button>
          </div>
        </div>
        {/* Sort options */}
        <div className="flex flex-col justify-start gap-5 mt-16">
          <Button type="button" onClick={() => setSortType("nameAsc")}>
            Sort by name A-Z
          </Button>
          <Button type="button" onClick={() => setSortType("nameDesc")}>
            Sort by name Z-A
          </Button>
          <Button type="button" onClick={() => setSortType("priceLow")}>
            Sort by price from lowest
          </Button>
          <Button type="button" onClick={() => setSortType("priceHigh")}>
            Sort by price from highest
          </Button>
        </div>
      </div>
    </div>
  );
}
