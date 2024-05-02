import React from "react";
import { Image } from "react-native";
import style from "./Style/style";
const HeaderCustomImage = () => {
  return (
    <Image
      source={{
        uri: "https://demoapus1.com/freeio-new/wp-content/uploads/2022/09/logo-white2.png",
      }}
      style={{ height: 31, width: 105 }}
    />
  );
};
export default HeaderCustomImage;
