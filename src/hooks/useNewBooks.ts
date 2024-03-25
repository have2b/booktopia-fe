import { Book, BookPagination } from "@/models";
import axios from "axios";
import { useEffect, useState } from "react";

function useNewBooks(): Book[] {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get<{ payload: BookPagination }>(
        "http://localhost:7105/api/Books?latest=true"
      )
      .then((res) => {
        setBooks(res.data.payload.books);
      });
  }, []);

  return books;
}

export default useNewBooks;
