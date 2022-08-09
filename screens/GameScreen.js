import Card from "../components/ui/card";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Instruction from "../components/ui/Instruction";
import GuessLogItem from "../components/game/guessLogItem";
import PrimaryButtons from "../components/ui/PrimaryButtons";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import NumberContainer from "../components/game/numberContainer";

//function to generate random number between min and max and exclude userNumber
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

//fixed boundries
let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber, onGameOver }) {
  //initially make a guess
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  //state managment for current guess
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  //add each guess to list for guess logs
  const [guessRound, setGuessNumber] = useState([]);

  const { width, height } = useWindowDimensions();

  //if number is guessed correctly, end game
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRound.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  //reset boundries for next game
  useEffect(() => {
    minBoundry = 1;
    maxBoundry = 100;
  }, []);

  //buttons logic to generate new guess
  function nextGuessHandler(direction) {
    if (
      (direction == "lower" && currentGuess < userNumber) ||
      (direction == "gretter" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundry = currentGuess;
    } else {
      minBoundry = currentGuess + 1;
    }

    //generate new random number
    const newRndNumber = generateRandomBetween(
      minBoundry,
      maxBoundry,
      currentGuess
    );

    setCurrentGuess(newRndNumber);

    //add guess to list
    setGuessNumber((prevGuessNumber) => [newRndNumber, ...prevGuessNumber]);
  }
  const guessRoundLength = guessRound.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Instruction style={styles.instructionText}>
          Higher Or Lower
        </Instruction>
        {/* buttons */}
        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            <PrimaryButtons onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButtons>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButtons onPress={nextGuessHandler.bind(this, "gretter")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButtons>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        {/* <Instruction style={styles.instructionText}>
          Higher Or Lower
        </Instruction> */}
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButtons onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButtons>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButtons onPress={nextGuessHandler.bind(this, "gretter")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButtons>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      {/* guess log list */}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRound}
          keyExtractor={(item) => item}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundLength - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
    padding: 24,
    paddingTop: 50,
  },
  buttons: {
    flexDirection: "row",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});
