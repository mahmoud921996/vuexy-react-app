import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sideBarSlice";
import themeReducer from "./themeSlice";
import productsReducer from "./productsSlice";

export default configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    products: productsReducer,
  },
});
