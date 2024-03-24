export interface Category {
  categoryId?: number;
  categoryName?: string;
  description?: string;
  books?: Book[];
}

export interface Book {
  bookId?: number;
  bookName?: string;
  author?: string;
  costPrice?: number;
  sellPrice?: number;
  quantity?: number;
  categoryId?: number;
  description?: string;
  publisherId?: number;
  imageUrl?: string;
  isActive?: boolean;
  createdAt?: Date;
  lastModifiedAt?: Date;
  category?: Category;
  publisher?: Publisher;
}

export interface Publisher {
  publisherId?: number;
  publisherName?: string;
  contactNumber?: string;
  books?: Book[];
}

export interface ApiResponse<T>{
  success: boolean,
  payload: T,
  error: ApiErrorDetails | undefined
}

export interface ApiErrorDetails{
  code: number,
  message: string
}

export interface Order {
  orderId: number;
  userId: string;
  status: number;
  shipAddress: string;
  createdAt: Date;
  name: string,
  phoneNumber: string,
  email: string,
  saleAmount: number
};

export interface OrderDetail {
  orderId: number;
  bookId: number;
  quantity: number;
  discount: number;
  bookName: string,
  author: string,
  publisherName: string,
  imageUrl: string,
  sellPrice: number, 
};

export interface CollapsibleItemProps {
  parentId: string;
}