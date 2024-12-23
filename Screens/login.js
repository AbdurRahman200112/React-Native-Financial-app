import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as LocalAuthentication from "expo-local-authentication";
import axios from "axios";

const Login = ({ navigation }) => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);

  const handleLogin = async () => {
    try {
      const loginPayload = {
        email: adminLogin ? email : customerEmail,
        password: adminLogin ? password : customerPassword,
      };

      const response = await axios.post(
        "http://192.168.1.78:8080/api/student/login", // Replace with your backend URL
        loginPayload
      );

      const { message } = response.data;
      console.log("Login Successful:", message);

      navigation.navigate(adminLogin ? "Admin Dashboard" : "General Information", {
        user_email: loginPayload.email,
      });
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(
        error.response?.data?.error || "An error occurred while logging in."
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

const handleFaceLockLogin = async () => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert("Unsupported", "Biometric hardware is not available.");
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert("Not Enrolled", "No biometric data is enrolled on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Face Lock",
      fallbackLabel: "Enter Password",
    });

    if (result.success) {
      navigation.navigate("General Information");
    } else {
      Alert.alert("Authentication Failed", "Face Lock authentication failed.");
    }
  } catch (error) {
    console.error("Face Lock Error:", error.message);
    Alert.alert("Error", "An error occurred during authentication.");
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require("../img/img-4.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Sign In</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, !adminLogin && styles.activeTab]}
          onPress={() => {
            setAdminLogin(false);
            setError("");
          }}
        >
          <Text style={[styles.tabText, !adminLogin && styles.activeTabText]}>
            Student Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, adminLogin && styles.activeTab]}
          onPress={() => {
            setAdminLogin(true);
            setError("");
          }}
        >
          <Text style={[styles.tabText, adminLogin && styles.activeTabText]}>
            Teacher Login
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        placeholderTextColor="black"
        value={adminLogin ? email : customerEmail}
        onChangeText={(text) => (adminLogin ? setEmail(text) : setCustomerEmail(text))}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Your Password"
          secureTextEntry={!showPassword}
          placeholderTextColor="black"
          value={adminLogin ? password : customerPassword}
          onChangeText={(text) => (adminLogin ? setPassword(text) : setCustomerPassword(text))}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={20}
            color="#473f97"
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginButton, styles.faceLockButton]}
          onPress={handleFaceLockLogin}
        >
          <Text style={styles.buttonText}>Face Lock Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  topContainer: {
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#473f97",
    width: "100%",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "90%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },
  tabText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
  },
  activeTab: {
    backgroundColor: "#473f97",
  },
  activeTabText: {
    color: "white",
  },
  input: {
    borderBottomWidth: 1,
    padding: 15,
    width: "90%",
    marginVertical: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "90%",
    marginVertical: 10,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "black",
  },
  eyeIcon: {
    padding: 15,
  },
  buttonContainer: {
    width: "90%",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#473f97",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  faceLockButton: {
    backgroundColor: "#34c759", // Green for Face Lock button
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginVertical: 10,
  },
});

export default Login;
