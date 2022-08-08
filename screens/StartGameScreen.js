import { useState } from "react";
import Colors from "../constants/colors";
import Card from "../components/ui/card";
import Title from "../components/ui/Title";
import Instruction from "../components/ui/Instruction";
import PrimaryButtons from "../components/ui/PrimaryButtons";
import { View, TextInput, StyleSheet, Alert } from "react-native";

function StartGameScreen({ onPickNumber }) {
  //state managment for user entered number
  const [enteredNumber, setEnteredNumber] = useState("");

  //set entered number
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  //reset state
  function resetInputHandler() {
    setEnteredNumber("");
  }

  // confirm entered number and validate number
  function comfirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number",
        "Number has to be a number between 1 to 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <Instruction>Enter a Number</Instruction>
        {/* Input */}
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <PrimaryButtons onPress={resetInputHandler}>Reset</PrimaryButtons>
          </View>
          <View style={styles.button}>
            <PrimaryButtons onPress={comfirmInputHandler}>
              Confirm
            </PrimaryButtons>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  instruction: {
    color: Colors.accent500,
    fontSize: 24,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
