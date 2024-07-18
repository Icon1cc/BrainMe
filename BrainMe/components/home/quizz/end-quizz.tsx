import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

interface EndQuizzProps {
  setReview: (review: boolean) => void;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  onHandleEndOfQuizz: () => void;
}

export default function EndQuizz(props: EndQuizzProps) {
  const isTablet = useWindowDimensions().width >= 768;
  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: isTablet ? 17 * 3 : 17,
          gap: isTablet ? 17 * 3 : 17,
        },
      ]}
    >
      <Text style={styles.title}>Quizz Results</Text>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Text style={[styles.totalquestions, { fontSize: isTablet ? 30 : 24 }]}>
          Total Questions
        </Text>
        <Text
          style={{
            fontFamily: "NiveauGrotesk",
            fontSize: isTablet ? 30 : 24,
            color: "white",
          }}
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
          <Text
            style={[
              styles.correctincorrectanswer,
              { fontSize: isTablet ? 30 : 24, color: "#FF1E1E" },
            ]}
          >
            Wrong Answers
          </Text>
          <Text
            style={[
              styles.correctincorrectanswer,
              { fontSize: isTablet ? 30 : 24, color: "#FF1E1E" },
            ]}
          >
            {props.wrongAnswers}
          </Text>
        </View>
        <View style={{ alignItems: "center", gap: 10 }}>
          <Text
            style={[
              styles.correctincorrectanswer,
              { fontSize: isTablet ? 30 : 24 },
            ]}
          >
            Correct Answers
          </Text>
          <Text
            style={[
              styles.correctincorrectanswer,
              { fontSize: isTablet ? 30 : 24 },
            ]}
          >
            {props.correctAnswers}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={require("@/assets/images/icons/checklist.png")}
          style={{
            width: isTablet ? 250 : 175,
            height: isTablet ? 250 : 175,
            alignSelf: "center",
          }}
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
          <Text
            style={[
              styles.buttonText,
              { color: "white", fontSize: isTablet ? 24 : 20 },
            ]}
          >
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
            props.onHandleEndOfQuizz();
          }}
        >
          <Text style={[styles.buttonText, { fontSize: isTablet ? 24 : 20 }]}>
            Return Home
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 17 * 2,
  },
  title: {
    color: "white",
    fontSize: 32,
    alignSelf: "center",
    fontFamily: "NiveauGroteskBold",
  },
  totalquestions: {
    color: "white",
    fontFamily: "NiveauGroteskMedium",
  },
  answers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  correctincorrectanswer: {
    color: "#00FF0A",
    fontFamily: "NiveauGroteskMedium",
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.primary,
    letterSpacing: 2,
    fontFamily: "NiveauGrotesk",
  },
});
