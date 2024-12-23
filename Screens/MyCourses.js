import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function MyCourses() {
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch selected teachers from the database
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://192.168.1.78:8080/api/getSelectedTeachers") // Replace with your backend URL
      .then((response) => {
        setSelectedTeachers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        Alert.alert("Error", "Failed to fetch registered courses.");
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.courseName}>{item.course_name}</Text>
      </View>
      <View style={styles.cardContent}>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Course Code:</Text> {item.course_code}
            </Text>
        <Text style={styles.detailText}>
          <Text style={styles.bold}>Teacher:</Text> {item.teacher_name}
        </Text>
        <Text style={styles.detailText}>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Registered Courses</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#473f97" />
      ) : (
        <FlatList
          data={selectedTeachers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#473f97",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    backgroundColor: "#473f97",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  courseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardContent: {
    padding: 15,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
});
