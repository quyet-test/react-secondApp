import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from 'react-navigation-drawer';

import FiltersScreen from '../screens/FavoritesScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import SearchProductScreen from '../screens/SearchProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductUpdate from '../screens/ProductUpdate';
import BarcodeReaderScreen from '../screens/barcodeScanner';

import Colors from '../constants/colors';
import Language from '../constants/language';

const languages = Language['vn'];

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

const ProductNavigatorOptions = createStackNavigator(
    {
        Products: CategoriesScreen,
        CategoryProducts: {
            screen: CategoryProductsScreen,
        },
        // ProductItem: ProductItemScreen,
        ProductDetail: ProductDetailScreen,
        // AddItem: AddItemScreen,
        ScanBarcode: BarcodeReaderScreen,
    },
    stackNavigationOptions
);


const SearchNavigator = createStackNavigator(
    {
        Search: SearchProductScreen,
        ProductDetail: ProductDetailScreen,
        // ItemDetail: ItemDetailScreen,
        ScanBarcode: BarcodeReaderScreen
    },
    {
        navigationOptions: {
            drawerLabel: languages['Search'],
        },
        ...stackNavigationOptions
    }
);

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        navigationOptions: {
            drawerLabel: languages['Filter!!!'],
        },
        ...stackNavigationOptions
    }

);

const tabConfigs = {
    Product: {
        screen: ProductNavigatorOptions,
        navigationOptions: {
            tabBarIcon: (tabInfor) => {
                return <Ionicons
                    name={Platform.OS === 'android' ? 'md-build' : 'ios-build'}
                    size={25} color={tabInfor.tintColor} />
            }
        },
        tabBarColor: Colors.accent
    },
    Search: {
        screen: SearchNavigator,
        navigationOptions: {
            tabBarLabel: languages['Search'],
            tabBarIcon: (tabInfor) => {
                return <Ionicons
                    name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                    size={25} color={tabInfor.tintColor}
                />
            },
            tabBarColor: Colors.accent
        }
    },
};

const ProductNavigatorTabOptions = Platform.OS === 'android' ?
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
    Product: ProductNavigatorTabOptions,
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
const ProductNavigator = createAppContainer(MenuNavigatorOptions);
export default ProductNavigator; //createAppContainer(ProductNavigator);