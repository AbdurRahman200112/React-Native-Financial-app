import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faChartPie,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import CustomTabs from "./components/customTabs";
import { LinearGradient } from 'expo-linear-gradient';

const AdminDashboard = ({ navigation, route }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedSubscriptionDetail, setSelectedSubscriptionDetail] =
    useState(null);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.2.78:8080/subscriptions"
      );
      setSubscriptions(response.data);
    } catch (error) {
      console.error("There was a problem fetching subscription data:", error);
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await axios.delete(`http://192.168.2.78:8080/subscriptions/${id}`);
      const updatedSubscriptions = subscriptions.filter(
        (subscription) => subscription.id !== id
      );
      setSubscriptions(updatedSubscriptions);
    } catch (error) {
      console.error("There was a problem deleting the subscription:", error);
    }
  };

  const fetchSubscriptionDetail = async (id) => {
    try {
      const response = await axios.get(
        `http://192.168.0.78:8080/subscription_form/${id}`
      );
      setSelectedSubscriptionDetail(response.data);
    } catch (error) {
      console.error("Error fetching subscription details:", error);
    }
  };

  const totalPages = Math.ceil(subscriptions.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage === totalPages ? currentPage : currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const slicedSubscriptions = subscriptions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
              style={{flex:1}}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => navigation.navigate("Users")}
          >
            <FontAwesomeIcon size={37} icon={faUser} style={styles.icon} />
            <Text style={styles.statText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => navigation.navigate("Reports")}
          >
            <FontAwesomeIcon
              size={37}
              icon={faChartPie}
              style={styles.icon}
            />
            <Text style={styles.statText}>0</Text>
          </TouchableOpacity>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.headerCell}>
              Category
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              Business Name
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              Actions
            </DataTable.Title>
          </DataTable.Header>
          {slicedSubscriptions.map((subscription, index) => (
            <DataTable.Row
              key={subscription.id}
              style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <DataTable.Cell style={styles.dataCell}>
                {subscription.business_category}
              </DataTable.Cell>
              <DataTable.Cell style={styles.dataCell}>
                {subscription.business_name}
              </DataTable.Cell>
              <DataTable.Cell style={styles.dataCell}>
                <TouchableOpacity
                  onPress={() => fetchSubscriptionDetail(subscription.id)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteSubscription(subscription.id)}
                  style={[styles.actionButton, styles.deleteButton]}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={handlePrevPage}
            disabled={currentPage === 1}
            style={styles.arrowButton}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </TouchableOpacity>
          <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
          <TouchableOpacity
            onPress={handleNextPage}
            disabled={currentPage === totalPages}
            style={styles.arrowButton}
          >
            <FontAwesomeIcon icon={faArrowRight} size={20} />
          </TouchableOpacity>
        </View>
        {selectedSubscriptionDetail && (
          <View style={styles.subscriptionDetails}>
            <Text style={styles.detailText}>
              {selectedSubscriptionDetail.business_size},{"\n"}
              {selectedSubscriptionDetail.business_name},{"\n"}
              {selectedSubscriptionDetail.firstname}{" "}
              {selectedSubscriptionDetail.lastname},{"\n"}
              {selectedSubscriptionDetail.email},{"\n"}
              {selectedSubscriptionDetail.phone_no},{"\n"}
              {selectedSubscriptionDetail.updated_date}
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={{flex:1}}>
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  statItem: {
    width: "45%",
    height: 120,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "#0b7ffe",
    marginRight: 10,
  },
  statText: {
    marginTop: 6,
    fontSize: 35,
    fontWeight: "bold",
    color: "#0b7ffe",
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
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  actionButton: {
    backgroundColor: "#0b7ffe",
    padding: 7,
    borderRadius: 10,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5E5E",
  },
  actionText: {
    color: "white",
    textAlign: "center",
  },
  subscriptionDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  detailText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default AdminDashboard;
