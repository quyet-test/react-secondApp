import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native'

import { PRODUCTS } from '../data/dummy-data';
import { POSITIONS } from '../data/dummy-data';
import ProductItemList from '../components/ProductItemList';
import DefaultText from '../components/DefaultText';
import LANGUAGES from '../constants/language';

const languages = LANGUAGES['vn'];
const CategoryProductscreen = props => {
  const catId = props.navigation.getParam('categoryId');
  const displayedProducts = useSelector(state => state.products.filteredProducts.filter(
    product => product.productId == catId
  ))

  if (displayedProducts.length == 0) {
    return (
      <View style={styles.content} >
        <DefaultText>There is no favorites product. You can add some</DefaultText>
      </View>
    );
  }

  const detailDisplayedProdtucts = displayedProducts.map(product => {
    const position = POSITIONS.find(position => position.id == product.positionId);

    return { ...product, position: `Khu vực ${position.zone}, cột ${position.column}` };
  });

  return (
    <ProductItemList DataList={detailDisplayedProdtucts} navigation={props.navigation} routeName='ProductDetail' />
  );
};

CategoryProductscreen.navigationOptions = navigationData => {

  const catId = navigationData.navigation.getParam('categoryId');
  const item = PRODUCTS.find(cat => cat.id === catId);

  return {
    headerTitle: languages[item.title],
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CategoryProductscreen;
