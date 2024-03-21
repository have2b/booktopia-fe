import { Book } from "@/models";
import axios from "axios";
import { useEffect, useState } from "react";

function useNewBooks(): Book[] {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get<{ payload: Book[] }>("https://localhost:7105/api/Books?latest=true")
      .then((res) => {
        setBooks(res.data.payload);
      });
  }, []);

  return books;
}

export default useNewBooks;
