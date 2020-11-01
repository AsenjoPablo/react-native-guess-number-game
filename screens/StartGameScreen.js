import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

import Card from "../components/Card";
import Colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const inputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, "")); //regex validator
  };

  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // validating one more time just in case
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "OK", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue(""); //state changed but was not processed (re-rendered) yet
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={{ color: Colors.primaryDark, textAlign: "center" }}>
          You selected:
        </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <View style={styles.startButton}>
          <Button
            title="START"
            color={Colors.primaryDark}
            onPress={() => props.onStartGame(selectedNumber)}
          />
        </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Let's start a new game</Text>
        <Card style={styles.inputContainer}>
          <Text>Input a number</Text>
          <Input
            blurOnSubmit
            keyboardType="number-pad"
            maxLength={2}
            style={styles.input}
            onChangeText={inputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={() => {
                  resetInputHandler();
                }}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={() => {
                  confirmInputHandler();
                }}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 36,
    color: Colors.primaryDark,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginVertical: 24,
    alignItems: "center",
    width: "60%",
  },
  startButton: {
    marginVertical: 10,
    width: "60%",
    padding: 5,
  },
});

export default StartGameScreen;
