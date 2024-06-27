import { View, Text, FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";

import Colors from "@/constants/Colors";

import Profile from "@/components/profile/finder/profiles";

const DATA = [
  {
    _id: "1",
    name: "Jessica Richman",
    points: 100,
  },
  {
    _id: "2",
    name: "John Doe",
    points: 200,
  },
  {
    _id: "3",
    name: "Jane Doe",
    points: 300,
  },
  {
    _id: "4",
    name: "Alice Smith",
    points: 400,
  },
  {
    _id: "5",
    name: "Bob Smith",
    points: 500,
  },
  {
    _id: "6",
    name: "Charlie Brown",
    points: 600,
  },
  {
    _id: "7",
    name: "Daisy Duck",
    points: 700,
  },
  {
    _id: "8",
    name: "Eve Johnson",
    points: 800,
  },
  {
    _id: "9",
    name: "Frank White",
    points: 900,
  },
  {
    _id: "10",
    name: "George Black",
    points: 1000,
  },
];

export default function Finder() {
  const [filteredData, setFilteredData] =
    useState<{ _id: string; name: string; points: number }[]>(DATA);

  // Search logic.
  const searchFilterFunction = (text: string) => {
    /*if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }*/
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerBlurEffect: "light",
          headerSearchBarOptions: {
            placeholder: "Search for friends",
            autoFocus: true,
            cancelButtonText: "Cancel",
            tintColor: Colors.primary,
            hideWhenScrolling: true,
            hideNavigationBar: false,
            onChangeText: (event) => {
              searchFilterFunction(event.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={filteredData}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 17 }}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No friends found.</Text>
        )}
        renderItem={({ item }) => (
          <Profile username={item.name} points={item.points} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    marginTop: 17 * 15,
    textAlign: "center",
    fontSize: 32,
    opacity: 0.25,
  },
});
