import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function AttendanceScreen() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.78:8080/api/student/attendance") // Replace with your backend IP
      .then((response) => setAttendance(response.data))
      .catch((error) => console.error("Error fetching attendance:", error));
  }, []);

  // Group attendance by course
  const groupedAttendance = attendance.reduce((acc, record) => {
    acc[record.course_code] = acc[record.course_code] || {
      course_name: record.course_name,
      total_lectures: record.total_lectures,
      total_absents: record.total_absents,
      records: [],
    };
    acc[record.course_code].records.push(record);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      {Object.entries(groupedAttendance).map(([code, course]) => (
        <View key={code} style={styles.courseContainer}>
          {/* Course Header */}
          <View style={styles.courseHeader}>
            <Text style={styles.courseTitle}>{`[${code}] ${course.course_name}`}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={styles.statsTextGreen}>Total Lectures = {course.total_lectures}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.statsTextRed}>Total Absents = {course.total_absents}</Text>
              </View>
            </View>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>#</Text>
            <Text style={styles.tableHeaderText}>Lecture Date</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>

          {/* Table Rows */}
          <View style={styles.table}>
            {course.records.map((record, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.cell}>{index + 1}</Text>
                <Text style={styles.cell}>
                  {record.lecture_date
                    ? new Date(record.lecture_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </Text>
                <Text
                  style={[styles.cell, record.status === "Absent" ? styles.absentText : styles.presentText]}
                >
                  {record.status}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  courseContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "#fff",
  },
  courseHeader: {
    backgroundColor: "#3b5998",
    padding: 10,
  },
  courseTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  statsTextGreen: {
    color: "#28a745",
    fontWeight: "bold",
    fontSize: 12,
  },
  statsTextRed: {
    color: "#dc3545",
    fontWeight: "bold",
    fontSize: 12,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  cell: {
    flex: 1,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
  },
  absentText: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  presentText: {
    color: "#28a745",
    fontWeight: "bold",
  },
});
