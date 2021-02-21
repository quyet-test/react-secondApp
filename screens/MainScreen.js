import React, { useState } from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, FlatList } from 'react-native';

import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import BodyText from '../components/BodyText';


import '../components/GlobalScanParams'
import products from '../data/products';
import productPositions from '../data/productInPositions';
import positions from '../data/positions';


const renderListItem = (itemData) => {

    console.log(itemData.item);
    const position = positions[itemData.item] === undefined ? {} : positions[itemData.item];
    console.log(JSON.stringify(positions[itemData.item]));
    return (
        <View style={styles.listItem}>
            <BodyText>Colume: {position.Column}</BodyText>
            <BodyText>Zone: {position.Zone}</BodyText>
        </View>
    )
};

const MainScreen = props => {

    const [enteredInput, setEnteredInput] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [foundProduct, setFoundProduct] = useState({});

    if (enteredInput === '' && props.data) {
        setEnteredInput(props.data);
    }

    const InputNumberHandler = inputText => {
        setEnteredInput(inputText);
    };

    const resetInputHandler = () => {
        setEnteredInput('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenProduct = enteredInput;
        setEnteredInput('');
        if (products[chosenProduct] === undefined) {
            Alert.alert(
                'Invalid Product',
                'The input Product is not found',
                [{ text: 'OK', 'style': 'destructive', onPress: resetInputHandler }]
            );
            return;
        }

        setConfirmed(true);
        // setSelectedNumber(chosenProduct);
        setFoundProduct(products[chosenProduct]);
    };

    const scanSearchingProductHandler = () => {
        //setScanMethod(1);
        global.scanMethod = 1;
        props.onScreenChange('scan')
    }

    let foundProductOutput;
    if (confirmed) {
        const positions = productPositions[foundProduct.Id];
        foundProductOutput = <View style={styles.screen}>
            <View style={styles.productContainer}>
                <View style={styles.productItem}>
                    <Text>Name</Text>
                    <Text>{foundProduct.Name}</Text>
                </View>
                <View style={styles.productItem}>
                    <Text>Type</Text>
                    <Text>{foundProduct.Type}</Text>
                </View>
                <View style={styles.productItem}>
                    <Text>Weight</Text>
                    <Text>{foundProduct.Weight}</Text>
                </View>
                <View>
                    <BodyText>You can find the product at:</BodyText>
                </View>
                <FlatList
                    keyExtractor={item => item}
                    data={positions}
                    renderItem={renderListItem.bind(this)}
                    contentContainerStyle={styles.positionList}
                />
            </View>

        </View>

    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}> Search or Updadate Product </Text>
                <Card style={styles.inputContainer}>
                    <Text> Search Product: </Text>
                    <Input style={styles.input}
                        blurOnSummit autoCapitalize='none'
                        autoCorrect={false}
                        value={enteredInput}
                        onChangeText={InputNumberHandler}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title={'Reset'} onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title={'Confirm'} onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                        <View style={styles.button}>
                            <Button title={'Scan'} onPress={scanSearchingProductHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {foundProductOutput}
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 5,
        alignItems: 'center'
    },
    productContainer: {
        flex: 1,
        padding: 5,
        alignItems: 'center'
    },
    productDetail: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
    },
    productItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300
    },
    positionContainer: {
        flex: 1,
        width: '60%'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        fontFamily: 'open-sans-bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 10,
    },
    button: {
        width: 90,
    },
    input: {
        textAlign: 'center',
        width: 50,
    },
    summaryContainer: {
        marginTop: 20
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%'
    },
    positionList: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default MainScreen;