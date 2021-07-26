import servers from './../../config/productServer';
import Product from '../../models/product';
export const SET_PRODUCT_TYPES = 'SET_PRODUCT_TYPES';


export const fetchProducts = () => {
    return async dispatch => {
        // any async code you want!
        try {
            const response = await fetch(
                `${servers.host}/${servers.productTypes}`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProductTypes = [];
            for (const key in resData) {
                loadedProductTypes.push(
                    new Product(
                        resData[key].id,
                        resData[key].title,
                        resData[key].type,
                        resData[key].description
                    )
                );
            }

            dispatch({ type: SET_PRODUCT_TYPES, products: loadedProductTypes });
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
    };
};
