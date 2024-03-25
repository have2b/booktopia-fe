import { searchBookSchema } from "@/validations";
import { z } from "zod";
import { create } from "zustand";
type ProductSearchParams = {
    params?: z.infer<typeof searchBookSchema>;
    sortType: string;
    pageIndex: number;
    pageSize: number;
  };
  interface ProductSearchParamsStore {
    searchParams: ProductSearchParams;
    setSearchParams: (params: z.infer<typeof searchBookSchema>) => void;
    setPageIndex: (nextIndex: number) => void;
    setSortType: (type: string) => void;
  }

export const useProductSearchParamsStore = create<ProductSearchParamsStore>(
    (set) => ({
      searchParams: {
        sortType: "nameAsc",
        pageIndex: 0,
        pageSize: 9,
      },
      setSearchParams: (params: z.infer<typeof searchBookSchema>) =>
        set((state) => ({
          searchParams: {
            params: params,
            pageIndex: 0,
            pageSize: state.searchParams.pageSize,
            sortType: state.searchParams.sortType,
          },
        })),
      setSortType: (softType: string) =>
        set((state) => ({
          searchParams: {
            params: state.searchParams.params,
            pageIndex: 0,
            pageSize: state.searchParams.pageSize,
            sortType: softType,
          },
        })),
      setPageIndex: (nextIndex: number) =>
        set((state) => ({
          searchParams: {
            params: state.searchParams.params,
            pageIndex: nextIndex,
            pageSize: state.searchParams.pageSize,
            sortType: state.searchParams.sortType,
          },
        })),
    })
  );