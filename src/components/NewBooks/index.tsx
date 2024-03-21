"use client";

import useNewBooks from "@/hooks/useNewBooks";
import { Book } from "@/models";
import Image from "next/image";
import Link from "next/link";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NextArrow, PrevArrow } from "../Arrow";

function NewBookCarousel(props: { books: Book[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="slider-container mt-5">
      <Slider {...settings}>
        {props.books.map((book, index) => (
          <Link key={index} href={`/books/${book.bookId}`} className="my-12">
            <div className="flex justify-center">
              <div className="relative w-36 h-48">
                <Image
                  src={`/images/books/book_1.webp`}
                  alt="cat_pic"
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
            <p className="text-lg capitalize mt-5 text-center font-normal">
              {book.bookName}
            </p>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export function NewBooks() {
  const newBooks = useNewBooks();

  return (
    <section id="newBook" className="w-[95%] ms-12 my-12 py-16">
      <div className="flex-col text-center">
        <p className="my-5 text-xl text-blue-500 font-semibold uppercase">
          Some quality item
        </p>
        <p className="text-6xl font-semibold uppercase my-5">
          Our latest books
        </p>
      </div>
      <NewBookCarousel books={newBooks} />
    </section>
  );
}
