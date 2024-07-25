import { StyleSheet } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  children: React.ReactElement;
  onEndSwipe?: () => void;
}

export default function SwipeCard({ children, onEndSwipe = () => {} }: Props) {
  const translateX = useSharedValue(0);
  const prevTranslateX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      prevTranslateX.value = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      if (prevTranslateX.value === 0) {
        if (Math.abs(translationX) >= 120) return;
        if (translationX < 0) {
          translateX.value = translationX + prevTranslateX.value;
        }
      }
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > 110) {
        onEndSwipe();
        return;
      }

      translateX.value = withSpring(0);
    })
    .runOnJS(true);

  const vIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, -120], [-1, 1]);

    return {
      opacity,
    };
  }, []);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={styles.center}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          {children}
        </Animated.View>
        <Animated.View style={[styles.icon, vIconStyle]}>
          <MaterialIcons name="delete-sweep" size={26} color="#E4003A" />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 0,
    padding: 10,
    zIndex: -1,
  },
});
