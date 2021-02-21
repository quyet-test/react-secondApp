import React, { useState, useRef, useEffect } from 'react';
import { Text, Button, View, Alert, StyleSheet } from 'react-native'

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer';

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    console.log(min, max, exclude);
    if (min === max) {
        return exclude;
    }

    let rdNumber = Math.ceil(Math.random() * (max - min) + min);
    if (rdNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    }

    return rdNumber;
}

const GameScreen = props => {

    const firstChoice = generateRandomNumber(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(firstChoice);
    const currentLow = useRef(1);
    const currentHight = useRef(100);
    const [rounds, setRounds] = useState(0);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const guessNumberHandler = direction => {
        if ((direction === 'lower' && currentGuess > props.userChoice) ||
            (direction === 'greater' && currentGuess < props.userChoice)) {
            Alert.alert('Don\'t lie', 'You know it\'s incorrect. Plz try again', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            currentLow.current = currentGuess;
        } else {
            currentHight.current = currentGuess;
        }

        setRounds(curRound => curRound + 1);
        //  console.log(rounds);

        const nextNumber = (generateRandomNumber(currentLow.current, currentHight.current, currentGuess));
        // console.log(currentLow.current, currentHight.current, nextNumber);
        setCurrentGuess(nextNumber);
        return;
    }

    return (
        <View style={styles.screen}>
            <Text > Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='GREATER' onPress={guessNumberHandler.bind(this, 'greater')} />
                <Button title='LOWER' onPress={guessNumberHandler.bind(this, 'lower')} />
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;