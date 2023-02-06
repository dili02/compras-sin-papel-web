import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import { ProductContextType, useProduct } from "../context/productContext";
import { useRouter } from "next/router";

import { Container } from "./Container";

type Props = {};

export const ProductForm = (props: Props) => {
  const [productName, setProductName] = useState<string>("");
  const [placeToShop, setPlaceToShop] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [inCart, setInCart] = useState<string>("false");

  const { addProduct, updateProduct, findProduct } =
    useProduct() as ProductContextType;

  const { push, query } = useRouter();

  useEffect(() => {
    if (query.id) {
      const productFound = findProduct(query.id as string);
      setProductName(productFound?.name as string);
      setPlaceToShop(productFound?.placeToShop as string);
      setQuantity(productFound?.quantity as number);
      setInCart(productFound?.inCart === true ? "true" : "false");
    }
  }, [findProduct, query.id]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "productName") setProductName(e.target.value);
    if (e.target.name === "placeToShop") setPlaceToShop(e.target.value);
    if (e.target.name === "quantity") setQuantity(Number(e.target.value));
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) =>
    setInCart(event.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // TODO: validate not exist product to save

    const productToAdd = {
      id: crypto.randomUUID(),
      name: productName,
      placeToShop,
      quantity,
      inCart: inCart === "true" ? true : false,
    };

    if (!query.id) addProduct(productToAdd);
    else
      updateProduct(query.id as string, {
        id: query.id as string,
        name: productName,
        placeToShop,
        quantity,
        inCart: inCart === "true" ? true : false,
      });

    push("/");
  };

  return (
    <div className="page-new-container">
      <Button className="button button-fourthy" onClick={() => push("/")}>
        <i className="bx bx-left-arrow-alt"></i>
        <span>VOLVER</span>
      </Button>

      <form className="productform" onSubmit={handleSubmit} autoComplete="off">
        <h1>{query.id ? "EDITAR" : "AGREGAR"} PRODUCTO</h1>

        <input
          type="text"
          placeholder="Nombre del Producto ..."
          name="productName"
          value={productName}
          onChange={handleChangeInput}
        />

        <input
          type="text"
          placeholder="Lugar donde comprar el Producto ..."
          name="placeToShop"
          value={placeToShop}
          onChange={handleChangeInput}
        />

        <input
          type="number"
          placeholder="Cantidad"
          name="quantity"
          value={quantity}
          onChange={handleChangeInput}
        />

        <select
          onChange={handleChangeSelect}
          value={inCart}
          className="select-option"
        >
          <option selected disabled>
            Seleccionar una opción
          </option>
          <option value="false">Fuera del Carro</option>
          <option value="true">Dentro del Carro</option>
        </select>

        <Button className="button-primary width-100" isDisabled={!productName}>
          {query.id ? "EDITAR" : "AGREGAR"}
        </Button>
      </form>
    </div>
  );
};
