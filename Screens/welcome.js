import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Welcome({ navigation }) {
  return (
    <SafeAreaView className="bg-white h-full">
        <LinearGradient
          colors={[
            "rgba(213, 234, 253, 0.8)",
            "rgba(213, 234, 253, 0.8)",
            "rgba(213, 234, 253, 0.3)",
            "rgba(245, 186, 207, 0.1)",
            "rgba(243, 168, 195, 0.1)",
            "rgba(240, 148, 182, 0.1)",
            "rgba(213, 234, 253, 0.8)",
            "rgba(213, 234, 253, 0.8)",
            "rgba(252, 247, 232, 1)",
          ]}
          style={{flex:1}}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
        <View className="flex-1 justify-center h-full">
         <Image
          source={require("../img/Revenue-bro.png")}
          style={{ height: 400, width: "100%" }}/>
        <Text className="text-center text-4xl font-bold mt-5">
          Welcome to Mavens Advisor
        </Text>
        <View className="mt-10 justify-center items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("LOGIN")}
            className="justify-center items-center p-4 rounded-3xl"
            style={{ backgroundColor: "#0B7FFE", width: "90%" }}>
            <Text className="text-xl text-white ">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SIGNUP")}
            className="mt-5 justify-center items-center p-3 rounded-3xl"
            style={{width: "90%", borderWidth: 1 }}>
            <Text className="text-xl text-black">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
     </LinearGradient>
   </SafeAreaView>
  );
}
