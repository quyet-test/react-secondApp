import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen';
import GameOverscreen from './screens/GameOverScreen';
import { AppLoading } from 'expo';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [roundNumber, setRoundNumber] = useState(0);

  const startGameHandler = numberSelected => {
    setUserNumber(numberSelected);
    setRoundNumber(0);
  }

  const restartGameHandler = () => {
    setUserNumber(false);
    setRoundNumber(0);
  }

  const gameOverHandler = numberRounds => {
    setRoundNumber(numberRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (roundNumber > 0) {
    content = <GameOverscreen rounds={roundNumber} onRestart={restartGameHandler} />
  }
  else if (userNumber) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }
  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
