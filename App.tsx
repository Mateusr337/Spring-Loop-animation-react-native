import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;

  const startChangeScale = () => {
    scale.addListener(({ value }) => console.log(value));

    Animated.spring(scale, {
      toValue: 3,
      friction: 1,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    });
  };

  const startChangeScaleLoop = () => {
    Animated.loop(
      Animated.timing(scale, {
        toValue: 3,
        useNativeDriver: true,
      })
    ).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Animated.Text
        style={[
          { fontSize: 30, color: "blue", marginBottom: 40 },
          { transform: [{ scale: scale }] },
        ]}
      >
        scale
      </Animated.Text>

      <View style={{ flexDirection: "row" }}>
        <Button onPress={startChangeScale} title="spring"></Button>
        <Button onPress={startChangeScaleLoop} title="loop"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
