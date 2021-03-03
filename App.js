import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'

import Header from './components/Header'
import MainScreen from './screens/MainScreen'
import ProductDetail from './screens/ProductDetail';
import ProductUpdate from './screens/ProductUpdate';
import BarcodeReader from './components/barcodeScanner';

import productPositions from './data/productInPositions';
import './components/GlobalScanParams'
import products from './data/products';
import positions from './data/positions';

const productPositionList = { ...productPositions };
const fetFonts = () => {
  //global.productPositions = [...productPositions];
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {

  const [appLoaded, setApploaded] = useState(false);
  const [curScreen, setCurScreen] = useState('');
  const [previousScreen, setPreviousScreen] = useState('mainSreen');
  const [scanResult, setScanResult] = useState({});
  const [productPosition, setProductPosition] = useState({});

  const [searchingProd, setSearchingProd] = useState('');

  if (!appLoaded) {

    useEffect(() => {
      if (curScreen === 'mainSreen') {
        setScanResult({});
        setSearchingProd('');
      }
    }, [curScreen, setScanResult, setSearchingProd]);
    return <AppLoading
      startAsync={fetFonts}
      onFinish={() => { setApploaded(true) }}
      onError={(err => console.log(err))} />
  }


  useEffect(() => {
    if (curScreen === 'mainSreen') {
      setScanResult({});
      setSearchingProd('');
    }
  }, [curScreen, setScanResult, setSearchingProd]);

  const changeScreen = newScreen => {
    setPreviousScreen(curScreen);
    setCurScreen(newScreen);
  }

  const onBackMainScreen = () => {
    //setProductPosition({});
    // changeScreen('mainSreen');
    setPreviousScreen(curScreen);
    setCurScreen('mainSreen');
  }

  const searchProductPosition = (product) => {
    return productPositionList[product] || [];
  };

  const addProductPosition = (productId, positionId) => {
    const positions = productPositionList[productId];
    productPositionList[productId] = [...positions, positionId];
  }

  const scanCancelHandler = () => {
    setScanResult({});
    setSearchingProd('');
    changeScreen(previousScreen);
  }

  const scannedHandler = (result) => {
    setScanResult(result);

    if (global.scanMethod == 1) {
      setSearchingProd(result.data);
    }
    if (global.scanMethod == 2) {

      let valid = false;
      if (`${result.data}`.startsWith('p')) {
        const productId = result.data;
        const product = products[productId];
        if (typeof (product) === 'object') {
          valid = true;

          setProductPosition({ ...productPosition, product });
        }
        // setProductInfo(products[productId]);
      } else if (`${result.data}`.startsWith('z')) {
        const positionId = result.data;
        const position = positions[positionId];
        if (typeof (position) === 'object') {
          valid = true;

          setProductPosition({ ...productPosition, position });
          // setPositionInfo(positions[positionId]);
        }
      }

      if (!valid) {
        Alert.alert(
          'Invalid Barcode',
          `Invalid Barcode Information ${result.data}`,
          [{ text: 'OK', 'style': 'destructive' }]
        );
      }
    }

    changeScreen(previousScreen);
  }
  let content = <MainScreen onScreenChange={changeScreen} />;
  switch (curScreen) {
    case 'scan':
      //setScanResult({});
      content = <BarcodeReader onCancel={scanCancelHandler} onScanned={scannedHandler} />;
      break;
    case 'mainSreen':
      // setScanResult({});
      content = <MainScreen onScreenChange={changeScreen} />;
      break;
    case 'ProductDetail':
      content = <ProductDetail onScreenChange={changeScreen}
        searchProductPosition={searchProductPosition}
        onCancel={onBackMainScreen}
        data={searchingProd} />;
      break;
    case 'ProductUpdate':
      content = <ProductUpdate onScreenChange={changeScreen}
        onUpdate={addProductPosition}
        onCancel={onBackMainScreen}
        barcode={productPosition} />;
      break;
    default:
      break;
  }

  return (
    <View style={styles.screen}>
      <Header title={"Product Management Demo"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
