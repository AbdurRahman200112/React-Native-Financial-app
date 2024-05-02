import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import style from "./Style/style";
const LoginButton = () => {
  const navigation = useNavigation();
  return (
    <View className="mr-4">
      <TouchableOpacity
        onPress={() => navigation.navigate("WELCOMEPAGE")}
        className="px-5 rounded-3xl"
        style={style.headerBtnStyle}
      >
        <Text className="text-white font-bold">Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginButton;
