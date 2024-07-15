import { Pressable, Text, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import Colors from "@/constants/Colors";

interface AnswerButtonProps {
  selectedbox: number | null;
  setSelectedbox: (selectedbox: number | null) => void;
  answer: string;
  correctAnswer: string;
  showCorrectAnswer: boolean;
  number: number;
  currentQuestion: number;
  timerOff: boolean;
}

export default function AnswerButton(props: AnswerButtonProps) {
  const [isTimerOff, setIsTimerOff] = useState(false);

  useEffect(() => {
    if (props.timerOff && props.selectedbox === null) {
      setIsTimerOff(true);
    }
  }, [props.timerOff, props.selectedbox]);

  return (
    <View>
      {isTimerOff && props.selectedbox === null ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>You did not select an answer.</Text>
          <Text style={styles.correctAnswerText}>Correct Answer: {props.correctAnswer}</Text>
        </View>
      ) : (
        <Pressable
          disabled={props.showCorrectAnswer || isTimerOff}
          style={
            props.showCorrectAnswer &&
              props.correctAnswer === props.answer &&
              props.selectedbox === props.number
              ? styles.correctbutton
              : props.showCorrectAnswer && props.selectedbox === props.number
                ? styles.uncorrectbutton
                : props.showCorrectAnswer && props.correctAnswer === props.answer
                  ? styles.correctbutton
                  : props.selectedbox === props.number
                    ? styles.selectedbutton
                    : styles.button
          }
          onPress={() => {
            props.setSelectedbox(props.number);
          }}
        >
          <Text style={styles.text}>{props.answer}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 17,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  selectedbutton: {
    padding: 17,
    backgroundColor: "lightgrey",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  correctbutton: {
    padding: 17,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#00FF0A",
    backgroundColor: "#A2FF86",
    justifyContent: "center",
    alignItems: "center",
  },
  uncorrectbutton: {
    padding: 17,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FF6C6C",
    backgroundColor: "#FF1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "NiveauGrotesk",
    fontSize: 18,
  },
  messageContainer: {
    alignItems: "center",
    padding: 17,
  },
  messageText: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
  correctAnswerText: {
    fontSize: 18,
    color: "green",
  },
});
