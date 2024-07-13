import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

interface AnswerButtonProps {
  selectedbox: number;
  setSelectedbox: (selectedbox: number) => void;
  answer: string;
  correctAnswer: string;
  showCorrectAnswer: string;
  setShowCorrectAnswer: (showCorrectAnswer: string) => void;
  number: number;
  currentQuestion: number;
  scrollNext: (x: number) => void;
}

export default function AnswerButton(props: AnswerButtonProps) {
  return (
    <Pressable
      disabled={props.selectedbox !== 0}
      style={
        props.selectedbox === props.number ||
        props.showCorrectAnswer === props.answer
          ? props.answer === props.correctAnswer
            ? styles.correctbutton
            : styles.uncorrectbutton
          : styles.button
      }
      onPress={() => {
        props.setSelectedbox(props.number);
        props.setShowCorrectAnswer(props.correctAnswer);
        setTimeout(() => {
          props.scrollNext(props.currentQuestion);
        }, 2000);
      }}
    >
      <Text style={styles.text}>{props.answer}</Text>
    </Pressable>
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
});
