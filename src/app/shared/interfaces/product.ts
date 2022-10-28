export interface ProductResp {
  data: Product[]
}

export interface Product {
    id: number;
    slug: string;
    name: string;
}
