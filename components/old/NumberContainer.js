import React from 'react';
import {Text, View, StyleSheet} from 'react-native'

import Colors from '../constants/colors'

const NumberContainer = props => {

    return(
        <View style={styles.numberContainer}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    numberContainer: {
        borderWidth: 10,
        padding: 20,
        borderColor: Colors.accent,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    number: {
        color: Colors.accent,
        fontSize: 20,
    }
});

export default NumberContainer;