
import { PRODUCT_ITEMS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, FILTER_CHANGED } from '../actions/Products';

const initiatedState = {
    products: PRODUCT_ITEMS,
    filteredProducts: PRODUCT_ITEMS,
    favorites: [],
};

const productReducer = (state = initiatedState, action) => {
    console.log(action);
    switch (action.type) {
        case TOGGLE_FAVORITE:
            return toggleFavorite(action.productId, state)
        case FILTER_CHANGED:
            return applyFilter(action.filters, state)
        default:
            return state;
    }
    return state;
}

const toggleFavorite = (productId, state) => {
    const updatedFavorites = state.favorites;
    const existedIndex = updatedFavorites.findIndex(product => product.id === productId);

    if (existedIndex < 0) {
        const product = state.products.find(product => product.id === productId);

        return { ...state, favorites: updatedFavorites.concat(product) };
    } else {
        updatedFavorites.splice(existedIndex, 1);

        return { ...state, favorites: updatedFavorites };
    }
}

const applyFilter = (filters, state) => {
    console.log(filters);

    if (!Array.isArray(state.filteredProducts)) {

        return { ...state, filteredProducts: [] };
    }

    const updatedProducts = state.products.filter(product => {
        if (filters.GlutenFree && !product.isGlutenFree) {
            return false;
        }
        if (filters.Vegan && !product.isVegan) {
            return false;
        }
        if (filters.Vegetarian && !product.isVegetarian) {
            return false;
        }
        if (filters.LactoseFree && !product.isLactoseFree) {
            return false;
        }

        return true;
    });

    console.log(updatedProducts.length);
    return { ...state, filteredProducts: updatedProducts };
}

export default productReducer;