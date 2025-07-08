export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Page =
  | "home"
  | "cart"
  | "checkout"
  | "about"
  | "contact"
  | "privacy"
  | "terms";

export type Theme = 'light' | 'dark';

export type PrimaryColor = 'blue' | 'olive';
