import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButon'
import Colors from '../constants/colors';

import { applyFilter } from '../store/actions/Meals';

const FilterSwitch = props => {

  return <View style={styles.filterContainer}>
    <Text>{props.label}</Text>
    <Switch
      trackColor={{ true: Colors.primary }}
      value={props.state}
      onValueChange={props.onChange} />
  </View>
}


const FiltersScreen = props => {
  const { navigation } = props;

  const [isGlutenFree, setGlutenFree] = useState(false);
  const [isVegan, setVegan] = useState(false);
  const [isVegetarian, setVegetarian] = useState(false);
  const [isLactoseFree, setLactoseFree] = useState(false);

  const dispatch = useDispatch();

  const savedFilters = useCallback(() => {

    const appliedFilters = {
      GlutenFree: isGlutenFree,
      Vegan: isVegan,
      Vegetarian: isVegetarian,
      LactoseFree: isLactoseFree,
    }

    dispatch(applyFilter(appliedFilters));
  }, [isGlutenFree, isVegan, isVegetarian, isLactoseFree, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: savedFilters });
  }, [savedFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available filters / Restrictions</Text>
      <FilterSwitch
        label='Gluten-free'
        state={isGlutenFree}
        onChange={(newValue) => { setGlutenFree(newValue) }}
      />
      <FilterSwitch
        label='Vegan'
        state={isVegan}
        onChange={(newValue) => { setVegan(newValue) }}
      />
      <FilterSwitch
        label='Vegetarian'
        state={isVegetarian}
        onChange={(newValue) => { setVegetarian(newValue) }}
      />
      <FilterSwitch
        label='Lactose-free'
        state={isLactoseFree}
        onChange={(newValue) => { setLactoseFree(newValue) }}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {

  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Menu'
        iconName='ios-menu'
        onPress={() => { navData.navigation.openDrawer() }}
      />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Save'
        iconName='ios-save'
        onPress={navData.navigation.getParam('save')}
      />
    </HeaderButtons>
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%'
  }
});

export default FiltersScreen;
