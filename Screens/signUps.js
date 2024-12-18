import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    term: "",
    cgpa: "",
    credit_earned: "",
    credit_remaining: "",
    outstanding_dues: "",
    degree_progress: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Submit data to the backend
  const handleSubmit = () => {
    if (!formData.name || !formData.term || !formData.email || !formData.password) {
      Alert.alert("Error", "Name, Term, Email, and Password are required fields!");
      return;
    }

    axios
      .post("http://192.168.1.78:8080/api/RegisterStudent", formData)
      .then((response) => {
        Alert.alert("Success", response.data.message);
        setFormData({
          name: "",
          term: "",
          cgpa: "",
          credit_earned: "",
          credit_remaining: "",
          outstanding_dues: "",
          degree_progress: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        Alert.alert("Error", error.response?.data?.error || "An error occurred!");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Register New Student</Text>

      {[
        { label: "Name", key: "name" },
        { label: "Term", key: "term" },
        { label: "CGPA", key: "cgpa" },
        { label: "Credit Earned", key: "credit_earned" },
        { label: "Credit Remaining", key: "credit_remaining" },
        { label: "Outstanding Dues", key: "outstanding_dues" },
        { label: "Degree Progress (%)", key: "degree_progress" },
        { label: "Email", key: "email" },
        { label: "Password", key: "password", secure: true },
      ].map((input) => (
        <TextInput
          key={input.key}
          style={styles.input}
          placeholder={input.label}
          value={formData[input.key]}
          secureTextEntry={input.secure || false}
          keyboardType={input.key.includes("cgpa") || input.key.includes("credit") ? "numeric" : "default"}
          onChangeText={(value) => handleInputChange(input.key, value)}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#473f97",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUp;
