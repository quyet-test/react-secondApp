import React, { useState } from 'react';
import {Text, View, StyleSheet} from 'react-native'

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (min === max && max === exclude) {
        return exclude;
    }

    let rdNumber = Math.random() * (max - min) + min;
    if (rdNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    }

    return rdNumber;
}

const GameScreen = props => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomNumber(1, 100, props.userChoice));
    return(
        <View>
            
        </View>
    )
};

const styles = StyleSheet.create({

});

export default GameScreen;