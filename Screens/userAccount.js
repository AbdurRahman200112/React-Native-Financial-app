import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import style from "./Style/style";
const UserAccount = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row", marginRight: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <View style={{ flexDirection: "row" }}>
          <Icon
            name="user"
            size={23}
            color="#1d6362"
            solid
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              color: "#1d6361",
              fontWeight: "bold",
              marginRight: 20,
              marginTop: 3,
            }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <View style={{ flexDirection: "row" }}>
          <Icon
            name="user-plus"
            size={23}
            color="#1d6362"
            solid
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              color: "#1d6361",
              fontWeight: "bold",
              marginRight: 20,
              marginTop: 3,
            }}
          >
            SignUp
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default UserAccount;
