import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  TextInput
} from "react-native";
import axios from "axios";

const AddCoursesStudent = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("Select Student");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("Select Course");
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [courseModalVisible, setCourseModalVisible] = useState(false);

  // Fetch students and courses on component mount
  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const [studentRes, courseRes] = await Promise.all([
          axios.get("http://192.168.1.215:8080/ShowStudents"),
          axios.get("http://192.168.1.215:8080/ShowCourses"),
        ]);
        setStudents(studentRes.data.students);
        setCourses(courseRes.data.courses);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data.");
      }
    };

    fetchStudentsAndCourses();
  }, []);

  // Handle registration submission
  const handleRegister = async () => {
    if (!selectedStudent || !selectedCourse) {
      Alert.alert("Error", "Please select both student and course.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.1.215:8080/StudentRegister", {
        student_id: selectedStudent,
        course_id: selectedCourse,
      });
      Alert.alert("Success", response.data.message || "Student registered successfully!");
      setSelectedStudent("");
      setSelectedStudentName("Select Student");
      setSelectedCourse("");
      setSelectedCourseName("Select Course");
    } catch (error) {
      console.error("Error registering student:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Failed to register student.");
    }
  };

  const renderDropdownItem = (item, setSelected, setSelectedName, closeModal) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setSelected(item.id);
        setSelectedName(item.name || item.course_name);
        closeModal(false);
      }}
    >
      <Text>{item.name || item.course_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Student to Course</Text>

      {/* Student Dropdown */}
      <Text style={styles.label}>Select Student:</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setStudentModalVisible(true)}
      >
        <Text>{selectedStudentName}</Text>
      </TouchableOpacity>

      <Modal
        visible={studentModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={students}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              renderDropdownItem(item, setSelectedStudent, setSelectedStudentName, setStudentModalVisible)
            }
          />
        </View>
      </Modal>

      {/* Course Dropdown */}
      <Text style={styles.label}>Select Course:</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setCourseModalVisible(true)}
      >
        <Text>{selectedCourseName}</Text>
      </TouchableOpacity>

      <Modal
        visible={courseModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={courses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              renderDropdownItem(item, setSelectedCourse, setSelectedCourseName, setCourseModalVisible)
            }
          />
        </View>
      </Modal>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  dropdownItem: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default AddCoursesStudent;
