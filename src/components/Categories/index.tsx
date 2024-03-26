"use client";

import useCategories from "@/hooks/useCategories";
import { Category } from "@/models";
import Image from "next/image";
import Link from "next/link";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NextArrow, PrevArrow } from "../Arrow";

function CategoryCarousel(props: { categories: Category[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="slider-container mt-5">
      <Slider {...settings}>
        {props.categories.map((category, index) => (
          <Link
            key={index}
            href={`/books?category=${category.categoryName?.toLowerCase()}`}
            className="my-10"
          >
            <div className="flex justify-center">
              <div className="relative w-96 h-72 p-5">
                <Image
                  src={`/images/categories/cat_${index}.jpg`}
                  alt="cat_pic"
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
            <p className="text-2xl uppercase mt-5 text-center font-semibold">
              {category.categoryName}
            </p>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export function Categories() {
  const categories = useCategories();

  return (
    <section id="category" className="w-[95%] ms-12 my-5 pt-16">
      <span className="text-6xl font-semibold uppercase">
        Explore books by category
      </span>
      <CategoryCarousel categories={categories} />
    </section>
  );
}
