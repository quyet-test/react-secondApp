import servers from '../../config/productServer';
import ProductItem from '../../models/productItem';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const FILTER_CHANGED = 'FILTER_CHANGED';
export const SET_PRODUCT_ITEMS = 'SET_PRODUCT_ITEMS';
const SET_PRODUCT_TYPES = 'SET_PRODUCT_TYPES';
const SET_POSITIONS = 'SET_POSITIONS';


export const fetchAllItems = () => {
    return async dispatch => {
        // any async code you want!
        // const processer = [];
        // processer.push(async () => {
        try {
            const response = await fetch(
                `${servers.host}/${servers.productItems}`
            );

            console.log(response);
            if (!response.ok) {
                throw new Error('Something went wrong!');

            }
            const resData = await response.json();
            const loadedProductItems = [];
            for (const key in resData) {
                loadedProductItems.push(
                    new ProductItem(
                        resData[key].id,
                        resData[key].name,
                        resData[key].productId,
                        resData[key].positionId,
                        resData[key].weight,
                        resData[key].long,
                        resData[key].imageUrl
                    )
                );
            }

            dispatch({ type: SET_PRODUCT_ITEMS, items: loadedProductItems });
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
        // });


        // processer.push(async () => {
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
        // });


        // processer.push(async () => {
        try {
            console.log('fetching position');
            const response = await fetch(
                `${servers.host}/${servers.positions}`
            );

            console.log('fetched position');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const resData = await response.json();
            const loadedPositions = [];
            for (const key in resData) {
                loadedPositions.push(
                    new Position(
                        resData[key].id,
                        resData[key].zone,
                        resData[key].column,
                        resData[key].description
                    )
                );
            }

            dispatch({ type: SET_POSITIONS, positions: loadedPositions });
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
        // });

        // await Promise.all(processer);
    }
};

export const fetchProductItems = () => {
    return async dispatch => {
        // any async code you want!
        try {
            const response = await fetch(
                `${servers.host}/${servers.productItems}`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProductItems = [];
            for (const key in resData) {
                loadedProductItems.push(
                    new ProductItem(
                        resData[key].id,
                        resData[key].name,
                        resData[key].productId,
                        resData[key].positionId,
                        resData[key].weight,
                        resData[key].long,
                        resData[key].imageUrl
                    )
                );
            }

            dispatch({ type: SET_PRODUCT_ITEMS, items: loadedProductItems });
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
    };
};

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