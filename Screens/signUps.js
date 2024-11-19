import * as React from "react";
import {
  View,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import style from "./Style/style";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


const SignUp = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSignUp = () => {
    if (!emailAddress || !userName || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    const userData = {
      email_address: emailAddress,
      user_name: userName,
      password: password,
      confirm_password: confirmPassword,
    };
    fetch("http://192.168.2.78:8080/Customer/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to sign up");
        }
        return response.json();
      })
      .then((data) => {
        navigation.navigate("LOGIN");
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  };

   const toggleShowPassword = () => {
     setShowPassword(!showPassword);
   };

   const toggleShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
   };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffff",
      }} className="w-full h-full">
      <Image
        source={require("../img/Virtual.png")}
        className="h-28 w-28"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        placeholderTextColor="black"
        value={emailAddress}
        onChangeText={(text) => setEmailAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Username"
        placeholderTextColor="black"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          placeholderTextColor="black"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={20}
            color="#0b7ffe"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor="black"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEye : faEyeSlash}
            size={20}
            color="#0b7ffe"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ width: "200%", justifyContent: "end", alignItems: "center" }}>
        <TouchableOpacity style={style.btnStyle} onPress={handleSignUp}>
          <Text className="text-white text-xl font-md text-center">
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LOGIN")}>
            <Text style={{ color: "#0b7ffe" }}>Login</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    padding: 15,
    width: "80%",
    margin: 10,
    fontSize: 18,
    borderRadius: 5,
    borderColor: "black",
    color: "black",
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 18,
    color: "black",
  },
  container: {
    flexDirection: "row",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "80%",
    marginVertical: 10,
    borderRadius: 5,
    borderColor: "black",
  },
  eyeIcon: {
    padding: 15,
  },
});

export default SignUp;