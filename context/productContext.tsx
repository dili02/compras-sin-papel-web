import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type Props = {
  children: ReactNode;
};

export type ProductContextType = {
  products: Product[];
  totalProductsQuantity: number;
  inCartProductsQuantity: number;
  productsSorted: (a: Product, b: Product) => number;
  toogleProductInCartById: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, productUpdated: Product) => void;
  deleteProduct: (id: string) => void;
  findProduct: (query: string) => Product | undefined;
  removeValueFromLocalStorage: () => void;
};

const initialState = {};

export const ProductContext = createContext(initialState);

export const useProduct = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProductListString = localStorage.getItem("comprasSinPapelApp");
    if (storedProductListString) {
      const storedProductList: Product[] = JSON.parse(storedProductListString);
      setProducts(storedProductList);
    }
  }, []);

  useEffect(() => {
    return localStorage.setItem("comprasSinPapelApp", JSON.stringify(products));
  }, [products]);

  const removeValueFromLocalStorage = () => {
    try {
      setProducts([]);
      window.localStorage.removeItem("comprasSinPapelApp");
    } catch (error) {
      console.log(error);
    }
  };

  const totalProductsQuantity = products.length;

  const inCartProductsQuantity = products.filter(
    (product) => product.inCart === true
  ).length;

  const findProduct = (query: string): Product | undefined =>
    products.find((product) => product.id === query);

  const productsSorted = products.sort((a: Product, b: Product) => {
    if (a.inCart === b.inCart) {
      if (a.placeToShop === b.placeToShop) {
        return a.name.localeCompare(b.name);
      } else {
        return a.placeToShop.localeCompare(b.placeToShop);
      }
    } else {
      return a.inCart === false ? -1 : 1;
    }
  });

  const toogleProductInCartById = (id: string): void => {
    const toogleProduct = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          inCart: !product.inCart,
        };
      }

      return product;
    });

    setProducts(toogleProduct);
  };

  const addProduct = (productToAdd: Product): void => {
    setProducts((products) => [...products, productToAdd]);
  };

  const updateProduct = (id: string, productUpdated: Product): void =>
    setProducts((prevProducts) => [
      ...prevProducts.map((product) =>
        product.id === id ? { ...product, ...productUpdated } : product
      ),
    ]);

  const deleteProduct = (id: string): void =>
    setProducts((products) => [
      ...products.filter((product) => product.id !== id),
    ]);

  return (
    <ProductContext.Provider
      value={{
        products,
        productsSorted,
        totalProductsQuantity,
        inCartProductsQuantity,
        toogleProductInCartById,
        addProduct,
        updateProduct,
        deleteProduct,
        findProduct,
        removeValueFromLocalStorage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
