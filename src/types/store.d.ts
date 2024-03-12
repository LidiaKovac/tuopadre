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
  prev: string | null;
  next: string | null;
  count: number
}

interface Error {}
