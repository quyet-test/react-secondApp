import React, { useState } from 'react';
import { Text, View, Button,TouchableWithoutFeedback, Keyboard, Alert, StyleSheet } from 'react-native';

import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = props => {

    const [enteredInput, setEnteredInput] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const InputNumberHandler = inputText => {
        //console.log(inputText);
        inputText = inputText.replace(/[^0-9]/g, '');
        setEnteredInput(inputText);
    };

    const resetInputHandler = () => {
        setEnteredInput('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredInput);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 90) {
            Alert.alert(
                'Invalid number',
                'The input must be a number between 1 and 99',
                [{text: 'OK', 'style': 'destructive', onPress: resetInputHandler}]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredInput('');
    };

    let chosenNumberOutput;
    if (confirmed) {
        chosenNumberOutput = <Card style={styles.summaryContainer}>
            <Text> You selected </Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title="Start Game" onPress={() => {props.onStartGame(selectedNumber)}}></Button>
        </Card>;
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}> Start a new game! </Text>
                <Card style={styles.inputContainer}>
                    <Text> Select a number: </Text>
                    <Input style={styles.input}
                        blurOnSummit autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad' maxLength={2}
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
                    </View>
                </Card>
                {chosenNumberOutput}
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
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
    },
    input: {
        textAlign: 'center',
        width: 50,
    },
    summaryContainer: {
        marginTop: 20
    }
});

export default StartGameScreen;