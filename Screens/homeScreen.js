import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import axios from "axios";
import { ProgressChart } from "react-native-chart-kit";

export default function HomeScreen() {
  const [studentData, setStudentData] = useState({
    cgpa: 3.28,
    credit_earned: 97,
    outstanding_dues: 0,
    credit_remaining: 35,
    degree_progress: 75, // Degree completion in %
  });

  useEffect(() => {
    // Uncomment this to fetch from your backend
    // axios
    //   .get("http://192.168.1.78:8080/api/student/data")
    //   .then((response) => setStudentData(response.data))
    //   .catch((error) => {
    //     console.error(error);
    //     Alert.alert("Error", "Failed to fetch student data.");
    //   });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Hafsa Ahmad</Text>
          <Text style={styles.term}>Term: SP21</Text>
          <View style={styles.avatar} />
        </View>

        {/* Cards */}
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.greenCard]}>
            <Text style={styles.cardTitle}>{studentData.cgpa}</Text>
            <Text style={styles.cardSubtitle}>CGPA</Text>
          </View>
          <View style={[styles.card, styles.blueCard]}>
            <Text style={styles.cardTitle}>{studentData.credit_earned}</Text>
            <Text style={styles.cardSubtitle}>Credit hours earned</Text>
          </View>
          <View style={[styles.card, styles.redCard]}>
            <Text style={styles.cardTitle}>PKR {studentData.outstanding_dues}</Text>
            <Text style={styles.cardSubtitle}>OUTSTANDING DUES</Text>
          </View>
          <View style={[styles.card, styles.yellowCard]}>
            <Text style={styles.cardTitle}>{studentData.credit_remaining}</Text>
            <Text style={styles.cardSubtitle}>Credit hours remaining</Text>
          </View>
        </View>

        {/* Degree Completion */}
        <Text style={styles.sectionTitle}>Degree Completion Progress</Text>
        <View style={styles.progressContainer}>
          <ProgressChart
            data={{
              labels: ["Progress"],
              data: [studentData.degree_progress / 100],
            }}
            width={Dimensions.get("window").width - 50}
            height={200}
            strokeWidth={12}
            radius={50}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`, // Yellow
              strokeWidth: 2,
            }}
            hideLegend={true}
          />
          <Text style={styles.progressText}>
            {studentData.degree_progress}%
          </Text>
        </View>
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
    backgroundColor: "#473f97",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  term: {
    fontSize: 14,
    color: "#e0e0e0",
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "#D3D3D3",
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 25,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },
  greenCard: { backgroundColor: "#03acac" },
  blueCard: { backgroundColor: "#358fe2" },
  redCard: { backgroundColor: "#ff5c57" },
  yellowCard: { backgroundColor: "#f39c12" },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#fff",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  progressText: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    color: "#333",
  },
});
