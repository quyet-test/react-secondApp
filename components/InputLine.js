import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'

import Input from './Input';
const InputLine = props => {
    const [enteredInput, setEnteredInput] = useState(props.value || '');

    const InputNumberHandler = value => {
        setEnteredInput(value);
        props.onInput(value);
    };

    return (
        <View style={styles.inputLine}>
            <Text style={styles.inputName}> {props.name} </Text>
            <Input style={styles.inputValue}
                blurOnSummit autoCapitalize='none'
                autoCorrect={false}
                value={enteredInput}
                onChangeText={InputNumberHandler}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    inputLine: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 15,
        width: 400,
        maxWidth: '80%'
    },
    inputValue: {
        width: 100,
        height: 18,
        textAlign: 'center'
    },
    inputName: {
        width: 70,
        height: 18,
        textAlign: 'center',
        marginRight: 5,
    },
});

export default InputLine;