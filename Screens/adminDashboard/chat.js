import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";

export default function Chat() {
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch academic calendar data
    axios
      .get("http://192.168.1.78:8080/api/academic-calendar") // Replace with your backend IP
      .then((response) => {
        setCalendar(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching calendar data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b5998" />
        <Text style={styles.loadingText}>Loading Academic Calendar...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Academic Calendar: FA24</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Serial No.</Text>
        <Text style={styles.tableHeaderText}>Activity</Text>
        <Text style={styles.tableHeaderText}>Date</Text>
      </View>

      {calendar.map((item, index) => (
        <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
          <Text style={styles.cell}>{item.serial_no}</Text>
          <Text style={styles.cell}>{item.activity}</Text>
          <Text style={styles.cell}>{item.date_range}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
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
  },
  tableHeaderText: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  evenRow: {
    backgroundColor: "#ffffff",
  },
  oddRow: {
    backgroundColor: "#f2f2f2",
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
    backgroundColor: "#f8f8f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
