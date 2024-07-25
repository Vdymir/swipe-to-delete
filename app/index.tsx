import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { USERS } from "@/api";
import SwipeCard from "@/components/SwipeCard";
import UserCard from "@/components/UserCard";

const CARD_HEIGHT = 80;

export default function Index() {
  return (
    <GestureHandlerRootView>
      <View style={styles.main}>
        <SafeAreaView>
          <ScrollView
            style={{ paddingVertical: 20 }}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {USERS.map((user) => {
              const height = useSharedValue(CARD_HEIGHT);
              const opacity = useSharedValue(1);
              const marginBottom = useSharedValue(12);
              return (
                <Animated.View
                  key={user.userId}
                  style={{
                    height,
                    opacity,
                    marginBottom,
                  }}
                >
                  <SwipeCard
                    onEndSwipe={() => {
                      height.value = withTiming(0);
                      opacity.value = withTiming(0);
                      marginBottom.value = withTiming(0);
                    }}
                  >
                    <UserCard user={user} />
                  </SwipeCard>
                </Animated.View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
