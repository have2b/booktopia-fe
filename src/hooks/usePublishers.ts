import { Publisher } from "@/models";
import axios from "axios";
import { useEffect, useState } from "react";

function usePublishers(): Publisher[] {
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    axios
      .get<{ payload: Publisher[] }>("http://localhost:7105/api/Publishers")
      .then((res) => {
        setPublishers(res.data.payload);
      });
  }, []);

  return publishers;
}

export default usePublishers;
