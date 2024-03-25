import axios from "axios";
import { useEffect, useState } from "react";

interface BookCount {
  bookCount: number | undefined;
  pageCount: number;
}

export function useBookCount(): BookCount {
  const [bookCount, setBookCount] = useState<number>();
  const [pageCount, setPageCount] = useState<number>(10);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get<{ payload: BookCount }>("https://localhost:7105/api/Books/count")
        .then((res) => {
          setBookCount(res.data.payload?.bookCount);
          setPageCount(res.data.payload?.pageCount);
        });
    }, 1000);
  }, []);

  return { bookCount, pageCount };
}
