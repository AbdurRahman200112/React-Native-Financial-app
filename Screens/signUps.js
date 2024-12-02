//import React, { useState } from "react";
//import {
//  View,
//  Image,
//  TextInput,
//  TouchableOpacity,
//  StyleSheet,
//  ScrollView,
//  Text,
//} from "react-native";
//import style from "./Style/style";
//import axios from "axios";
//import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
//import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
//import { LinearGradient } from 'expo-linear-gradient';
//
//const Login = ({ navigation }) => {
//  const [customerEmail, setCustomerEmail] = useState("");
//  const [customerPassword, setCustomerPassword] = useState("");
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [error, setError] = useState("");
//  const [showPassword, setShowPassword] = useState(false);
//  const [adminLogin, setAdminLogin] = useState(false);
//
//  const toggleShowPassword = () => {
//    setShowPassword(!showPassword);
//  };
//  return (
//    <ScrollView contentContainerStyle={styles.container}>
//    <View style={{height: '50%', display:'1',justifyContent:'center' ,alignItems: 'center', backgroundColor: '#473f97', width: '100%'}}>
//        <Image
//          source={require("../img/img-4.png")}
//          className="mt-10 mb-10"
//          style={style.image}
//        />
//        <Text className="text-white text-xl">Forgot Password</Text>
//        </View>
//        <View style={styles.passwordContainer} className="mt-24">
//          <TextInput
//            style={styles.passwordInput}
//            placeholder="Enter Maju Email"
//            secureTextEntry={!showPassword}
//            placeholderTextColor="black"
//            value={adminLogin ? password : customerPassword}
//            onChangeText={(text) => adminLogin ? setPassword(text) : setCustomerPassword(text)}
//          />
//          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
//            <FontAwesomeIcon
//              icon={showPassword ? faEye : faEyeSlash}
//              size={20}
//              color="#473f97"
//            />
//          </TouchableOpacity>
//        </View>
//        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
//      <View
//        style={{ width: "200%", justifyContent: "end", alignItems: "center" }}>
//        <TouchableOpacity style={style.btnStyle} className="mt-20 rounded-2xl">
//          <Text className="text-white text-base font-md text-center">
//            Generate New Password
//          </Text>
//        </TouchableOpacity>
//        </View>
//        <View style={styles.signUpContainer}>
//          <TouchableOpacity onPress={() => navigation.navigate("SIGNUP")} className="rounded-2xl">
//            <Text style={{ color: "#473f97" }}>Cancel</Text>
//          </TouchableOpacity>
//        </View>
//    </ScrollView>
//  );
//};
//const styles = StyleSheet.create({
//  container: {
//    flexGrow: 1,
//    justifyContent: "flex-start",
//    alignItems: "center",
//  },
//  tabContainer: {
//    flexDirection: "row",
//    marginBottom: 8,
//    width: "80%",
//  },
//    image: {
//      width: 400,
//      height: 450, // Adjust size as per your design
//      resizeMode: "contain",
//    },
//  tab: {
//    flex: 1,
//    alignItems: "center",
//    paddingVertical: 14,
//    margin: 3,
//    backgroundColor: "#ddd",
//    borderRadius: 20,
//  },
//  tabText: {
//    fontWeight: "bold",
//    fontSize: 15,
//  },
//  activeTab: {
//    backgroundColor: "#473f97",
//  },
//  activeTabText: {
//    color: "white",
//  },
//  input: {
//    borderBottomWidth: 1,
//    padding: 15,
//    width: "80%",
//    marginVertical: 10,
//    fontSize: 18,
//    borderRadius: 5,
//    borderColor: "black",
//    color: "black",
//  },
//  passwordContainer: {
//    flexDirection: "row",
//    alignItems: "center",
//    borderBottomWidth: 1,
//    width: "80%",
//    marginVertical: 10,
//    borderRadius: 5,
//    borderColor: "black",
//  },
//  passwordInput: {
//    flex: 1,
//    padding: 15,
//    fontSize: 18,
//    color: "black",
//  },
//  eyeIcon: {
//    padding: 15,
//  },
//  buttonContainer: {
//    width: "100%",
//    justifyContent: "center",
//    alignItems: "center",
//    marginTop: 20,
//  },
//  signUpContainer: {
//    flexDirection: "row",
//    marginTop: 10,
//  },
//});
//export default Login;
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
    fetch("http://192.168.1.215:8080/Customer/Signup", {
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