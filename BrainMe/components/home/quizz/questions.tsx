import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";

interface QuestionProps {
  totalQuestions: number;
  currentQuestion: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  showCorrectAnswer: boolean;
}

import AnswerButton from "./answer-button";

export default function Question(props: QuestionProps) {
  const [selectedbox, setSelectedbox] = useState(0);
  const { width } = Dimensions.get("window");
  return (
    <View style={{ paddingHorizontal: 17, width: width }}>
      <View style={styles.container}>
        <Text style={styles.remaining}>
          Question {props.currentQuestion} out of {props.totalQuestions}
        </Text>
        <Text style={styles.question}>{props.question}</Text>
      </View>
      <View style={{ gap: 17 }}>
        {props.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            selectedbox={selectedbox}
            setSelectedbox={setSelectedbox}
            answer={answer}
            correctAnswer={props.correctAnswer}
            showCorrectAnswer={props.showCorrectAnswer}
            currentQuestion={props.currentQuestion}
            number={index + 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  remaining: {
    fontFamily: "NiveauGroteskLight",
    fontSize: 20,
    color: "white",
    opacity: 0.5,
  },
  question: {
    fontFamily: "NiveauGroteskBold",
    fontSize: 32,
    color: "white",
    textAlign: "center",
  },
});
