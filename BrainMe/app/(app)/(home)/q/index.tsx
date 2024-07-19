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

import { useMutation, useQuery, useConvex } from "convex/react";
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
  const board = useQuery(api.leaderboard.retrieve);
  const boardUpdate = useMutation(api.leaderboard.update);
  const statistics = useQuery(api.userstatistics.retrieve);
  const statisticsUpdate = useMutation(api.userstatistics.update);
  const router = useRouter();
  const convex = useConvex();

  // Get the category and difficulty from the URL.
  const { category, difficulty } = useLocalSearchParams();

  // Get the safe area insets.
  const insets = useSafeAreaInsets();

  // Ref to the FlatList.
  const _FlatList = useRef<FlatList>(null);

  // State to store the questions.
  const [data, setData] = useState<any>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeUp, setTimeUp] = useState(false);

  // PendingScreen component.
  const [pending, setPending] = useState(false);
  const [review, setReview] = useState(false);

  const handleOnEndOfQuizz = () => {
    const threshold = 2;
    const correctAnswers = data.filter((question: any, index: number) => {
      return question.correctAnswer === quizz?.userAnswers[index];
    }).length;
    if (correctAnswers > threshold) {
      const points =
        difficulty === "easy" ? 2 : difficulty === "medium" ? 3 : 5;
      boardUpdate({
        points: board?.points! + points,
      });
      statisticsUpdate({
        games: statistics?.games! + 1,
        points: board?.points! + points,
        correctAnswers: statistics?.correctAnswers! + correctAnswers,
      });
    } else {
      statisticsUpdate({
        games: statistics?.games! + 1,
        correctAnswers: statistics?.correctAnswers! + correctAnswers,
      });
    }
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
          updateQuizz({
            _id: quizz?._id!,
            userAnswers: [...userAnswers, userAnswer],
          });
          setUserAnswers([...userAnswers, userAnswer]);
          setUserAnswer("");
          setCurrentQuestion(currentQuestion + 1);
          setTimeUp(false);
        } else {
          // End of the quizz.
          updateQuizz({
            _id: quizz?._id!,
            userAnswers: [...userAnswers, userAnswer],
          });
          setUserAnswers([...userAnswers, userAnswer]);
          setUserAnswer("");
          setPending(true);
        }
      }, 2000);
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
        const quizz = data.map((question: any) => ({
          question: question.question,
          answers: question.incorrectAnswers
            .concat(question.correctAnswer)
            .sort(() => Math.random() - 0.5),
          correctAnswer: question.correctAnswer,
        }));
        const user = await convex.query(api.user.retrieve);
        if (user) {
          insertQuizz({
            user_id: user._id,
            category: category as string,
            difficulty: difficulty as string,
            questions: data.map((q: any) => q.question),
            answers: data.map((q: any) => ({
              incorrectAnswers: q.incorrectAnswers.sort(
                () => Math.random() - 0.5
              ),
              correctAnswer: q.correctAnswer,
            })),
            userAnswers: [],
          });
          setData(quizz);
        }
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
                userAnswers={quizz?.userAnswers!}
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
            correctAnswers={
              data.filter((question: any, index: number) => {
                return question.correctAnswer === quizz?.userAnswers[index];
              }).length
            }
            wrongAnswers={
              data.length -
              data.filter((question: any, index: number) => {
                return question.correctAnswer === quizz?.userAnswers[index];
              }).length
            }
            onHandleEndOfQuizz={handleOnEndOfQuizz}
          />
        </>
      )}
    </View>
  );
}
