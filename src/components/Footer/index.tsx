import { Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
const roboto = Roboto_Mono({ weight: ["400", "600"], subsets: ["latin"] });

export function Footer() {
  return (
    <footer
      className={
        roboto.className +
        " w-full flex flex-col justify-center items-center text-center text-white pt-12 mt-24 bg-amber-950"
      }
    >
      <p className="text-6xl font-semibold">Booktopia</p>
      <p className="w-1/3 my-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, nostrum
        totam alias inventore, ad deserunt, minima numquam nam eveniet nesciunt
        placeat veniam libero porro recusandae ab doloribus repellat quibusdam
        reprehenderit.
      </p>
      <div className="flex justify-center gap-3 items-center">
        <CiFacebook size={32} />
        <CiTwitter size={32} />
        <CiInstagram size={32} />
      </div>
      <div className="w-full flex justify-between px-3 bg-black mt-6 py-2">
        <p>
          Copyright &copy;2024 <span className="text-blue-300">Booktopia </span>
        </p>
        <div className="flex gap-3">
          <Link href={"/"}>Home</Link>
          <Link href={"/books"}>Books</Link>
        </div>
      </div>
    </footer>
  );
}
