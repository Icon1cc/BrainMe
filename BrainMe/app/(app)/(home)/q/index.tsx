import { View, FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useRef } from "react";

import Colors from "@/constants/Colors";
import TimeBar from "@/components/home/quizz/time-bar";
import Question from "@/components/home/quizz/questions";

const url = "https://the-trivia-api.com/api/questions";

enum CategorySelection {
  Music = "music",
  History = "history",
  Geography = "geography",
  Science = "science",
  "Arts & Literature" = "arts_and_literature",
  "General Knowledge" = "general_knowledge",
  Food = "food_and_drink",
  Sport = "sport_and_leisure",
  Movie = "film_and_tv",
  Culture = "society_and_culture",
}

export default function Quizz() {
  // Get the category and difficulty from the URL.
  const { category, difficulty } = useLocalSearchParams();

  // Get the safe area insets.
  const insets = useSafeAreaInsets();

  // Ref to the FlatList.
  const _FlatList = useRef<FlatList>(null);

  // State to store the questions.
  const [data, setData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeUp, setTimeUp] = useState(false);
  console.log(timeUp);

  // PendingScreen component.
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (timeUp) {
      setTimeout(() => {
        if (currentQuestion < data.length) {
          _FlatList.current?.scrollToIndex({
            index: currentQuestion,
          });
          setCurrentQuestion(currentQuestion + 1);
          setTimeUp(false);
        } else {
          // End of the quizz.
          setTimeUp(false);
          setPending(false);
        }
      }, 3000);
    }
  }, [timeUp]);

  useEffect(() => {
    // Fetch the questions.
    const fetchQuestions = async () => {
      try {
        const params = new URLSearchParams({
          limit: "5",
          difficulties: `${difficulty}`,
          categories: `${CategorySelection[category as keyof typeof CategorySelection]}`,
        });
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();
        setData(
          data.map((question: any) => ({
            question: question.question,
            answers: question.incorrectAnswers
              .concat(question.correctAnswer)
              .sort(() => Math.random() - 0.5),
            correctAnswer: question.correctAnswer,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);
  return (
    <View style={[styles.container, { paddingVertical: insets.top + 17 }]}>
      {pending ? (
        <>
          <TimeBar timeUp={timeUp} setTimeUp={setTimeUp} />
          <FlatList
            ref={_FlatList}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(item) => item.question}
            renderItem={({ item, index }) => (
              <Question
                totalQuestions={data.length}
                currentQuestion={index + 1}
                question={item.question}
                answers={item.answers}
                correctAnswer={item.correctAnswer}
                showCorrectAnswer={timeUp}
              />
            )}
          />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
