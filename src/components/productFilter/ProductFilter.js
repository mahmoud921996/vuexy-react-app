import React from "react";
import FilterTitle from "../FilterTitle/FilterTitle";
import classes from "./productFilter.module.css";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../../store/productsSlice";
import { getMaxPrice, getMinPrice } from "../../utilites/utility";

const ProductFilter = ({ products }) => {
  const { filters ,showFilter } = useSelector(state => state.products);
  const { darkTheme } = useSelector(state => state.theme);

  function updateFilters(e) {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "minInputRange" || name === "maxInputRange") {
      value = Number(value);
    }

    dispatch(productsActions.updateFilters({ name, value }));
  }
  function getUniqueCategories() {
    const allCategories = products.map(p => p.category);
    const categories = [...new Set(allCategories)];
    categories.unshift("allCategories");
    return categories.map((category, i) => {
      return (
        <li key={category}>
          <label>
            <input
              type="radio"
              name="category"
              value={category}
              checked={category === filters.category}
              onChange={updateFilters}
            />
            <span className={classes["custom__radio"]}></span>
            <span className={classes["label__text"]}>
              {i === 0 ? "All" : category}
            </span>
          </label>
        </li>
      );
    });
  }

  function getUniqueBrands() {
    const allBrands = products.map(p => p.brand);
    const brands = [...new Set(allBrands)];
    brands.unshift("allBrands");
    return brands.map((brand, i) => {
      return (
        <li key={brand}>
          <label>
            <input
              type="radio"
              name="brand"
              value={brand}
              checked={brand === filters.brand}
              onChange={updateFilters}
            />
            <span className={classes["custom__radio"]}></span>
            <span className={classes["label__text"]}>
              {i === 0 ? "All" : brand}
            </span>
          </label>
        </li>
      );
    });
  }
  const dispatch = useDispatch()

  const minPercentage = (filters.minInputRange / getMaxPrice()) * 100;
  const maxPercentage = 100 - (filters.maxInputRange / getMaxPrice()) * 100;

  return (
    <>
      <aside
        className={`${classes["aside__products__filter"]} ${
          showFilter && classes["show"]
        }`}
      >
        <h6
          className={classes["product__filters__title"]}
          style={{ color: darkTheme && "#d0d2d6" }}
        >
          filters
        </h6>
        <div
          className={`${classes["product__filters__wrapper"]} ${
            darkTheme ? classes["dark"] : ""
          }`}
        >
          <FilterTitle>multi range</FilterTitle>
          <ul className={classes["filter__section"]}>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="priceRange"
                  value="allPrices"
                  checked={filters.priceRange === "allPrices"}
                  onChange={updateFilters}
                />
                <span className={classes["custom__radio"]} />
                <span className={classes["label__text"]}>All</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="checkbox"
                  name="priceRange"
                  value="less than 10"
                  checked={filters.priceRange === "less than 10"}
                  onChange={updateFilters}
                />
                <span className={classes["custom__radio"]} />
                <span className={classes["label__text"]}>&lt; 10</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="checkbox"
                  name="priceRange"
                  value="between 10 and 100"
                  checked={filters.priceRange === "between 10 and 100"}
                  onChange={updateFilters}
                />
                <span className={classes["custom__radio"]} />
                <span className={classes["label__text"]}>$10 - $100</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="checkbox"
                  name="priceRange"
                  value="between 100 and 500"
                  checked={filters.priceRange === "between 100 and 500"}
                  onChange={updateFilters}
                />
                <span className={classes["custom__radio"]} />
                <span className={classes["label__text"]}>$100 - $500</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="checkbox"
                  name="priceRange"
                  value="greater than 500"
                  checked={filters.priceRange === "greater than 500"}
                  onChange={updateFilters}
                />
                <span className={classes["custom__radio"]} />
                <span className={classes["label__text"]}>&gt;= $500</span>
              </label>
            </li>
          </ul>
          <FilterTitle>Price range</FilterTitle>
          <div className={classes["slider"]}>
            <div
              className={classes["min__value"]}
              style={{ left: `${minPercentage}%` }}
            >
              {filters.minInputRange}
            </div>
            <div
              className={classes["progress"]}
              style={{ left: `${minPercentage}%`, right: `${maxPercentage}%` }}
            ></div>
            <div
              className={classes["max__value"]}
              style={{ right: `${maxPercentage}%` }}
            >
              {filters.maxInputRange}
            </div>
          </div>
          <div className={classes["range__inputs"]}>
            <input
              type="range"
              className={classes["min__range__input"]}
              min={getMinPrice()}
              max={getMaxPrice()}
              value={filters.minInputRange}
              onChange={updateFilters}
              name="minInputRange"
            />
            <input
              type="range"
              className={classes["max__range__input"]}
              min={getMinPrice()}
              max={getMaxPrice()}
              value={filters.maxInputRange}
              onChange={updateFilters}
              name="maxInputRange"
            />
          </div>
          <FilterTitle>Categories</FilterTitle>
          <ul className={classes["filter__section"]}>
            {getUniqueCategories()}
          </ul>
          <FilterTitle>Brands</FilterTitle>
          <ul className={classes["filter__section"]}>{getUniqueBrands()}</ul>
          <FilterTitle>Rating</FilterTitle>
          <ul className={classes["filter__section"]}>
            <li className={classes["rating__row"]}>
              <a href="/#">
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />{" "}
                <span>& up</span>
              </a>
              <span>160</span>
            </li>
            <li className={classes["rating__row"]}>
              <a href="/#">
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />{" "}
                <span>& up</span>
              </a>
              <span>176</span>
            </li>
            <li className={classes["rating__row"]}>
              <a href="/#">
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />{" "}
                <span>& up</span>
              </a>
              <span>291</span>
            </li>
            <li className={classes["rating__row"]}>
              <a href='/#'>
                <StarIcon style={{ color: "#ff9f43", fontSize: "2rem" }} />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />
                <StarOutlineIcon
                  style={{ color: "#b9b9c3", fontSize: "2rem" }}
                />{" "}
                <span>& up</span>
              </a>
              <span>190</span>
            </li>
          </ul>
        </div>
      </aside>
      <div
        className={`${classes["overlay"]} ${showFilter && classes["show"]}`}
        onClick={() => dispatch(productsActions.hideProductFilter())}
      ></div>
    </>
  );
};

export default ProductFilter;
