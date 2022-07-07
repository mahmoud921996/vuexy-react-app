import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import classes from "./App.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ProductFilter from "./components/productFilter/ProductFilter";
import products from "./data";
import { useEffect, useState } from "react";
import ProductSearchBar from "./components/ProductSearchBar/ProductSearchBar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import { useSelector } from "react-redux";

function App() {
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const { darkTheme } = useSelector(state => state.theme);
  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
    };
  }, [windowWidth]);
  return (
    <div
      className={`${classes["body__wrapper"]} ${
        darkTheme ? classes["dark"] : ""
      }`}
    >
      <Sidebar />
      <Navbar windowWidth={windowWidth} />
      <main className={classes["container"]}>
        <header className={classes["main__header"]}>
          <div
            className={`${classes["header__path"]} ${
              darkTheme ? classes["dark"] : ""
            }`}
          >
            <h2>Shop</h2>
            <ul>
              <li>
                <a href="/#">
                  <HomeOutlinedIcon
                    style={{ color: "#5e50ee", fontSize: "2rem" }}
                  />
                </a>
              </li>
              <li>
                <a href="/#">
                  <ChevronRightOutlinedIcon
                    style={{
                      fontSize: "2rem",
                      color: darkTheme ? "#b4b7bd" : "#6e6b7b",
                    }}
                  />
                </a>
              </li>
              <li>
                <a href="/#" className={classes["active"]}>ecommerce</a>
              </li>
              <li>
                <a href="/#">
                  <ChevronRightOutlinedIcon
                    style={{ fontSize: "2rem",   color: darkTheme ? "#b4b7bd" : "#6e6b7b",}}
                  />
                </a>
              </li>
              <li>shop</li>
            </ul>
          </div>
          <button className={classes["header__settings"]}>
            <SettingsOutlinedIcon />
          </button>
        </header>
        <section className={classes["products__section"]}>
          <ProductFilter products={products} />
          <section className={classes["products__sections__wrapper"]}>
            <ProductSearchBar
              windowWidth={windowWidth}
              resultsCount={products.length}
            />
            <ProductGrid products={products} displayProducts="list" />
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
