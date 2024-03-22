export interface Category {
  categoryId?: number;
  categoryName?: string;
  description?: string;
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