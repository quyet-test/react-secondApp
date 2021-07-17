import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native'

import { PRODUCTS } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryProductscreen = props => {
  const catId = '0000';//props.navigation.getParam('categoryId');
  const displayedProducts = useSelector(state => state.products.filteredMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  ))

  if (displayedProducts.length == 0) {
    return (
      <View style={styles.content} >
        <DefaultText>There is no favorites meal. You can add some</DefaultText>
      </View>
    );
  }

  return (
    <MealList DataList={displayedProducts} navigation={props.navigation} />
  );
};

CategoryProductscreen.navigationOptions = navigationData => {

  const catId = '0000';//navigationData.navigation.getParam('categoryId');
  const item = PRODUCTS.find(cat => cat.id === catId);

  return {
    headerTitle: item.title,
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
