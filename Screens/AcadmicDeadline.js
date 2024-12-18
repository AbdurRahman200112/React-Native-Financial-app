import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

export default function AcademicDeadlines() {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
    axios
      .get("http://192.168.1.78:8080/api/academic-deadlines") // Replace with your backend IP
      .then((response) => {
        setDeadlines(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching deadlines:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b5998" />
        <Text style={styles.loadingText}>Loading Academic Deadlines...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Academic Deadlines: FA24</Text>
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Serial No.</Text>
          <Text style={styles.headerCell}>Activity</Text>
          <Text style={styles.headerCell}>Date</Text>
        </View>

        {/* Table Rows */}
        {deadlines.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.cell}>{item.serial_no}</Text>
            <Text style={styles.cell}>{item.activity}</Text>
            <Text style={styles.cell}>{item.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3b5998",
    marginBottom: 15,
  },
  tableContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3b5998",
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#f4f4f4",
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
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
