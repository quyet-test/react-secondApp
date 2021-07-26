import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/HeaderButon'
import CategoryGridTile from '../components/CategoryGridTile';
import LANGUAGES from '../constants/language';
import Colors from '../constants/colors';
import ProductColors from '../constants/ProductColors';
import * as productsActions from '../store/actions/Products';
import * as positionsActions from '../store/actions/Positions';
import * as productItemsActions from '../store/actions/ProductItems';

const languages = LANGUAGES['vn'];
const CategoriesScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(positionsActions.fetchPositions());
      await dispatch(productsActions.fetchProducts());
      await dispatch(productItemsActions.fetchProductItems());
      console.log('done');
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);


  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  // console.log(productItems);
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{languages['An error occurred!']}</Text>
        <Button
          title={languages["Try again"]}
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={languages[itemData.item.title] ? languages[itemData.item.title] : itemData.item.title}
        color={ProductColors[itemData.item.type]}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryProducts',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      keyExtractor={(item, index) => item.id}
      data={products}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = (navData) => {

  return {
    headerTitle: languages['Product Categories'],
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150
  }
});

export default CategoriesScreen;
