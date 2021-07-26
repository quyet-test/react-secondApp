import servers from '../../config/productServer';
import Position from '../../models/position';

export const SET_POSITIONS = 'SET_POSITIONS';


export const fetchPositions = () => {
    return async dispatch => {
        // any async code you want!
        try {
            const response = await fetch(
                `${servers.host}/${servers.positions}`
            );

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
    };
};