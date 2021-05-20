
import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, FILTER_CHANGED } from '../actions/Meals';

const initiatedState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favorites: [],
};

const mealReducer = (state = initiatedState, action) => {
    console.log(action);
    switch (action.type) {
        case TOGGLE_FAVORITE:
            return toggleFavorite(action.mealId, state)
        case FILTER_CHANGED:
            return applyFilter(action.filters, state)
        default:
            return state;
    }
    return state;
}

const toggleFavorite = (mealId, state) => {
    const updatedFavorites = state.favorites;
    const existedIndex = updatedFavorites.findIndex(meal => meal.id === mealId);

    if (existedIndex < 0) {
        const meal = state.meals.find(meal => meal.id === mealId);

        return { ...state, favorites: updatedFavorites.concat(meal) };
    } else {
        updatedFavorites.splice(existedIndex, 1);

        return { ...state, favorites: updatedFavorites };
    }
}

const applyFilter = (filters, state) => {
    console.log(filters);

    if (!Array.isArray(state.filteredMeals)) {

        return { ...state, filteredMeals: [] };
    }

    const updatedMeals = state.meals.filter(meal => {
        if (filters.GlutenFree && !meal.isGlutenFree) {
            return false;
        }
        if (filters.Vegan && !meal.isVegan) {
            return false;
        }
        if (filters.Vegetarian && !meal.isVegetarian) {
            return false;
        }
        if (filters.LactoseFree && !meal.isLactoseFree) {
            return false;
        }

        return true;
    });

    console.log(updatedMeals.length);
    return { ...state, filteredMeals: updatedMeals };
}

export default mealReducer;