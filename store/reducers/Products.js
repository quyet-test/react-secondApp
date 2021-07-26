
// import { PRODUCT_ITEMS } from '../../data/dummy-data';
import { SET_PRODUCT_TYPES } from '../actions/Products';

const initiatedState = {
    products: [],
};

export default (state = initiatedState, action) => {
    console.log(action.type);
    switch (action.type) {
        case SET_PRODUCT_TYPES:
            return {
                products: action.products,
                // userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            };
        default:
            return state;
    }
    return state;
}
