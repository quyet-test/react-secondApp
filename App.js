import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'

import Header from './components/Header'
import MainScreen from './screens/MainScreen'
import ProductDetail from './screens/ProductDetail';
import GameOverscreen from './screens/GameOverScreen';
import BarcodeReader from './components/barcodeScanner'

const fetFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {

  const [appLoaded, setApploaded] = useState(false);
  const [screen, setScreen] = useState('');
  const [previousScreen, setPreviousScreen] = useState('mainSreen');
  const [scanResult, setScanResult] = useState({});

  if (!appLoaded) {
    return <AppLoading
      startAsync={fetFonts}
      onFinish={() => { setApploaded(true) }}
      onError={(err => console.log(err))} />
  }

  const changeScreen = newScreen => {
    setScreen(newScreen);
  }

  const scanCancelHandler = () => {
    changeScreen(previousScreen);
  }

  const scannedHandler = (result) => {
    setScanResult(setScanResult);
    changeScreen(previousScreen);
  }
  let content = <MainScreen onScreenChange={changeScreen} />;
  switch (screen) {
    case 'scan':
      setScanResult({});
      content = <BarcodeReader onCancel={scanCancelHandler} onScanned={scannedHandler} />;
      break;
    case 'mainSreen':
      content = <MainScreen onScreenChange={changeScreen} data={scanResult.data} />;
      break;
    case 'ProductDetail':
      content = <ProductDetail onScreenChange={changeScreen} data={scanResult.data} />;
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
