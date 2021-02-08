import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native'

const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The Game Is Over!!!</Text>
            <Text>You Guess {props.rounds} Rounds</Text>
            <Button title='New Game' onPress={props.onRestart} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default GameOverScreen;