import React, { useState } from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, FlatList } from 'react-native';

import Colors from '../constants/colors';
import Language from '../constants/language';

const MainScreen = props => {
    const languages = Language['vn'];
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
                    <Button title={languages['Search Product']} onPress={searchProductHandler} color={Colors.primary} />
                </View>
                <View style={styles.button}>
                    <Button title={languages['Update Product']} onPress={updateProductHandler} color={Colors.primary} />
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