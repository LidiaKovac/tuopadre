interface Product {
  _id: string;
  img: string;
  price: number;
  prodName: string;
  prodQuantity: string;
  store: string;
  needsCard: boolean;
  scadenza: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "user";
}

interface ProductResponse {
  data: Product[];
  suggestions: Product[];

  query: string | null;
  prev: string | null;
  next: string | null;
  count: number;
}

interface JSONQuery extends Record<string, string | boolean | null> {}

interface Error {}
