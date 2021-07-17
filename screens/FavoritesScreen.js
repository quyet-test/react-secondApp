import React from 'react';
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButon';
import DefaultText from '../components/DefaultText';
import MealList from '../components/MealList';

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.products.favorites);

  if (!Array.isArray(favMeals) || favMeals.length == 0) {
    return (
      <View style={styles.content} >
        <DefaultText>There is no favorites meal. You can add some</DefaultText>
      </View>
    );
  }

  return (
    <MealList DataList={favMeals} navigation={props.navigation} />
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
