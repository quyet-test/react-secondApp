import React, { useState } from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, FlatList, ScrollView } from 'react-native';

import Card from '../components/UI/Card'
import Colors from '../constants/colors'
import Input from '../components/UI/Input'
import BodyText from '../components/UI/BodyText';


import '../components/GlobalScanParams'
import products from '../data/products';
import positions from '../data/positions';
import language from '../constants/language';


const languages = language['vn'];
const renderListItem = (itemData) => {

    //console.log(itemData.item);
    const position = positions.find(position => position.id === itemData.item);
    //console.log(JSON.stringify(positions[itemData.item]));
    return (
        <View style={styles.listItem}>
            <BodyText>{languages['Column']}: {position.column}</BodyText>
            <BodyText>{languages['Zone']}: {position.zone}</BodyText>
        </View>
    )
};

const SearchProductScreen = props => {
    const [enteredInput, setEnteredInput] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [foundProduct, setFoundProduct] = useState({});
    const [readBarcode, setReadBarcode] = useState(false);

    if (!readBarcode && props.data) {
        setEnteredInput(props.data);
        setReadBarcode(true);
    }

    const InputNumberHandler = inputText => {
        setEnteredInput(inputText);
    };

    const resetInputHandler = () => {
        setEnteredInput('');
        setConfirmed(false);
    };

    const cancelHandler = () => {
        resetInputHandler();
        props.onCancel();
        // props.onScreenChange('mainScreen');
    }

    const confirmInputHandler = () => {
        const chosenProduct = products.find(item => item.id === enteredInput);
        setEnteredInput('');
        if (chosenProduct === undefined) {
            Alert.alert(
                languages['Invalid Product'],
                languages['The input Product is not found'],
                [{ text: 'OK', 'style': 'destructive', onPress: resetInputHandler }]
            );
            return;
        }

        setConfirmed(true);
        // setSelectedNumber(chosenProduct);
        setFoundProduct(chosenProduct);
    };

    const scanSearchingProductHandler = () => {
        //setScanMethod(1);
        global.scanMethod = 1;
        props.onScreenChange('scan')
    }

    const displayFoundProducts = () => {
        props.navigation.navigate({
            routeName: 'CategoryProducts',
            params: {
                categoryId: itemData.item.id
            }
        });
    };

    let foundProductOutput;
    if (confirmed) {
        const positions = props.searchProductPosition(foundProduct.id); //productPositions[foundProduct.Id];
        foundProductOutput = <View style={styles.screen}>
            <View style={styles.productContainer}>
                <View style={styles.productItem}>
                    <Text>{languages['Name']}</Text>
                    <Text>{languages[foundProduct.name]}</Text>
                </View>
                <View style={styles.productItem}>
                    <Text>{languages['Type']}</Text>
                    <Text>{languages[foundProduct.type]}</Text>
                </View>
                {/* <View style={styles.productItem}>
                    <Text>{languages['Weight']}</Text>
                    <Text>{foundProduct.Weight}</Text>
                </View> */}
                <View>
                    <BodyText>{languages['You can find the product at:']}</BodyText>
                </View>
                <FlatList
                    keyExtractor={item => item.id}
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
                <Text style={styles.title}> {languages['Search Product']}</Text>
                <Card style={styles.inputContainer}>
                    <Text>{languages['Product Code']}:</Text>
                    <Input style={styles.input}
                        blurOnSummit autoCapitalize='none'
                        autoCorrect={false}
                        value={enteredInput}
                        onChangeText={InputNumberHandler}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title={languages['Cancel']} onPress={cancelHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title={languages['OK']} onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                        <View style={styles.button}>
                            <Button title={languages['Scan']} onPress={scanSearchingProductHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {foundProductOutput}
            </View>
        </TouchableWithoutFeedback>
    )
};

SearchProductScreen.navigationOptions = (navData) => {

    return {
        headerTitle: languages['Search Product'],
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 5,
        alignItems: 'center'
    },
    productContainer: {
        //  flex: 1,
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
        width: 75,
        fontSize: 15,
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
        padding: 20,
        marginVertical: 10,
        marginLeft: 15,
        marginRight: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '79%',
    },
    positionList: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
});

export default SearchProductScreen;