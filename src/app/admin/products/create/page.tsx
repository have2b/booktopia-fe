import { ProductCreateForm } from "@/components/admin/products/product-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductCreatePage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Create New Book</h1>
        <Button>
          <Link href="/admin/products">Back to list</Link>
        </Button>
      </div>
      <ProductCreateForm />
    </div>
  );
};

export default ProductCreatePage;
