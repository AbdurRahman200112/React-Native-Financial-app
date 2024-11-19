import React, { useEffect } from "react";
import { Image, View } from "react-native";
import style from "./Style/style";
function SplashScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Image source={require("../img/Virsme.png")} style={style.img} />
    </View>
  );
}
export default SplashScreen;
