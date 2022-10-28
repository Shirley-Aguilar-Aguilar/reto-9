export interface CategorytResp {
  data: Category[]
}

export interface Category {
    id: number;
    slug: string;
    name: string;
}


export interface Products {
  data: Product[]
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image:{ url: string};
  likes_count:number;
  likes_down_count:number;
  likes_up_count:number;
  category: {
    id:number;
    name: string;
    slug: string;
  }
}
