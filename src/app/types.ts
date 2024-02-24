export type Category = {
  id: string;
  name: string;
  userId: string;
  products: Product[];
};

export type Product = {
  id: string;
  name: string;
  inCart: Boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  categoryId: string;
  listId: string;
};

export type List = {
  id: string;
  name: string;
  userId: string;
  products: Product[];
};
