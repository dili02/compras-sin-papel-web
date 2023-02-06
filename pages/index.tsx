import Head from "next/head";
import { useState } from "react";
import { ProductContextType, useProduct } from "../context/productContext";
import { Button, Card, Container } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../assets/logo.svg";

export default function Home() {
  const {
    products,
    removeValueFromLocalStorage,
    totalProductsQuantity,
    inCartProductsQuantity,
  } = useProduct() as ProductContextType;

  const [querySearch, setQuerySearch] = useState<string>("");

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Compras Sin Papel WebApp</title>
        <meta
          name="description"
          content="Una aplicación web de lista de compras sin papel para organizar tus compras de manera eficiente y sostenible. Con nuestra app, podrás crear listas de compras, marcar los productos ya comprados y acceder a ella desde cualquier lugar con conexión a internet."
        />
        <meta
          name="keywords"
          content="lista de compras, aplicación web, sin papel, organización, eficiente, sostenible, app, productos, comprados, accesible"
        />
        <meta name="author" content="Diego Garcia <dili02@gmail.com>" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header-app">
        <div className="title-app">
          <h1>compras sin papel</h1>
        </div>

        <div className="header-buttons">
          <Button
            className="button button-width-10 button-secondary"
            onClick={removeValueFromLocalStorage}
          >
            VACIAR LISTA
          </Button>

          <Button
            className="button button-width-10 button-primary"
            onClick={() => push("/nuevo")}
          >
            AGREGAR
          </Button>
        </div>

        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar producto ..."
            name="Buscar"
            autoComplete="off"
            onChange={(e) => setQuerySearch(e.target.value)}
          />
          <label className="search-icon">
            <i className="bx bx-search search-icon"></i>
          </label>
        </div>

        <div className="header-info">
          <div>
            <p>Productos</p>
            <span>{totalProductsQuantity}</span>
          </div>
          <div>
            <p className="">En Carro</p>
            <span className="d-flex justify-content-center align-items">
              {inCartProductsQuantity} de {totalProductsQuantity}
            </span>
          </div>
        </div>
      </header>

      <section className="product-list">
        {products.length === 0 && (
          <p className="noproduct-info">No tienes productos agregados.</p>
        )}

        {products
          .filter((product) =>
            product.name.toLowerCase().includes(querySearch.toLowerCase())
          )
          .map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              inCart={product.inCart}
              quantity={product.quantity}
              placeToShop={product.placeToShop}
            />
          ))}
      </section>
    </>
  );
}
