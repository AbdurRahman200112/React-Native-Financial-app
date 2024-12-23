import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

export default function ProjectGroups() {
  const [projectGroups, setProjectGroups] = useState([]);

useEffect(() => {
  axios
    .get("http://192.168.1.78:8080/api/projectGroups") // Replace with your backend URL
    .then((response) => {
      console.log("API Response:", response.data);
      setProjectGroups(response.data);
    })
    .catch((error) => {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to load project groups.");
    });
}, []);


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Group Title: {item.group_title}</Text>
      <Text style={styles.text}>Advisor: {item.advisor_name}</Text>
      <Text style={styles.text}>Members: {item.group_members}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Project Groups</Text>
      <FlatList
        data={projectGroups}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#473f97",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
