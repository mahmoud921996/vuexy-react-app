import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classes from "./ProductGrid.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../../store/productsSlice";
import { getMaxPrice, getMinPrice } from "../../utilites/utility";

const ProductGrid = ({ products }) => {
  const { filteredProducts, filters, sort, displayProducts } = useSelector(
    state => state.products
  );
  const dispatch = useDispatch();
  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let productsFiltered = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  useEffect(() => {
    dispatch(
      productsActions.loadProducts({
        all_products: products,
        maxInpRange: getMaxPrice(),
        minInpRange: getMinPrice(),
      })
    );
  }, [products]);

  useEffect(() => {
    dispatch(productsActions.filterProducts());
    dispatch(productsActions.sortProducts());
  }, [products, filters, sort]);

  function onePageBackHandler() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function onePageForwardHandler() {
    if (currentPage !== Math.ceil(filteredProducts / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }
  const productList = productsFiltered.map(p => {
    return (
      <ProductCard
        key={p.id}
        product={p}
        display={displayProducts === "grid" ? "grid" : "list"}
      />
    );
  });

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  return (
    <section className={classes["products__grid"]}>
      {productList}
    {pageNumbers.length >1 &&  <div className={classes["pagination"]}>
        <li
          onClick={onePageBackHandler}
          className={currentPage === pageNumbers[0] ? classes["disabled"] : ""}
        >
          <ArrowBackIosNewIcon />
        </li>
        <ul className={classes["page__numbers"]}>
          {pageNumbers.map(page => {
            return (
              <li
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? classes["active"] : ""}
              >
                {page}
              </li>
            );
          })}
        </ul>

        <li
        onClick={onePageForwardHandler}
          className={
            currentPage === pageNumbers.length ? classes["disabled"] : ""
          }
        >
          <ArrowForwardIosIcon />
        </li>
      </div>}
    </section>
  );
};

export default ProductGrid;
