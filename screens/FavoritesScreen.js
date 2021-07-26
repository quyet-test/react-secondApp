import React from 'react';
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButon';
import DefaultText from '../components/DefaultText';
import ProductItemList from '../components/ProductItemList';

const FavoritesScreen = props => {
  const favproducts = useSelector(state => state.productItems.favorites);

  if (!Array.isArray(favproducts) || favproducts.length == 0) {
    return (
      <View style={styles.content} >
        <DefaultText>There is no favorites product. You can add some</DefaultText>
      </View>
    );
  }

  return (
    <ProductItemList DataList={favproducts} navigation={props.navigation} />
  );
};

FavoritesScreen.navigationOptions = (navData) => {

  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Menu'
        iconName='ios-menu'
        onPress={() => { navData.navigation.toggleDrawer() }}
      />
    </HeaderButtons>
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavoritesScreen;
