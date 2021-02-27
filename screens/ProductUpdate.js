import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, FlatList } from 'react-native';

import Card from '../components/Card';
import InputLine from '../components/InputLine';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

import products from '../data/products';
import positions from '../data/positions';

const ProductUpdate = props => {
    const [productInfo, setProductInfo] = useState({});
    const [positionInfo, setPositionInfo] = useState({});
    const [readBarcode, setReadBarcode] = useState(false);

    if (!readBarcode && props.barcode) {
        let valid = false;
        setReadBarcode(true);

        const data = props.barcode;
        if (typeof (data.product) === 'object') {
            setProductInfo(data.product);
        }

        if (typeof (data.position) === 'object') {
            setPositionInfo(data.position);
        }
    }

    const cancelHandler = () => {
        props.onCancel();
        // props.onScreenChange('mainScreen');
    }

    const scanSearchingProductHandler = () => {
        //setScanMethod(1);
        global.scanMethod = 2;
        props.onScreenChange('scan')
    }

    const confirmInputHandler = () => {
        const positionKeys = Object.keys(positions);
        const positionId = positionKeys.find(id => positions[id].Zone == positionInfo.Zone && positions[id].Column == positionInfo.Column);

        if (positionId === undefined) {
            Alert.alert(
                'Invalid Position',
                `The Position with Colume ${positionInfo.Column} and Zone ${positionInfo.Zone} is not found`,
                [{ text: 'OK', 'style': 'destructive' }]
            );
            return;
        }

        const productKeys = Object.keys(products);
        const productId = productKeys.find(id => products[id].Name == productInfo.Name);

        if (productId === undefined) {
            Alert.alert(
                'Invalid Product',
                `The Product with Name ${productInfo.Name} is not found`,
                [{ text: 'OK', 'style': 'destructive' }]
            );
            return;
        }

        props.onUpdate(productId, positionId);

        Alert.alert(
            'Updated',
            `Update Ok`,
            [{ text: 'OK', 'style': 'destructive' }]
        );
    };

    const InputZoneHandler = (Zone) => {
        const newPositions = { ...positionInfo, Zone: Zone };
        setPositionInfo(newPositions);
    };

    const InputColumnHandler = (Zone) => {
        const newPositions = { ...positionInfo, Zone: Zone };
        setPositionInfo(newPositions);
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Position Information</TitleText>
                <Card style={styles.inputContainer}>
                    <InputLine name='Zone' value={positionInfo.Zone} onInput={InputZoneHandler} />
                    <InputLine name='Column' value={positionInfo.Column} onInput={(Column) => {
                        setPositionInfo({ ...positionInfo, Column });
                    }} />
                </Card>
                <TitleText style={styles.title}>Product Information</TitleText>
                <Card style={styles.inputContainer}>
                    <InputLine name='Name' value={productInfo.Name} onInput={(Name) => {
                        setProductInfo({ ...productInfo, Name });
                    }} />
                </Card>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title={'Cancel'} onPress={cancelHandler} color={Colors.accent} />
                    </View>
                    <View style={styles.button}>
                        <Button title={'Confirm'} onPress={confirmInputHandler} color={Colors.primary} />
                    </View>
                    <View style={styles.button}>
                        <Button title={'Scan'} onPress={scanSearchingProductHandler} color={Colors.primary} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    button: {
        width: 90,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
});

export default ProductUpdate;