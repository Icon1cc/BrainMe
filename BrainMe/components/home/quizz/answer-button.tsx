import { Pressable, Text, StyleSheet, View } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

interface AnswerButtonProps {
  userAnswers?: string[];
  selectedbox: number;
  setSelectedbox: (number: number) => void;
  answer: string;
  correctAnswer: string;
  showCorrectAnswer: boolean;
  number: number;
  currentQuestion: number;
}

export default function AnswerButton(props: AnswerButtonProps) {
  return (
    <View>
      <Pressable
        disabled={props.showCorrectAnswer}
        style={
          // If we're in the review section
          props.userAnswers
            ? (props.userAnswers[props.currentQuestion - 1] ===
                props.correctAnswer &&
                props.userAnswers[props.currentQuestion - 1] ===
                  props.answer) ||
              props.correctAnswer === props.answer
              ? styles.correctbutton
              : props.userAnswers[props.currentQuestion - 1] === props.answer
                ? styles.uncorrectbutton
                : styles.button
            : // If we're in the quizz section
              props.showCorrectAnswer &&
                props.correctAnswer === props.answer &&
                props.selectedbox === props.number
              ? styles.correctbutton
              : props.showCorrectAnswer && props.selectedbox === props.number
                ? styles.uncorrectbutton
                : props.showCorrectAnswer &&
                    props.correctAnswer === props.answer
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
});
