import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { User } from "@/api";
const { width } = Dimensions.get("screen");

const CARD_SIZE = width * 0.85;
const CARD_HEIGHT = 80;
const AVATAR_SIZE = 50;

export default function UserCard({ user }: { user: User }) {
  return (
    <View style={styles.main}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.user_info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.user_name}>@{user.username}</Text>
        <Text style={styles.user_name}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: CARD_SIZE,
    height: CARD_HEIGHT,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    paddingHorizontal: 10,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
  },
  user_info: {
    alignItems: "flex-start",
    gap: 1,
  },
  name: {
    color: "#0A0A0A",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.1,
  },
  user_name: {
    color: "#758694",
    fontWeight: "500",
    fontSize: 12,
  },
});
