"use client";

import { Book } from "@/models";
import axios from "axios";
import { Roboto_Mono } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import swal from "sweetalert";
const roboto = Roboto_Mono({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function BookDetail({ params }: { params: { bookId: string } }) {
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    axios
      .get(`http://localhost:7105/api/books/${params.bookId}`)
      .then((res) => {
        setBook(res.data.payload);
      })
      .catch((err) => {
        swal("Oops!", "This book does not exist", "error");
      });
  }, []);

  return (
    <div className="flex justify-center items-center gap-16 mt-10">
      <div className="relative w-[36rem] h-[54rem]">
        <Image src={"/images/books/book_1.webp"} alt="book_picture" fill />
      </div>
      <div className={roboto.className + " flex flex-col justify-start gap-10"}>
        <h1 className="text-4xl font-bold text-blue-400 uppercase">
          {book?.bookName}
        </h1>
        <p className="text-2xl font-semibold">
          Author: <span className="font-normal text-lg">{book?.author}</span>
        </p>
        <p className="text-2xl font-semibold">
          Description:
          <span className="font-normal text-lg"> {book?.description}</span>
        </p>
        <p className="text-2xl font-semibold">
          Price:
          <span className="text-3xl  text-red-700"> ${book?.sellPrice}</span>
        </p>
      </div>
    </div>
  );
}
