export interface ProductLocal {
  masterId: number;
  quantity: number;
}

export interface payloadCreateCart {
  data: {
    items: ProductPayload[];
  };
}

export interface ProductPayload {
  product_variant_id: number;
  _destroy: boolean;
  quantity: number;
}

export interface Cart {
  data: {
    id: number;
    user_id: number;
    number: number;
    status: string;
    total: string;
    total_items: string;
    completed_at: null | string;
    created_at: string;
    items: ProductDescription[];
  };
}

export interface ProductDescription {
  id: number;
  quantity: number;
  product_variant_id: number;
  product_id: number;
  order_id: number;
  total: string;
  price: string;
  name: string;
  description: string;
  promotion: number;
}
export interface UpdateProductReq {
  data: {
    items: PayloadUpdateProduct;
  };
}

export interface PayloadUpdateProduct {
  id: number;
  quantity: number;
  product_variant_id: number;
  _destroy: boolean;
}
