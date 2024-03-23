import { ProductEditForm } from "@/components/admin/products/product-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductEditPage = ({ params }: { params: { productId: string } }) => {
  if (isNaN(Number(params.productId))) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Book #{params.productId} was not found!
            </h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Edit Book</h1>
        <Button>
          <Link href="/admin/products">Back to list</Link>
        </Button>
      </div>
      <ProductEditForm bookId={Number(params.productId)} />
    </div>
  );
};

export default ProductEditPage;
