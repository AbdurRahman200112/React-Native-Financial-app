import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";

export default function CourseTeacherSelector() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch courses dynamically from the database
  useEffect(() => {
    axios
      .get("http://192.168.1.78:8080/api/getCourses") // Replace with your backend URL
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
        Alert.alert("Error", "Failed to fetch courses.");
      });
  }, []);

  // Fetch teacher for the selected course
  const fetchTeacher = () => {
    if (!selectedCourse) {
      return Alert.alert("Error", "Please select a course.");
    }

    axios
      .post("http://192.168.1.78:8080/api/getTeacherByCourse", {
        courseId: selectedCourse.id,
      })
      .then((response) => {
        setTeacher(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
        Alert.alert("Error", "Failed to fetch teacher.");
      });
  };

  // Add the selected course and teacher to the selected_teachers table
const addTeacherSelection = () => {
  if (!teacher) {
    return Alert.alert("Error", "No teacher selected.");
  }

  axios
    .post("http://192.168.1.78:8080/api/addTeacherSelection", {
      courseId: selectedCourse.id,
      courseName: selectedCourse.course_name, // Include course name
      teacherName: teacher.teacher_name,
    })
    .then((response) => {
      Alert.alert("Success", response.data.message);
      setTeacher(null);
      setSelectedCourse(null);
    })
    .catch((error) => {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to add teacher selection.");
    });
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Course</Text>

      {/* Dropdown Trigger */}
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedCourse ? selectedCourse.course_name : "Select a Course"}
        </Text>
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal
        visible={dropdownVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dropdown}>
            <FlatList
              data={courses}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCourse(item);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>
                    {item.course_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={fetchTeacher}>
        <Text style={styles.buttonText}>Fetch Teacher</Text>
      </TouchableOpacity>

      {teacher && (
        <View style={styles.card}>
          <Text style={styles.text}>Course: {teacher.course_name}</Text>
          <Text style={styles.text}>Teacher: {teacher.teacher_name}</Text>
        </View>
      )}

      {teacher && (
        <TouchableOpacity style={styles.button} onPress={addTeacherSelection}>
          <Text style={styles.buttonText}>Add Teacher</Text>
        </TouchableOpacity>
      )}
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
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdown: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#473f97",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
});
