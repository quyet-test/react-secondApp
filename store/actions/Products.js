export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const FILTER_CHANGED = 'FILTER_CHANGED';

export const toggleFavorite = (mealId) => {
    return {
        type: TOGGLE_FAVORITE,
        mealId: mealId,
    };
}

export const applyFilter = (filters) => {
    return {
        type: FILTER_CHANGED,
        filters,
    };
}