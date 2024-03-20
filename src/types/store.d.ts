interface Product {
  img: string;
  price: string;
  prodName: string;
  prodQuantity: string;
  store: string;
  needsCard: boolean;
  scadenza: string;
}

interface ProductResponse {
  data: Product[];
  query?: string | null
  prev: string | null;
  next: string | null;
  count: number
}

interface JSONQuery extends Record<string, string | boolean> {
  
}

interface Error { }
