import React from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { MEALS } from '../data/dummy-data';
import CustomHeaderButton from '../components/HeaderButon';
import DefaultText from '../components/DefaultText';

const ListView = props => {
  return <View style={styles.listItem}>
    <DefaultText >{props.children}</DefaultText>
  </View>
}

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id == mealId);

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

MealDetailScreen.navigationOptions = (navigationData) => {

  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id == mealId);

  return {
    headerTitle: selectedMeal.title,
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Favorite'
        iconName='ios-star'
        onPress={() => { selectedMeal.isFavorite = !selectedMeal.isFavorite }}
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

export default MealDetailScreen;
