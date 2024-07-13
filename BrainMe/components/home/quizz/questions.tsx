import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

interface QuestionProps {
  totalQuestions: number;
  currentQuestion: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  scrollToNextQuestion: (x: number) => void;
}

import AnswerButton from "./answer-button";

export default function Question({
  totalQuestions,
  currentQuestion,
  question,
  answers,
  correctAnswer,
  scrollToNextQuestion,
}: QuestionProps) {
  const [selectedbox, setSelectedbox] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState("");
  const { width } = Dimensions.get("window");
  return (
    <View style={{ paddingHorizontal: 17, width: width }}>
      <View style={styles.container}>
        <Text style={styles.remaining}>
          Question {currentQuestion} out of {totalQuestions}
        </Text>
        <Text style={styles.question}>{question}</Text>
      </View>
      <View style={{ gap: 17 }}>
        <AnswerButton
          selectedbox={selectedbox}
          setSelectedbox={setSelectedbox}
          answer={answers[0]}
          correctAnswer={correctAnswer}
          showCorrectAnswer={showCorrectAnswer}
          setShowCorrectAnswer={setShowCorrectAnswer}
          currentQuestion={currentQuestion}
          scrollNext={scrollToNextQuestion}
          number={1}
        />
        <AnswerButton
          selectedbox={selectedbox}
          setSelectedbox={setSelectedbox}
          answer={answers[1]}
          correctAnswer={correctAnswer}
          showCorrectAnswer={showCorrectAnswer}
          setShowCorrectAnswer={setShowCorrectAnswer}
          currentQuestion={currentQuestion}
          scrollNext={scrollToNextQuestion}
          number={2}
        />
        <AnswerButton
          selectedbox={selectedbox}
          setSelectedbox={setSelectedbox}
          answer={answers[2]}
          correctAnswer={correctAnswer}
          showCorrectAnswer={showCorrectAnswer}
          setShowCorrectAnswer={setShowCorrectAnswer}
          currentQuestion={currentQuestion}
          scrollNext={scrollToNextQuestion}
          number={3}
        />
        <AnswerButton
          selectedbox={selectedbox}
          setSelectedbox={setSelectedbox}
          answer={answers[3]}
          correctAnswer={correctAnswer}
          showCorrectAnswer={showCorrectAnswer}
          setShowCorrectAnswer={setShowCorrectAnswer}
          currentQuestion={currentQuestion}
          scrollNext={scrollToNextQuestion}
          number={4}
        />
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
