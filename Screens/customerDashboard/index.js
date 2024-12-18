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

export default function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.1.78:8080/api/timetable") // Replace with your backend IP
      .then((response) => {
        setTimetable(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching timetable:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b5998" />
        <Text style={styles.loadingText}>Loading Timetable...</Text>
      </View>
    );
  }

  // Group timetable data by time slots and days
  const timeSlots = [
    "08:30 AM - 10:00 AM",
    "10:00 AM - 11:30 AM",
    "11:45 AM - 01:15 PM",
    "01:15 PM - 02:45 PM",
    "03:00 PM - 04:30 PM",
    "04:30 PM - 06:00 PM",
    "05:00 PM - 06:00 PM",
  ];

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const groupedData = {};
  days.forEach((day) => {
    groupedData[day] = {};
    timeSlots.forEach((slot) => (groupedData[day][slot] = null));
  });

  timetable.forEach((item) => {
    groupedData[item.day][item.time_slot] = item;
  });

  return (
    <ScrollView horizontal>
      <View style={styles.gridContainer}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <View style={styles.timeSlotCell}>
            <Text style={styles.headerText}>Time</Text>
          </View>
          {days.map((day, index) => (
            <View key={index} style={styles.dayHeaderCell}>
              <Text style={styles.headerText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Table Content */}
        {timeSlots.map((timeSlot, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {/* Time Column */}
            <View style={styles.timeSlotCell}>
              <Text style={styles.timeSlotText}>{timeSlot}</Text>
            </View>

            {/* Day Columns */}
            {days.map((day, colIndex) => {
              const slot = groupedData[day][timeSlot];
              return (
                <View
                  key={colIndex}
                  style={[
                    styles.cell,
                    rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
                  ]}
                >
                  {slot ? (
                    <View style={styles.courseCard}>
                      <Text style={styles.courseName}>{slot.course_name}</Text>
                      <Text style={styles.instructorName}>
                        {slot.instructor_name}
                      </Text>
                      <Text style={styles.roomCode}>{slot.room_code}</Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "column",
    backgroundColor: "#f8f9fa",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#3b5998",
    paddingVertical: 10,
  },
  dayHeaderCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  timeSlotCell: {
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#3b5998",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  evenRow: {
    backgroundColor: "#ffffff",
  },
  oddRow: {
    backgroundColor: "#f7f7f7",
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#3b5998",
  },
  courseCard: {
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: "90%",
  },
  courseName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  instructorName: {
    fontSize: 10,
    color: "#555",
  },
  roomCode: {
    fontSize: 10,
    color: "#28a745",
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
