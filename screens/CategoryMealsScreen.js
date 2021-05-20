import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native'

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam('categoryId');
  const displayedMeals = useSelector(state => state.meals.filteredMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  ))

  if (displayedMeals.length == 0) {
    return (
      <View style={styles.content} >
        <DefaultText>There is no favorites meal. You can add some</DefaultText>
      </View>
    );
  }

  return (
    <MealList DataList={displayedMeals} navigation={props.navigation} />
  );
};

CategoryMealScreen.navigationOptions = navigationData => {

  const catId = navigationData.navigation.getParam('categoryId');
  const item = CATEGORIES.find(cat => cat.id === catId);

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

export default CategoryMealScreen;
