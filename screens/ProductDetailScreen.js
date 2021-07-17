import React, { useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButon';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/Products';


const ListView = props => {
  return <View style={styles.listItem}>
    <DefaultText >{props.children}</DefaultText>
  </View>
}

const ProductDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  console.log('refresh');
  // const isFav = props.navigation.getParam('isFav');
  const availableMeals = useSelector(state => state.products.meals);
  const isFav = useSelector(state => state.products.favorites.some(item => item.id === mealId));

  const selectedMeal = availableMeals.find(meal => meal.id == mealId);
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));

  }, [toggleFavorite, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    console.log('change fav')
    props.navigation.setParams({ isFav });
  }, [isFav]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => <ListView key={ingredient}> {ingredient} </ListView>)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => <ListView key={step}> {step} </ListView>)}
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navigationData) => {
  const title = navigationData.navigation.getParam('mealTitle');
  const toggleFav = navigationData.navigation.getParam('toggFav');
  const isFav = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: title,
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Favorite'
        iconName={isFav ? 'ios-star' : 'ios-star-outline'}
        // onPress={() => { }} //
        onPress={toggleFav}
      />
    </HeaderButtons>
  }
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  details: {
    justifyContent: 'space-around',
    padding: 15,
    flexDirection: 'row'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    fontFamily: 'open-sans',
  }
});

export default ProductDetailScreen;
