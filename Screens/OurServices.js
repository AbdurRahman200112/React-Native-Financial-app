import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";

export default function AvailableServices() {
  const [transcript, setTranscript] = useState([]);
  const student_id = 1; // Set student ID here

  useEffect(() => {
    // Fetch transcript data
    axios
      .get(`http://192.168.1.78:8080/api/transcript/data`) // Replace IP with your server IP
      .then((response) => setTranscript(response.data))
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to fetch transcript data");
      });
  }, []);

  const renderTermSections = () => {
    const terms = {};
    transcript.forEach((item) => {
      if (!terms[item.term]) terms[item.term] = [];
      terms[item.term].push(item);
    });

    return Object.keys(terms).map((term) => (
      <View key={term} style={styles.termContainer}>
        <Text style={styles.termHeader}>{term}</Text>
        <View style={styles.courseRowHeader}>
          <Text style={[styles.columnHeader, { width: "25%" }]}>
            Course Code
          </Text>
          <Text style={[styles.columnHeader, { width: "35%" }]}>
            Course Name
          </Text>
          <Text style={[styles.columnHeader, { width: "20%" }]}>
            Credit Hrs
          </Text>
          <Text style={[styles.columnHeader, { width: "20%" }]}>Grade</Text>
        </View>
        {terms[term].map((course, index) => (
          <View key={index} style={styles.courseRow}>
            <Text style={[styles.courseText, { width: "25%" }]}>
              {course.course_code}
            </Text>
            <Text style={[styles.courseText, { width: "35%" }]}>
              {course.course_name}
            </Text>
            <Text style={[styles.courseText, { width: "20%" }]}>
              {course.credit_hours}
            </Text>
            <Text style={[styles.courseText, { width: "20%" }]}>
              {course.grade}
            </Text>
          </View>
        ))}
        <View style={styles.gpaContainer}>
          <Text style={styles.gpaText}>GPA</Text>
          <Text style={styles.gpaValue}>{terms[term][0].gpa}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>My Transcript</Text>
        {renderTermSections()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  termContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  termHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#473f97",
    marginBottom: 5,
  },
  courseRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  columnHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#473f97",
  },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  courseText: {
    fontSize: 14,
    color: "#333",
  },
  gpaContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  gpaText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  gpaValue: {
    fontSize: 16,
    backgroundColor: "#473f97",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
