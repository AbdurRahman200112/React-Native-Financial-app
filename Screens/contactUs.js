import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

export default function ContactUs() {
  const [groupTitle, setGroupTitle] = useState("");
  const [groupMembers, setGroupMembers] = useState("");
  const [advisors, setAdvisors] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [open, setOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    // Fetch advisors for dropdown
    axios
      .get("http://192.168.1.78:8080/api/advisors") // Replace with your IP
      .then((response) => {
        const formattedAdvisors = response.data.map((advisor) => ({
          label: advisor.advisor_name,
          value: advisor.advisor_id,
        }));
        setAdvisors(formattedAdvisors);
      })
      .catch((error) => Alert.alert("Error", "Failed to load advisors."));
  }, []);

  const handleSave = () => {
    if (!groupTitle || !groupMembers || !selectedAdvisor) {
      return Alert.alert("Error", "All fields are required.");
    }

    const data = {
      group_title: groupTitle,
      group_members: groupMembers,
      advisor_id: selectedAdvisor,
    };

    axios
      .post("http://192.168.1.78:8080/api/registerGroup", data) // Replace with your IP
      .then((response) => {
        Alert.alert("Success", response.data.message);
        setGroupTitle("");
        setGroupMembers("");
        setSelectedAdvisor(null);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to register group.");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Final Project Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Group Title"
        value={groupTitle}
        onChangeText={setGroupTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Group Members Name and IDs"
        value={groupMembers}
        onChangeText={setGroupMembers}
        multiline
        numberOfLines={6}
      />

      {/* Dropdown Picker */}
      <DropDownPicker
        open={open}
        value={selectedAdvisor}
        items={advisors}
        setOpen={setOpen}
        setValue={setSelectedAdvisor}
        setItems={setAdvisors}
        placeholder="Select Your Advisor"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#473f97",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#473f97",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
