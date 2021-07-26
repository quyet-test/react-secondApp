import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import ReduxThunk from 'redux-thunk';

import ProductNavigator from './navigation/ProductNavigator';
import productsReducer from './store/reducers/Products';
import positionsReducer from './store/reducers/Positions';
import productItemsReducer from './store/reducers/ProductItems';

enableScreens();
const rootReducer = combineReducers({
  products: productsReducer,
  positions: positionsReducer,
  productItems: productItemsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const fetchFonts = () => {
  //global.productItems = [...productItems];
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => { setFontLoaded(true) }}
        onError={(err) => { }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ProductNavigator />
    </Provider>
  );

}