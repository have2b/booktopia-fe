"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRangePickerSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { useEffect } from "react";

interface IProps {
  error: string | undefined;
  isPending: boolean;
  handleSubmit: (values: z.infer<typeof DateRangePickerSchema>) => void;
}
export function DateRangePickerForm({
  error,
  isPending,
  handleSubmit,
}: IProps) {
  var today = new Date();
  const form = useForm<z.infer<typeof DateRangePickerSchema>>({
    resolver: zodResolver(DateRangePickerSchema),
    defaultValues: {
      dateRange: {
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: today,
      },
    },
  });
  useEffect(() => {
    form.handleSubmit(handleSubmit).apply(null);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <Button disabled={isPending} type="submit">
                  Show
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <FormError message={error} />
    </Form>
  );
}
