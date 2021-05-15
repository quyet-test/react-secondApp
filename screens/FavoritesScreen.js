import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/HeaderButon'

import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data'

const FavoritesScreen = props => {
  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS
    .filter(
      meal => meal.isFavorite == true
    );

  return (
    <MealList DataList={displayedMeals} navigation={props.navigation} />
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

export default FavoritesScreen;
