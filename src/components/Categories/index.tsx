"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useCategories from "@/hooks/useCategories";
import { Category } from "@/models";
import Image from "next/image";
import Link from "next/link";

function CategoryCarousel(props: { categories: Category[] }) {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="mt-5"
    >
      <CarouselContent>
        {props.categories.map((value, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <Link href={`/books?category=${value.categoryName?.toLowerCase()}`}>
              <Card>
                <CardContent className="aspect-video p-1">
                  <div className="relative w-full h-full object-cover">
                    <Image
                      src={`/images/categories/cat_${index}.jpg`}
                      alt="cat_pic"
                      fill
                    />
                  </div>
                </CardContent>
              </Card>
              <p className="text-2xl uppercase mt-5 text-center font-semibold">
                {value.categoryName}
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function Categories() {
  const categories = useCategories();

  return (
    <section id="category" className="w-[95%] ms-12 my-5">
      <span className="text-4xl font-semibold uppercase">
        Explore books by category
      </span>
      <CategoryCarousel categories={categories} />
    </section>
  );
}
