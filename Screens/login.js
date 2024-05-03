import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import style from "./Style/style";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
        let response;
        if (adminLogin) {
          response = await axios.post("http://192.168.2.78:8080/admin/login", {
            email_address: email,
            password: password,
          });
        } else {
          response = await axios.post("http://192.168.2.78:8080/customer/login", {
            email_address: customerEmail,
            password: customerPassword,
          });
        }
        const { message } = response.data;
        console.log(message);
          navigation.navigate(adminLogin ? "ADMIN DASHBOARD" : "CUSTOMER DASHBOARD", { user_email: adminLogin ? email : customerEmail });

      } catch (error) {
        console.error("Error logging in:", error.message);
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while logging in");
        }
      }
    };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View
      className="flex-1 justify-start bg-white items-center">
      <Image
        source={require("../img/investment.png")}
        className="mb-3 h-1/2 w-96"
      />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, !adminLogin && styles.activeTab]}
          className="rounded-3xl"
          onPress={() => setAdminLogin(false)}
        >
          <Text style={[styles.tabText, !adminLogin && styles.activeTabText]}>
            Customer Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, adminLogin && styles.activeTab]}
          className="rounded-3xl"
          onPress={() => setAdminLogin(true)}
        >
          <Text style={[styles.tabText, adminLogin && styles.activeTabText]}>
            Admin Login
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        placeholderTextColor="black"
        value={adminLogin ? email : customerEmail}
        onChangeText={(text) => adminLogin ? setEmail(text) : setCustomerEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Your Password"
          secureTextEntry={!showPassword}
          placeholderTextColor="black"
          value={adminLogin ? password : customerPassword}
          onChangeText={(text) => adminLogin ? setPassword(text) : setCustomerPassword(text)}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={20}
            color="#0b7ffe"
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <View
        style={{ width: "200%", justifyContent: "end", alignItems: "center" }}>
      <TouchableOpacity
        className="w-4/5"
        style={style.btnStyle}
        onPress={handleLogin}
      >
        <Text className="text-white text-xl font-md text-center">Login</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SIGNUP")}>
          <Text style={{ color: "#0b7ffe" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 8,
    width: "80%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    margin:3,
    backgroundColor: "#ddd",
  },
  tabText: {
    fontWeight: "bold",
    fontSize:15
  },
  activeTab: {
    backgroundColor: "#0b7ffe",
  },
  activeTabText: {
    color: "white",
  },
  input: {
    borderBottomWidth: 1,
    padding: 15,
    width: "80%",
    marginVertical: 10,
    fontSize: 18,
    borderRadius: 5,
    borderColor: "black",
    color: "black",
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
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 18,
    color: "black",
  },
  eyeIcon: {
    padding: 15,
  },
});

export default Login;