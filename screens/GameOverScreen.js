import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Game is over</Text>
            <Text>Rounds taken: {props.roundsTaken}</Text>
            <Text>Number was: {props.number}</Text>
            <Button title="PLAY AGAIN" onPress={props.onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
});

export default GameOverScreen;