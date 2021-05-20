import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem'

const MealList = props => {
    const favorites = useSelector(state => state.meals.favorites);
    const renderMealItem = itemData => {
        const isFavorite = favorites.some(meal => meal.id === itemData.item.id);
        return (
            <MealItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail',
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite,
                        }
                    })
                }}
            />
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={props.DataList}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;