import React from "react";
import { View, Text } from "react-native";
import style from "./Style/style";
const CreativeDesign = () => {
  return (
    <View
      style={{
        backgroundColor: "#ffede9",
        height: 200,
        marginTop: 20,
        margin: 10,
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <View style={style.row}>
        <Text className="text-2xl font-bold mb-0" style={{ color: "#214c40" }}>
          Design & Creative
        </Text>
      </View>
      <View style={style.row}>
        <Text className="text-xl font-medium">
          Give your visitor a smooth online experience with a solid UX design.
        </Text>
      </View>
    </View>
  );
};

export default CreativeDesign;
