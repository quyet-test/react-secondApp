import React, { useState } from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, FlatList } from 'react-native';

import Colors from '../constants/colors'

const MainScreen = props => {

    const searchProductHandler = () => {
        props.onScreenChange('ProductDetail')
    }

    const updateProductHandler = () => {
        props.onScreenChange('ProductUpdate')
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.title}> Menu </Text>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title={'Search Product'} onPress={searchProductHandler} color={Colors.primary} />
                </View>
                <View style={styles.button}>
                    <Button title={'Update Product'} onPress={updateProductHandler} color={Colors.primary} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 5,
        alignItems: 'center'
    },
    optionContainer: {
        flex: 1,
        padding: 5,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 10,
    },
    button: {
        width: '90%',
    },
});

export default MainScreen;