import React from "react";
import { ProductContextType, useProduct } from "../context/productContext";
import { useRouter } from "next/router";

type Props = {
  inCart: "false" | "true" | boolean;
  name: string;
  quantity: number;
  placeToShop: string;
  id: string;
};

export const Card = ({ inCart, name, quantity, placeToShop, id }: Props) => {
  const { deleteProduct, toogleProductInCartById } =
    useProduct() as ProductContextType;

  const { push } = useRouter();

  return (
    <div className="product-item">
      <div className="product-item-status">
        <span
          className={
            inCart
              ? "product-status-icon product-status-icon-in"
              : "product-status-icon product-status-icon-out"
          }
        >
          {inCart ? (
            <i className="bx bx-cart-download"></i>
          ) : (
            <i className="bx bx-cart"></i>
          )}
        </span>
        <span
          className={
            inCart ? "product-status-text-in" : "product-status-text-out"
          }
        >
          {inCart ? "PRODUCTO DENTRO DEL CARRO" : "PRODUCTO FUERA DEL CARRO"}
        </span>
      </div>

      <h2 className="product-item-name">{name}</h2>

      <div className="product-item-place-quantity">
        <p>Lugar: {placeToShop.toUpperCase()}</p>
        <p>Cantidad: {quantity}</p>
      </div>

      <div className="product-actions">
        <button
          onClick={() => toogleProductInCartById(id)}
          className={
            inCart
              ? "button button-tertiary button-width-075"
              : "button button-tertiary button-width-075"
          }
        >
          {inCart ? (
            <div className="button-icon">
              <span className="">
                <i className="bx bx-cart"></i>
              </span>
              <span>SACAR</span>
            </div>
          ) : (
            <div className="button-icon">
              <span>
                <i className="bx bx-cart-download"></i>
              </span>
              <span>GUARDAR</span>
            </div>
          )}
        </button>

        <button
          onClick={() => push(`/editar/${id}`)}
          className="button button-tertiary button-width-075"
        >
          <div className="button-icon">
            <i className="bx bx-edit-alt"></i>
            <span>EDITAR</span>
          </div>
        </button>
        <button
          onClick={() => deleteProduct(id)}
          className="button button-tertiary button-width-075"
        >
          <div className="button-icon">
            <i className="bx bx-trash"></i>
            <span>ELIMINAR</span>
          </div>
        </button>
      </div>
    </div>
  );
};
