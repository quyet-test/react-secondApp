import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, FlatList } from 'react-native';

import Card from '../components/Card';
import InputLine from '../components/InputLine';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

import products from '../data/products';
import positions from '../data/positions';
import language from '../constants/language';

const ProductUpdate = props => {
    const languages = language['vn'];
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
        const position = positions.find(item => item.zone == positionInfo.zone && item.column == positionInfo.column);

        if (position === undefined) {
            Alert.alert(
                languages['Invalid Position'],
                `${languages['Cannot found position with column and zone']}: ${positionInfo.column}, ${positionInfo.zone}.`,
                [{ text: 'OK', 'style': 'destructive' }]
            );
            return;
        }

        const positionId = position.id;
        const product = products.find(item => item.name == productInfo.name);

        if (product === undefined) {
            Alert.alert(
                languages['Invalid Product'],
                `${languages['Cannot find the product']} ${productInfo.name}`,
                [{ text: 'OK', 'style': 'destructive' }]
            );
            return;
        }

        props.onUpdate(product.id, positionId);

        Alert.alert(
            languages['Updated'],
            languages[`Update Ok`],
            [{ text: 'OK', 'style': 'destructive' }]
        );
    };

    const InputZoneHandler = (Zone) => {
        const newPositions = { ...positionInfo, zone: Zone };
        setPositionInfo(newPositions);
    };

    const InputColumnHandler = (Zone) => {
        const newPositions = { ...positionInfo, zone: Zone };
        setPositionInfo(newPositions);
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>{languages['Position Information']}</TitleText>
                <Card style={styles.inputContainer}>
                    <InputLine name={languages['Zone']} value={positionInfo.zone} onInput={InputZoneHandler} />
                    <InputLine name={languages['Column']} value={positionInfo.column} onInput={(column) => {
                        setPositionInfo({ ...positionInfo, column });
                    }} />
                </Card>
                <TitleText style={styles.title}>{languages['Product Information']}</TitleText>
                <Card style={styles.inputContainer}>
                    <InputLine name={languages['Name']} value={productInfo.Name} onInput={(Name) => {
                        setProductInfo({ ...productInfo, Name });
                    }} />
                </Card>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title={languages['Cancel']} onPress={cancelHandler} color={Colors.accent} />
                    </View>
                    <View style={styles.button}>
                        <Button title={languages['Confirm']} onPress={confirmInputHandler} color={Colors.primary} />
                    </View>
                    <View style={styles.button}>
                        <Button title={languages['Scan']} onPress={scanSearchingProductHandler} color={Colors.primary} />
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