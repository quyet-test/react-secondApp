import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from 'react-navigation-drawer';


import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

import Colors from '../constants/colors';

const stackNavigationOptions =
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitle: 'A screen',
    }
};

const MealsNavigatorOptions = createStackNavigator(
    {
        Categories: CategoriesScreen,
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: MealDetailScreen,
    },
    stackNavigationOptions
);


const FavsNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen,
    },
    stackNavigationOptions
);

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        navigationOptions: {
            drawerLabel: 'Filter!!!',
        },
        ...stackNavigationOptions
    }

);

const tabConfigs = {
    Meals: {
        screen: MealsNavigatorOptions,
        navigationOptions: {
            tabBarIcon: (tabInfor) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfor.tintColor} />
            }
        },
        tabBarColor: Colors.accent
    },
    Favorites: {
        screen: FavsNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfor) => {
                return <Ionicons name='ios-star' size={25} color={tabInfor.tintColor} />
            },
            tabBarColor: Colors.accent
        }
    },
};

const MealsNavigatorTabOptions = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(
        tabConfigs,
        {
            activeTintColor: 'white',
            shifting: true
        }
    )
    :
    createBottomTabNavigator(
        tabConfigs,
        {
            tabBarOptions: {
                activeTintColor: Colors.accent,
            }
        }
    );


const MenuNavigatorOptions = createDrawerNavigator({
    Meals: MealsNavigatorTabOptions,
    Filters: FiltersNavigator
},
    {
        contentOptions: {
            activeTintColor: Colors.accent,
            labelStyle: {
                fontFamily: 'open-sans-bold',
            }
        }
    }

)
const MealsNavigator = createAppContainer(MenuNavigatorOptions);
export default MealsNavigator; //createAppContainer(MealsNavigator);