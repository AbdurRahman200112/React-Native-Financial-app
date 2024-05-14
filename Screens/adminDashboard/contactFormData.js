import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CustomTabs from "./components/customTabs";
import { LinearGradient } from 'expo-linear-gradient';

const ContactFormData = ({ navigation, route }) => {
  const [contactForm, setContactForm] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchContactFormData();
  }, []);

  const fetchContactFormData = async () => {
    try {
      const response = await axios.get("http://192.168.2.78:8080/contactForm");
      setContactForm(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("The requested resource was not found.");
      } else {
        console.error("There was a problem fetching contact form data:", error);
      }
    }
  };
  const totalPages = Math.ceil(contactForm.length / itemsPerPage);
  const handleNextPage = () => {
    setCurrentPage(currentPage === totalPages ? currentPage : currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const slicedSubscriptions = contactForm.slice(startIndex, startIndex + itemsPerPage);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(213, 234, 253, 0.8)',
          'rgba(213, 234, 253, 0.8)',
          'rgba(213, 234, 253, 0.3)',
          'rgba(245, 186, 207, 0.1)',
          'rgba(243, 168, 195, 0.1)',
          'rgba(240, 148, 182, 0.1)',
          'rgba(213, 234, 253, 0.8)',
          'rgba(213, 234, 253, 0.8)',
          'rgba(252, 247, 232, 1)'
        ]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.headerCell}>Full Name</DataTable.Title>
              <DataTable.Title style={styles.headerCell}>Email Address</DataTable.Title>
              <DataTable.Title style={styles.headerCell}>Message</DataTable.Title>
            </DataTable.Header>
            {slicedSubscriptions.map((contactForm, index) => (
              <DataTable.Row
                key={contactForm.id}
                style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <DataTable.Cell style={styles.dataCell}>{contactForm.full_name}</DataTable.Cell>
                <DataTable.Cell style={styles.dataCell}>{contactForm.email_address}</DataTable.Cell>
                <DataTable.Cell style={styles.dataCell}>{contactForm.message}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={handlePrevPage}
              disabled={currentPage === 1}
              style={styles.arrowButton}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={15} />
            </TouchableOpacity>
            <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
            <TouchableOpacity
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
              style={styles.arrowButton}
            >
              <FontAwesomeIcon icon={faArrowRight} size={15} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ flex: 1 }}>
          <CustomTabs navigation={navigation} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCell: {
    flex: 2,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  dataCell: {
    flex: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 6,
    textAlign: "center",
  },
  oddRow: {
    backgroundColor: "#EDF3FF",
  },
  evenRow: {
    backgroundColor: "#ffff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  arrowButton: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default ContactFormData;
