
// import { PRODUCT_ITEMS } from '../../data/dummy-data';
import { SET_POSITIONS } from '../actions/Positions';

const initiatedState = {
    positions: [],
};

export default (state = initiatedState, action) => {
    console.log(action.type);
    switch (action.type) {
        case SET_POSITIONS:
            return {
                positions: action.positions,
                // userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            };
        default:
            return state;
    }
    return state;
}
