import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
const poppin = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export function Hero() {
  return (
    <>
      <section className="relative">
        <div className="absolute w-full h-full bg-black bg-opacity-50 z-10"></div>
        <div className="relative w-full h-[720px] opacity-90">
          <Image
            src={`/images/hero_bg.jpg`}
            alt="hero"
            fill
            objectFit="cover"
          />
        </div>
        <div
          className={
            poppin.className + " absolute top-[20%] left-[8%] w-1/3 z-20"
          }
        >
          <span className="text-white uppercase text-[9rem] font-bold">
            Booktopia
          </span>
          <p className="text-white font-normal text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            expedita culpa quis laboriosam magnam quas temporibus, explicabo
            voluptatum in, earum ad unde, error adipisci impedit similique. Hic,
            a. Minima, architecto inventore aliquam dolorem praesentium minus
            fuga tenetur! Commodi tempora, fuga aut assumenda quibusdam nesciunt
            voluptates corrupti nulla distinctio, unde accusamus?
          </p>
          <Button className="bg-white text-black uppercase mt-10 p-6 hover:bg-orange-600 hover:text-white">
            <Link href={"/books"} className="text-lg font-bold">
              Shop now
            </Link>
          </Button>
        </div>
        <div className="absolute top-[10%] right-[10%] w-1/3 z-20">
          <div className="relative w-[640px] h-[640px]">
            <Image src={"/images/book.png"} alt="book" fill />
          </div>
        </div>
      </section>
    </>
  );
}
