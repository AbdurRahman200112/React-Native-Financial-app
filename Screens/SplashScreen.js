import React, { useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";

function SplashScreen({ navigation }) {
  // Navigate to another screen after 3 seconds (adjust as needed)

  return (
    <View style={styles.container}>
      <Image source={require("../img/img-4.png")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#473f97",
  },
  image: {
    width: 150,
    height: 150, // Adjust size as per your design
    resizeMode: "contain",
  },
});

export default SplashScreen;
