import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOver from "./screens/GameOver";
import { StatusBar } from "expo-status-bar";

export default function App() {
  //state managments
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState(0);

  //get user number from start game screen
  function pickedNumberHandler(pickNumber) {
    setUserNumber(pickNumber);
    setIsGameOver(false);
  }

  //game over handler and reset game
  function gameOverHandler(numberOfRounds) {
    setIsGameOver(true);
    setRoundsNumber(numberOfRounds);
  }

  //render game screen
  function startNewGameHandler() {
    setUserNumber(), setIsGameOver(true), setRoundsNumber(0);
  }

  //till number is not picked show start game screen
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  //if user number is picked show game screen
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  //if game is over show game over screen & send round numbers to game over screen
  if (isGameOver && userNumber) {
    screen = (
      <GameOver
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
        roundsNumber={roundsNumber}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.accent600, Colors.primary600]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode={"cover"}
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.4,
  },
});
