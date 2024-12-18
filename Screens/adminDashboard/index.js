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

export default function AdminDashboard() {
  const [challanData, setChallanData] = useState([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    axios
      .get("http://192.168.1.78:8080/api/fee-challan") // Replace with your backend IP
      .then((response) => {
        setChallanData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching challan data:", error);
        setLoading(false);
      });
  }, []);

  // Format dates to 'Day, Month Date, Year'
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b5998" />
        <Text style={styles.loadingText}>Loading Fee Challan...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Fee Challan for Term (FA24)</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>#</Text>
        <Text style={styles.headerText}>Installment</Text>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.headerText}>Due Date</Text>
        <Text style={styles.headerText}>Paid Date</Text>
      </View>

      {/* Table Rows */}
      {challanData.map((item, index) => (
        <View
          key={index}
          style={[
            styles.tableRow,
            index % 2 === 0 ? styles.evenRow : styles.oddRow,
          ]}
        >
          <Text style={styles.cell}>{item.installment_number}</Text>
          <Text style={styles.cell}>{item.installment_description}</Text>
          <Text style={styles.amountCell}>PKR {item.amount}</Text>
          <Text style={styles.dateCell}>{formatDate(item.due_date)}</Text>
          <Text
            style={[
              styles.dateCell,
              { color: item.paid_date ? "#28a745" : "#dc3545" },
            ]}
          >
            {formatDate(item.paid_date)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3b5998",
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3b5998",
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
  },
  headerText: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    elevation: 1,
  },
  evenRow: {
    backgroundColor: "#ffffff",
  },
  oddRow: {
    backgroundColor: "#f8f9fa",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: "#333",
  },
  amountCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#3b5998",
  },
  dateCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: "#6c757d",
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
