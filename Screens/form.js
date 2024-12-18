import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";

export default function ProgramCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch course data from the backend
    axios
      .get("http://192.168.1.78:8080/api/program-courses") // Replace with your backend IP
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching program courses:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b5998" />
        <Text style={styles.loadingText}>Loading Program Courses...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Program Courses (FA24)</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Semester</Text>
        <Text style={styles.tableHeaderText}>Course Code</Text>
        <Text style={styles.tableHeaderText}>Course Name</Text>
        <Text style={styles.tableHeaderText}>Credit Hours</Text>
        <Text style={styles.tableHeaderText}>Type</Text>
        <Text style={styles.tableHeaderText}>Prerequisite</Text>
      </View>

      {courses.map((course, index) => (
        <View
          key={index}
          style={[
            styles.tableRow,
            index % 2 === 0 ? styles.evenRow : styles.oddRow, // Alternate row color
          ]}
        >
          <Text style={styles.cell}>{course.semester}</Text>
          <Text style={styles.cell}>{course.course_code}</Text>
          <Text style={styles.cell}>{course.course_name}</Text>
          <Text style={styles.cell}>{course.credit_hours}</Text>
          <Text style={styles.cell}>{course.course_type}</Text>
          <Text style={styles.cell}>{course.prerequisite || "N/A"}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f4f7",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#3b5998",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3b5998",
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  evenRow: {
    backgroundColor: "#ffffff",
  },
  oddRow: {
    backgroundColor: "#f9f9f9",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: "#333",
    paddingHorizontal: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f7",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
