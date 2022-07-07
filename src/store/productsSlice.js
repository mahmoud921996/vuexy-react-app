import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    showFilter: false,
    products: [],
    filteredProducts: [],
    sort: "feature",
    displayProducts:'list',
    filters: {
      text: "",
      minInputRange: 0,
      maxInputRange: 0,
      price: 0,
      priceRange: "allPrices",
      category: "allCategories",
      brand: "allBrands",
   
    },
  },
  reducers: {
    updateFilters: (state, action) => {
      const { name, value } = action.payload;
      if (name === "minInputRange" || name === "maxInputRange") {
        let { minInputRange, maxInputRange } = state.filters;
        let priceGap = 10;
        if (minInputRange - maxInputRange >= priceGap) {
          if (name === "minInputRange") {
            minInputRange = maxInputRange - priceGap;
          } else {
            maxInputRange = minInputRange + priceGap;
          }
        } else {
          state.filters = { ...state.filters, [name]: parseInt(value) };
        
        }
      }
      state.filters = { ...state.filters, [name]: value };
      
    },
    loadProducts: (state, action) => {
      const { all_products, maxInpRange, minInpRange } = action.payload;
      state.products = all_products;
      state.filteredProducts = all_products;
      state.filters.maxInputRange = maxInpRange;
      state.filters.minInputRange = minInpRange;
  
    },
    filterProducts: state => {
      state.filteredProducts = [...state.products];
      if (state.filters.text.trim() !== "") {
        state.filteredProducts = state.filteredProducts.filter(product => {
          return product.name
            .toLowerCase()
            .includes(state.filters.text.toLowerCase());
        });
      }

      if (state.filters.priceRange !== "allPrices") {
        state.filteredProducts = state.filteredProducts.filter(p => {
          if (state.filters.priceRange === "less than 10") {
            return p.price < 10;
          } else if (state.filters.priceRange === "between 10 and 100") {
            return p.price > 10 && p.price < 100;
          } else if (state.filters.priceRange === "between 100 and 500") {
            return p.price > 100 && p.price < 500;
          } else {
            return p.price > 500;
          }
        });
      }
      if (state.filters.minInputRange && state.filters.maxInputRange) {
        state.filteredProducts = state.filteredProducts.filter(p => {
          return (
            p.price >= state.filters.minInputRange &&
            p.price <= state.filters.maxInputRange
          );
        });
      }

      if (state.filters.category !== "allCategories") {
        state.filteredProducts = state.filteredProducts.filter(p => {
          return p.category === state.filters.category;
        });
      }
      if (state.filters.brand !== "allBrands") {
        state.filteredProducts = state.filteredProducts.filter(p => {
          return p.brand === state.filters.brand;
        });
      }

    },
    updateSort: (state, action) => {
      state.sort = action.payload.value;
      
    },

    sortProducts: state => {
      if (state.sort !== "feature") {
        if (state.sort === "lowest") {
          state.filteredProducts = state.filteredProducts.sort(
            (product1, product2) => {
              return product1.price - product2.price;
            }
          );
        } else {
          state.filteredProducts = state.filteredProducts.sort(
            (product1, product2) => {
              return product2.price - product1.price;
            }
          );
        }
      }

     
    },
    setGridView: (state, action) => {
      state.displayProducts = action.payload.display
    },
    hideProductFilter: state => {
      state.showFilter = false;
    },
    showProductFilter: state => {
      state.showFilter = true;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
