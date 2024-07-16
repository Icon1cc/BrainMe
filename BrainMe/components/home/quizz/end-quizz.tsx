import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

interface EndQuizzProps {
  setReview: (review: boolean) => void;
  setPending: (pending: boolean) => void;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export default function EndQuizz(props: EndQuizzProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizz Results</Text>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Text style={styles.totalquestions}>Total Questions</Text>
        <Text
          style={{ fontFamily: "NiveauGrotesk", fontSize: 24, color: "white" }}
        >
          {props.totalQuestions}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center", gap: 10 }}>
          <Text style={styles.incorrectanswer}>Wrong Answers</Text>
          <Text style={styles.incorrectanswer}>{props.wrongAnswers}</Text>
        </View>
        <View style={{ alignItems: "center", gap: 10 }}>
          <Text style={styles.correctanswer}>Correct Answers</Text>
          <Text style={styles.correctanswer}>{props.correctAnswers}</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={require("@/assets/images/icons/checklist.png")}
          style={{ width: 175, height: 175, alignSelf: "center" }}
        />
      </View>
      <View style={{ gap: 17 }}>
        <Pressable
          style={({ pressed }) => {
            return [
              {
                opacity: pressed ? 0.75 : 1,
              },
              [styles.button, { backgroundColor: "#FF1E1E" }],
            ];
          }}
          onPress={() => {
            props.setReview(true);
          }}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Review Answers
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => {
            return [
              {
                opacity: pressed ? 0.75 : 1,
              },
              [styles.button, { backgroundColor: "white" }],
            ];
          }}
          onPress={() => {
            props.setPending(false);
            router.push("/");
          }}
        >
          <Text style={styles.buttonText}>Return Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 17 * 2,
    paddingHorizontal: 17,
    gap: 17 * 2,
  },
  title: {
    color: "white",
    fontSize: 32,
    alignSelf: "center",
    fontFamily: "NiveauGroteskBold",
  },
  totalquestions: {
    color: "white",
    fontSize: 20,
    fontFamily: "NiveauGroteskMedium",
  },
  answers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  correctanswer: {
    color: "#00FF0A",
    fontFamily: "NiveauGroteskMedium",
    fontSize: 20,
  },
  incorrectanswer: {
    color: "#FF1E1E",
    fontFamily: "NiveauGroteskMedium",
    fontSize: 20,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
    letterSpacing: 2,
    fontFamily: "NiveauGrotesk",
  },
});
