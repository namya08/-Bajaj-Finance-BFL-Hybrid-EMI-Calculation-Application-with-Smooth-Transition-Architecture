export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  emiPrice: number;
  rating: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}
