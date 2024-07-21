import { Ionicons } from "@expo/vector-icons";
import React, { Component, PropsWithChildren } from "react";
import { Animated, StyleSheet, View, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";

// This script is a modified version of the example provided by the react-native-gesture-handler library

interface RectangularButtonProps {
  color: string;
  onPressMessage: () => void;
  onPressUser: () => void;
  text: string;
}

function RectangularButton(props: RectangularButtonProps) {
  return (
    <RectButton
      style={[
        styles.rightAction,
        {
          backgroundColor: props.color,
        },
      ]}
      onPress={props.text === "Chat" ? props.onPressMessage : props.onPressUser}
    >
      <Ionicons
        name={props.text === "Chat" ? "chatbubbles-outline" : "person-outline"}
        size={24}
        color={"#fff"}
      />
    </RectButton>
  );
}

interface SwipieProps {
  children: React.ReactNode;
  onPressMessage: () => void;
  onPressUser: () => void;
}

export default function Swipie({
  children,
  onPressMessage,
  onPressUser,
}: SwipieProps) {
  return (
    <AppleStyleSwipeableRow
      onPressMessage={onPressMessage}
      onPressUser={onPressUser}
    >
      {children}
    </AppleStyleSwipeableRow>
  );
}

interface AppleStyleSwipeableRowProps extends PropsWithChildren<unknown> {
  onPressMessage: () => void;
  onPressUser: () => void;
}

class AppleStyleSwipeableRow extends Component<AppleStyleSwipeableRowProps> {
  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const onPressMessage = () => {
      const { onPressMessage } = this.props;
      if (onPressMessage) {
        this.close();
        onPressMessage();
      }
    };

    const onPressUser = () => {
      const { onPressUser } = this.props;
      if (onPressUser) {
        this.close();
        onPressUser();
      }
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectangularButton
          color={color}
          onPressMessage={onPressMessage}
          onPressUser={onPressUser}
          text={text}
        />
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 150,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {this.renderRightAction("Chat", "#FF6C6C", 192, progress)}
      {this.renderRightAction("User", "green", 128, progress)}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
  };
  render() {
    const { children } = this.props;

    return (
      <Swipeable
        ref={this.updateRef}
        friction={1}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={(direction) => {
          console.log(`Opening swipeable from the ${direction}`);
        }}
        onSwipeableClose={(direction) => {
          console.log(`Closing swipeable to the ${direction}`);
        }}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
