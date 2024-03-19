import { Category } from "@/models";
import axios from "axios";
import { useEffect, useState } from "react";

function useCategories(): Category[] {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<{ payload: Category[] }>("https://localhost:7105/api/Categories")
      .then((res) => {
        setCategories(res.data.payload);
      });
  }, []);

  return categories;
}

export default useCategories;
