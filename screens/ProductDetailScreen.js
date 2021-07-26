import React, { useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux';

import { POSITIONS } from '../data/dummy-data';
import CustomHeaderButton from '../components/HeaderButon';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/ProductItems';


const ListView = props => {
  return <View style={styles.listItem}>
    <DefaultText >{props.children}</DefaultText>
  </View>
}

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  // console.log('refresh');
  // const isFav = props.navigation.getParam('isFav');
  const availableProducts = useSelector(state => state.productItems.items);
  const isFav = useSelector(state => state.productItems.favorites.some(item => item.id === productId));
  // console.log(productId);
  // console.log(availableProducts);
  const selectedproduct = availableProducts.find(product => product.id == productId);
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(productId));

  }, [toggleFavorite, productId]);

  useEffect(() => {
    props.navigation.setParams({ toggFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    console.log('change fav')
    props.navigation.setParams({ isFav });
  }, [isFav]);

  const position = POSITIONS.find(position => position.id == selectedproduct.positionId);

  selectedproduct.position = `Khu vực ${position.zone}, cột ${position.column}`;


  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedproduct.imageUrl }} />
      <View style={styles.details}>
        <DefaultText>{selectedproduct.position}</DefaultText>
        <DefaultText>{selectedproduct.weight + ' Kg'}</DefaultText>
        <DefaultText>{selectedproduct.long + 'm'}</DefaultText>
      </View>
      {/* <Text style={styles.title}>Ingredients</Text>
      {selectedproduct.ingredients.map(ingredient => <ListView key={ingredient}> {ingredient} </ListView>)}
      <Text style={styles.title}>Steps</Text>
      {selectedproduct.steps.map(step => <ListView key={step}> {step} </ListView>)} */}
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navigationData) => {
  const title = navigationData.navigation.getParam('productTitle');
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
