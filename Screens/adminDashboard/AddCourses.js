import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import axios from "axios";

const AddCourse = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [credit, setCredit] = useState("");

  // Fetch teachers from the server
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://192.168.1.215:8080/ShowTeachers");
        setTeachers(response.data.teachers); // Assumes the response has a "teachers" array
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  // Handle teacher selection
  const handleTeacherSelect = (teacherId, teacherName) => {
    setSelectedTeacherId(teacherId); // Automatically populate the Teacher ID field
    setSelectedTeacherName(teacherName);
    setModalVisible(false); // Close the modal after selection
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!courseCode || !courseName || !selectedTeacherId) {
      setError("All fields are required");
      return;
    }

    const courseData = {
      course_code: courseCode,
      course_name: courseName,
      teacher_id: selectedTeacherId,
      credit: credit
    };

    axios
      .post("http://192.168.1.215:8080/courses/add", courseData)
      .then((response) => {
        console.log("Course added successfully:", response.data);
        setCourseCode("");
        setCourseName("");
        setSelectedTeacherId("");
        setSelectedTeacherName("");
        setError("");
      })
      .catch((err) => {
        console.error("Error adding course:", err);
        setError("Error adding course");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Course</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Course Code Field */}
      <TextInput
        style={styles.input}
        placeholder="Course Code"
        value={courseCode}
        onChangeText={setCourseCode}
      />

      {/* Course Name Field */}
      <TextInput
        style={styles.input}
        placeholder="Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />

      {/* Teacher Dropdown */}
      <Text style={styles.label}>Select Teacher:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.inputText}>
          {selectedTeacherName || "Select a teacher"}
        </Text>
      </TouchableOpacity>

      {/* Teacher ID Field (Read-only) */}
      <TextInput
        style={styles.input}
        placeholder="Teacher ID"
        value={selectedTeacherId.toString()}
        editable={false} // Automatically updated when teacher is selected
      />
      <TextInput
        style={styles.input}
        placeholder="Credit"
        value={credit}
        onChangeText={setCredit}

      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>

      {/* Modal for teacher selection */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={teachers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleTeacherSelect(item.id, item.name)}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: "center",
  },
  inputText: {
    color: "black",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalItemText: {
    fontSize: 16,
    color: "black",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#473f97",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default AddCourse;
