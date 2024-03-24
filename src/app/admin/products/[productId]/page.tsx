"use client";
import { ImportBook, getBookById } from "@/actions/admin/product";
import { Button } from "@/components/ui/button";
import { usdFormatter } from "@/lib/utils";
import { ProductImportQuantitySchema, ProductSchema } from "@/schemas";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Input } from "@/components/ui/input";

export default function ProductDetailPage({
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
  const form = useForm<z.infer<typeof ProductImportQuantitySchema>>({
    resolver: zodResolver(ProductImportQuantitySchema),
    defaultValues: {
      bookId: productIdNum,
      quantity: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof ProductImportQuantitySchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      ImportBook(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

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
  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
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
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline">
          <Link href={`/admin/products/${productIdNum}/edit`}>Edit</Link>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">Import</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Import Book #{params.productId}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bookId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BookId</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={true} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                  Import
                </Button>
              </form>
            </Form>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
