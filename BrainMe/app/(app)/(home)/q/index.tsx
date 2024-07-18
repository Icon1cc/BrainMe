import { View, FlatList, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";

import Colors from "@/constants/Colors";
import TimeBar from "@/components/home/quizz/time-bar";
import Question from "@/components/home/quizz/questions";
import EndQuizz from "@/components/home/quizz/end-quizz";
import ReviewQuestion from "@/components/home/quizz/review-question";

const url = "https://the-trivia-api.com/api/questions";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

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
  const insertQuizz = useMutation(api.quizz.insert);
  const updateQuizz = useMutation(api.quizz.update);
  const quizz = useQuery(api.quizz.retrieve);
  console.log(quizz?._id);
  const myUser = useQuery(api.user.myUser);
  const router = useRouter();

  // Get the category and difficulty from the URL.
  const { category, difficulty } = useLocalSearchParams();

  // Get the safe area insets.
  const insets = useSafeAreaInsets();

  // Ref to the FlatList.
  const _FlatList = useRef<FlatList>(null);

  // State to store the questions.
  const [data, setData] = useState<any>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [userCorrectAnswers, setUserCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeUp, setTimeUp] = useState(false);

  // PendingScreen component.
  const [pending, setPending] = useState(false);
  const [review, setReview] = useState(false);

  const handleOnEndOfQuizz = () => {
    setPending(false);
    router.push("/");
  };

  useEffect(() => {
    if (timeUp) {
      setTimeout(() => {
        if (currentQuestion < data.length) {
          _FlatList.current?.scrollToIndex({
            index: currentQuestion,
          });
          setUserAnswers([...userAnswers, userAnswer]);
          setUserAnswer("");
          setCurrentQuestion(currentQuestion + 1);
          setTimeUp(false);
        } else {
          // End of the quizz.
          setUserAnswers([...userAnswers, userAnswer]);
          setUserAnswer("");
          setTimeUp(false);
          setPending(true);
        }
      }, 2000);
    }
  }, [timeUp]);

  useEffect(() => {
    if (userAnswers.length === data.length) {
      setUserCorrectAnswers(
        userAnswers.filter(
          (answer, index) => answer === data[index].correctAnswer
        ).length
      );
    }
  }, [userAnswers]);

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
        const quizz = data.map((question: any) => ({
          question: question.question,
          answers: question.incorrectAnswers
            .concat(question.correctAnswer)
            .sort(() => Math.random() - 0.5),
          correctAnswer: question.correctAnswer,
        }));
        insertQuizz({
          category: category as string,
          difficulty: difficulty as string,
          questions: quizz.map((q: any) => q.question!),
          answers: quizz.map((q: any) => ({
            incorrectAnswers: q.answers.filter(
              (a: any) => a !== q.correctAnswer
            ),
            correctAnswer: q.correctAnswer,
          })),
          userAnswers: [],
        });
        setData(quizz);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: insets.top + 17,
      }}
    >
      {!pending ? (
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
                setUserAnswer={setUserAnswer}
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
      ) : review ? (
        <>
          <Pressable
            hitSlop={25}
            style={{ alignSelf: "flex-end", paddingRight: 17 }}
            onPress={() => {
              setReview(false);
            }}
          >
            <Ionicons name="close" size={30} color={"white"} />
          </Pressable>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEnabled={true}
          >
            {data.map((item: any, index: any) => (
              <ReviewQuestion
                key={index}
                userAnswers={userAnswers}
                totalQuestions={data.length}
                currentQuestion={index + 1}
                question={item.question}
                answers={item.answers}
                correctAnswer={item.correctAnswer}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <EndQuizz
            setReview={setReview}
            totalQuestions={data.length}
            correctAnswers={userCorrectAnswers}
            wrongAnswers={data.length - userCorrectAnswers}
            onHandleEndOfQuizz={handleOnEndOfQuizz}
          />
        </>
      )}
    </View>
  );
}
