import React from "react";
import classes from "./ProductCard.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";

const ProductCard = ({ display, product }) => {
  const { darkTheme } = useSelector(state => state.theme);
  const ratingStars = [];
  for (let i = 1; i <= 5; i++) {
    if (product.rating >= i) {
      ratingStars.push(
        <StarIcon key={i} style={{ color: "#ff9f43", fontSize: "2rem" }} />
      );
    } else {
      ratingStars.push(
        <StarIcon key={i} style={{ color: "#b9b9c3", fontSize: "2rem" }} />
      );
    }
  }


  return (
    <article
      className={`${classes["product__card"]} ${
        display === "grid" ? classes["grid"] : classes["list"]
      } ${darkTheme ? classes["dark"] : ""}`}
    >
      <div>
        <a href="/#">
          <img src={product.img} alt={product.name} />
        </a>
      </div>
      <div className={classes["product__card__body"]}>
        <div className={classes["product__rating"]}>
          <span className={classes["product__stars"]}>{ratingStars}</span>
          {display === "grid" && (
            <span className={classes["product__price"]}>{product.price}</span>
          )}
        </div>
        <h6 className={classes["product__title"]}>
          <a href="/#">
            {product.name}
            <small>
              {display !== "grid" && "By "}
              {display !== "grid" && (
                <span className={classes["product__title__brand"]}>
                  {product.brand}
                </span>
              )}
            </small>
          </a>
        </h6>
        <p className={classes["product__description"]}>{product.discription}</p>
      </div>
      <div className={classes["product__buttons"]}>
        {display === "list" && <span>{product.price}</span>}
        <button className={`${classes["wishlist"]} ${classes["product__btn"]}`}>
          <FavoriteBorderOutlinedIcon />
          <span>wishlist</span>
        </button>
        <button className={`${classes["in__cart"]} ${classes["product__btn"]}`}>
          <ShoppingCartOutlinedIcon />
          <span>Add to cart</span>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
