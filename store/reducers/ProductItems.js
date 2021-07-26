
// import { PRODUCT_ITEMS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, FILTER_CHANGED, SET_PRODUCT_ITEMS } from '../actions/ProductItems';

const initiatedState = {
    items: [],
    filteredItems: [],
    favorites: [],
};

const productReducer = (state = initiatedState, action) => {
    switch (action.type) {
        case SET_PRODUCT_ITEMS:
            return {
                ...state,
                items: action.items,
                filteredItems: [...action.items],
                // userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            };
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
        if (filters.productId != '' && product.id != filters.productId) {
            return false;
        }
        if (filters.positionId != 'All' && product.positionId != filters.positionId) {
            return false;
        }
        if (filters.productType != 'All' && product.productId != filters.productType) {
            return false;
        }

        return true;
    });

    console.log(updatedProducts.length);
    return { ...state, filteredProducts: updatedProducts };
}

export default productReducer;