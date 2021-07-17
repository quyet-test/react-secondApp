import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from './ProductItem'

const ProductItemList = props => {
    const favorites = useSelector(state => state.products.favorites);
    const renderProductItem = itemData => {
        const isFavorite = favorites.some(product => product.id === itemData.item.id);
        return (
            <ProductItem
                name={itemData.item.name}
                image={itemData.item.imageUrl}
                position={itemData.item.position}
                weight={`${itemData.item.weight} Kg`}
                long={`${itemData.item.long} m`}
                onSelectProduct={() => {
                    props.navigation.navigate({
                        routeName: props.routeName,
                        params: {
                            productId: itemData.item.id,
                            productTitle: itemData.item.name,
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
                renderItem={renderProductItem}
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

export default ProductItemList;