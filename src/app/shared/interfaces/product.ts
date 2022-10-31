export interface CategorytResp {
  data: Category[];
}

export interface Category {
  id: number;
  slug: string;
  name: string;
}

export interface Products {
  data: Product[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: { url: string };
  likes_count: number;
  likes_down_count: number;
  likes_up_count: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  master: {
    id: number;
    stock: number;
  };
}

export interface IdsForLike {
  user_id_eq: number;
  product_id_eq: number;
}

export interface Likes {
  data: Like[];
}
export interface Like {
  id: number;
  user_id: number;
  product_id: number;
  kind: string;
}

export interface LikeBodyPost {
  data: {
    product_id: number;
    kind: string;
  };
}

export interface LikeBodyResp {
  data: Like;
}
