import { View, Text, Dimensions, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

interface QuestionProps {
  totalQuestions: number;
  currentQuestion: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  userAnswers: string[];
}

import AnswerButton from "./answer-button";

export default function Question(props: QuestionProps) {
  const [selectedbox, setSelectedbox] = useState(0);
  const { width } = Dimensions.get("window");

  return (
    <View style={{ paddingHorizontal: 17, width: width }}>
      <View style={styles.container}>
        {props.userAnswers[props.currentQuestion - 1] ===
        props.correctAnswer ? (
          <AntDesign
            name="checkcircleo"
            size={30}
            color="#00FF0A"
            style={{ marginBottom: 17 }}
          />
        ) : (
          <AntDesign
            name="closecircleo"
            size={30}
            color="#FF1E1E"
            style={{ marginBottom: 17 }}
          />
        )}
        <Text style={styles.remaining}>
          Question {props.currentQuestion} out of {props.totalQuestions}
        </Text>
        <Text style={styles.question}>{props.question}</Text>
      </View>
      <View style={{ gap: 17 }}>
        {props.answers.map((answer, index) => (
          <AnswerButton
            userAnswers={props.userAnswers}
            key={index}
            selectedbox={selectedbox}
            setSelectedbox={setSelectedbox}
            answer={answer}
            correctAnswer={props.correctAnswer}
            showCorrectAnswer={true}
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
