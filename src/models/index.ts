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