interface Product {
  id: string;
  name: string;
  placeToShop: string;
  quantity: number;
  inCart: boolean | "true" | "false";
  // cartState: ProductState;
}

// type ProductState<string> = "in-cart" | "out-cart";
