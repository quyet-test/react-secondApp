export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const FILTER_CHANGED = 'FILTER_CHANGED';

export const toggleFavorite = (productId) => {
    return {
        type: TOGGLE_FAVORITE,
        productId: productId,
    };
}

export const applyFilter = (filters) => {
    return {
        type: FILTER_CHANGED,
        filters,
    };
}