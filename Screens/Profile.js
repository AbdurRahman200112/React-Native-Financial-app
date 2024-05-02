import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import style from "./Style/style";
const Profile = () => {
  return (
    <View style={{ marginBottom: 50 }}>
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 20 }}
      >
        <Image style={style.profile} source={require("../assets/man1.jpg")} />
        <Text className="text-xl font-medium">Agent Pakula</Text>
        <Text className="text-base">Nursing Assistant</Text>
        <TouchableOpacity style={style.btnStyle4}>
          <Text
            className="text-center text-base font-bold"
            style={{ color: "#214c40" }}
          >
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 20 }}
      >
        <Image style={style.profile} source={require("../assets/man2.jpg")} />
        <Text className="text-xl font-medium">John Powell</Text>
        <Text className="text-base">Product manager</Text>
        <TouchableOpacity style={style.btnStyle4}>
          <Text
            className="text-center text-base font-bold"
            style={{ color: "#214c40" }}
          >
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Profile;
