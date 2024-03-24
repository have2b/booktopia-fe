"use client";
import { ImportBook, getBookById } from "@/actions/admin/product";
import { Button } from "@/components/ui/button";
import { cn, usdFormatter } from "@/lib/utils";
import {
  OrderStatusSchema,
  ProductImportQuantitySchema,
  ProductSchema,
} from "@/schemas";
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
import { UpdateOrderStatus, getOrderById } from "@/actions/admin/order";
import { Order } from "@/models";
import OrderDetailTable from "@/components/admin/orders/order-detail-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<Order>();
  const [isPending, startTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  var orderIdNum = Number(params.orderId);
  const form = useForm<z.infer<typeof OrderStatusSchema>>({
    resolver: zodResolver(OrderStatusSchema),
    defaultValues: {
      orderId: orderIdNum,
    },
  });

  const onSubmit = (values: z.infer<typeof OrderStatusSchema>) => {
    setError("");
    setSuccess("");

    startSubmitTransition(() => {
      UpdateOrderStatus(orderIdNum, Number(values.status)).then((data) => {
        setError(data.error?.message);
        setSuccess("Update status successfully!");
        setOrder(data.payload);
      });
    });
  };

  useEffect(() => {
    startTransition(() => {
      (async function () {
        if (!isNaN(orderIdNum)) {
          try {
            var res = await getOrderById(orderIdNum);
            if (res.payload) {
              setOrder(res.payload);
              form.setValue("status", res.payload.status.toString());
            }
          } catch (e) {
            console.error(e);
          }
        }
      })();
    });
  }, []);
  if (isNaN(orderIdNum)) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Book #{params.orderId} was not found!
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
              Order #{params.orderId}'s Information
            </h1>
            <div>
              <Button>
                <Link href="/admin/orders">Back to list</Link>
              </Button>
            </div>
          </div>
          <hr className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 font-semibold">OrderId:</label>
              <p className="text-gray-800">{order?.orderId}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">UserId:</label>
              <p className="text-gray-800">{order?.userId}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Full Name:</label>
              <p className="text-gray-800">{order?.name}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">
                Created Time:
              </label>
              <p className="text-gray-800">{order?.createdAt.toString()}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">
                Phone Number:
              </label>
              <p className="text-gray-800">{order?.phoneNumber}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Email:</label>
              <p className="text-gray-800">{order?.email}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">
                Ship Address:
              </label>
              <p className="text-gray-800">{order?.shipAddress}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Total:</label>
              <p className="text-gray-800">
                {usdFormatter.format(order?.saleAmount ?? 0)}
              </p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Status:</label>
              <div>
                <Button
                  className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
                    "bg-red-200": order?.status === 0,
                    "bg-orange-200": order?.status === 1,
                    "bg-green-200": order?.status === 2,
                  })}
                  variant={"ghost"}
                  onClick={() => setOpen(true)}
                >
                  {order?.status === 0 && "Processing"}
                  {order?.status === 1 && "Delivering"}
                  {order?.status === 2 && "Shipped"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <OrderDetailTable parentId={params.orderId} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update status of order#{params.orderId}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="orderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OrderId</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={true} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Processing</SelectItem>
                          <SelectItem value="1">Delivering</SelectItem>
                          <SelectItem value="2">Shipped</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isSubmitPending}
                type="submit"
                className="w-full"
              >
                Update
              </Button>
            </form>
          </Form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
