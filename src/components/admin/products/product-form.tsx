"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import useCategories from "@/hooks/useCategories";
import usePublishers from "@/hooks/usePublishers";
import { Textarea } from "@/components/ui/textarea";
import { CreateBook, EditBook, getBookById } from "@/actions/admin/product";
interface IProps {
  error: string | undefined;
  success: string | undefined;
  isPending: boolean;
  defaultValues?: z.infer<typeof ProductSchema>;
  handleSubmit: (values: z.infer<typeof ProductSchema>) => void;
}

export const ProductCreateForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      CreateBook(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <>
      <ProductForm
        error={error}
        handleSubmit={onSubmit}
        isPending={isPending}
        success={success}
      />
    </>
  );
};
export const ProductEditForm = ({ bookId }: { bookId: number }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  type bookType = z.infer<typeof ProductSchema>;
  const [book, setBook] = useState<bookType | undefined>();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      EditBook(bookId, values).then((data) => {
        console.log(data);

        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  useEffect(() => {
    (async function () {
      try {
        var res = await getBookById(bookId);
        if (res.payload) {
          setBook(ProductSchema.parse(res.payload));
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <ProductForm
      error={error}
      handleSubmit={onSubmit}
      isPending={isPending}
      success={success}
      defaultValues={book}
    />
  );
};

export function ProductForm({
  error,
  isPending,
  handleSubmit,
  defaultValues,
  success,
}: IProps) {
  const categories = useCategories();
  const publishers = usePublishers();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultValues,
  });
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="bookName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="" />
                </FormControl>
                <FormMessage />
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
                  <Input {...field} disabled={isPending} placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost Price</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sellPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sell Price</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ImageUrl</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.categoryId === field.value
                            )?.categoryName
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] asdafasd p-0">
                    <Command>
                      <CommandInput placeholder="Search Category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandList>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.categoryName}
                            key={category.categoryId}
                            onSelect={() => {
                              form.setValue(
                                "categoryId",
                                category.categoryId ?? 0
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.categoryId === field.value
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
          <FormField
            control={form.control}
            name="publisherId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Publisher</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? publishers.find(
                              (publisher) =>
                                publisher.publisherId === field.value
                            )?.publisherName
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search publisher..." />
                      <CommandEmpty>No publisher found.</CommandEmpty>
                      <CommandList>
                        {publishers.map((publisher) => (
                          <CommandItem
                            value={publisher.publisherName}
                            key={publisher.publisherId}
                            onSelect={() => {
                              form.setValue(
                                "publisherId",
                                publisher.publisherId ?? 0
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                publisher.publisherId === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {publisher.publisherName}
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
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          {defaultValues ? "Edit" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
