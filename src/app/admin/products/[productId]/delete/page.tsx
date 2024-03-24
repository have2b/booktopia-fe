"use client";
import { DeleteBookById, getBookById } from "@/actions/admin/product";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usdFormatter } from "@/lib/utils";
import { ProductSchema } from "@/schemas";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { z } from "zod";

export default function ProductDeletePage({
  params,
}: {
  params: { productId: string };
}) {
  type bookType = z.infer<typeof ProductSchema>;
  const [book, setBook] = useState<bookType | undefined>();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  var productIdNum = Number(params.productId);
  useEffect(() => {
    startTransition(() => {
      (async function () {
        if (!isNaN(productIdNum)) {
          try {
            var res = await getBookById(productIdNum);
            if (res.payload) {
              setBook(ProductSchema.parse(res.payload));
            }
          } catch (e) {
            console.error(e);
          }
        }
      })();
    });
  }, []);
  if (isNaN(productIdNum)) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Book #{params.productId} was not found!
            </h1>
          </div>
        </div>
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Loading....
            </h1>
          </div>
        </div>
      </div>
    );
  }
  const onSubmit = (productId: number) => {
    DeleteBookById(productId).then((data) => {
      setError(data.error);
      setSuccess(data.success);
      setOpen(false);
    });
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Book #{params.productId}'s Information
            </h1>
            <Button>
              <Link href="/admin/products">Back to list</Link>
            </Button>
          </div>
          <hr className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 font-semibold">Book Name:</label>
              <p className="text-gray-800">{book?.bookName}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Cost Price:</label>
              <p className="text-gray-800">
                {usdFormatter.format(book?.costPrice ?? 0)}
              </p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Author:</label>
              <p className="text-gray-800">{book?.author}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Sell Price:</label>
              <p className="text-gray-800">
                {" "}
                {usdFormatter.format(book?.sellPrice ?? 0)}
              </p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">
                Description:
              </label>
              <p className="text-gray-800">{book?.description}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">
                Category ID:
              </label>
              <p className="text-gray-800">{book?.categoryId}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Image:</label>
              <img
                src={book?.imageUrl ?? `/images/books/book_1.webp`}
                alt="Book Image"
                className="w-full h-auto"
              />
            </div>
            <div>
              <label className="text-gray-600 font-semibold">
                Publisher ID:
              </label>
              <p className="text-gray-800">{book?.publisherId}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Book #{params.productId}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this book?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => onSubmit(productIdNum)}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
