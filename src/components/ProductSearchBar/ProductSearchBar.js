import React, { useState } from "react";
import classes from "./ProductSearchBar.module.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";

import { productsActions } from "../../store/productsSlice";

const ProductSearchBar = ({ windowWidth }) => {
  const { sort, filters, displayProducts, filteredProducts } = useSelector(
    state => state.products
  );
  const { darkTheme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  function updateSortHandler(e) {
    const { value } = e.target;
    dispatch(productsActions.updateSort({ value }));
  }

  function changeProductsDisplay(e) {
    dispatch(productsActions.setGridView({ display: e.target.value }));
  }
  return (
    <section
      className={`${classes["products__wrapper"]} ${
        displayProducts === "grid"
          ? classes["grid__active"]
          : classes["list__active"]
      }`}
    >
      <section
        className={`${classes["products__control__bar"]} ${
          darkTheme ? classes["dark"] : ""
        }`}
      >
        {windowWidth <= 992 ? (
          <MenuIcon
            style={{
              color: darkTheme && "rgb(208, 210, 214)",
              fontSize: "2.5rem",
              cursor: "pointer",
            }}
            onClick={() => dispatch(productsActions.showProductFilter())}
          />
        ) : (
          <span> {filteredProducts.length}  results found</span>
        )}
        <div>
          <div className={classes["products__control__sort"]}>
            <button
              className={classes["products__control__sort__btn"]}
              onClick={() => setShow(prevState => !prevState)}
            >
              {sort}
              <KeyboardArrowDownOutlinedIcon />
            </button>
            <ul
              className={`${classes["products__control__sort__wrapper"]} ${
                show ? classes["show"] : ""
              }`}
            >
              <li>
                <label
                  htmlFor="feature"
                  onClick={() => setShow(prevState => !prevState)}
                >
                  feature
                </label>
                <input
                  type="radio"
                  id="feature"
                  name="sort"
                  value="feature"
                  checked={sort === "feature"}
                  onChange={updateSortHandler}
                />
              </li>
              <li>
                <label
                  htmlFor="lowest"
                  onClick={() => setShow(prevState => !prevState)}
                >
                  Lowest
                </label>
                <input
                  type="radio"
                  id="lowest"
                  name="sort"
                  value="lowest"
                  checked={sort === "lowest"}
                  onChange={updateSortHandler}
                />
              </li>
              <li>
                <label
                  htmlFor="highest"
                  onClick={() => setShow(prevState => !prevState)}
                >
                  highest
                </label>
                <input
                  type="radio"
                  id="highest"
                  name="sort"
                  value="highest"
                  checked={sort === "highest"}
                  onChange={updateSortHandler}
                />
              </li>
            </ul>
          </div>
          <div className={classes["products__control__view"]}>
            <label
              htmlFor="grid"
              className={`${classes["view__btn"]} ${classes["grid__btn"]}`}
            >
              <input
                type="radio"
                id="grid"
                value="grid"
                name="productsDisplay"
                checked={displayProducts === "grid"}
                onChange={changeProductsDisplay}
              />
              <GridViewOutlinedIcon
                style={{ color: "#7367f0", fontSize: "2rem" }}
              />
            </label>
            <label
              htmlFor="list"
              className={`${classes["view__btn"]} ${classes["list__btn"]}`}
            >
              <input
                type="radio"
                id="list"
                value="list"
                name="productsDisplay"
                checked={displayProducts === "list"}
                onChange={changeProductsDisplay}
              />
              <ListOutlinedIcon
                style={{ color: "#7367f0", fontSize: "2rem" }}
              />
            </label>
          </div>
        </div>
      </section>
      <section
        className={`${classes["products__search__bar"]} ${
          darkTheme ? classes["dark"] : ""
        }`}
      >
        <input
          type="text"
          placeholder="Search Product"
          name="text"
          value={filters.text}
          onChange={e =>
            dispatch(
              productsActions.updateFilters({
                name: e.target.name,
                value: e.target.value,
              })
            )
          }
        />
        <div>
          <SearchOutlinedIcon
            style={{ fontSize: "2.2rem", color: "#676d7d" }}
          />
        </div>
      </section>
    </section>
  );
};

export default ProductSearchBar;
