import React, { useState, useEffect } from 'react';
import {FLatList, View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { DataTable } from 'react-native-paper'; // Import DataTable from react-native-paper
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import CustomTabs from './customTabs'

const AdminDashboard = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedSubscriptionDetail, setSelectedSubscriptionDetail] = useState(null);


  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await axios.get('http://192.168.0.204:8080/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('There was a problem fetching subscription data:', error);
    }
  };
  const deleteSubscription = async (id) => {
    try {
      await axios.delete(`http://192.168.0.204:8080/subscriptions/${id}`);
      const updatedSubscriptions = subscriptions.filter(subscription => subscription.id !== id);
      setSubscriptions(updatedSubscriptions);
    } catch (error) {
      console.error('There was a problem deleting the subscription:', error);
    }
    }
  const fetchSubscriptionDetail = async (id) => {
    try {
      const response = await axios.get(`http://192.168.0.204:8080/subscription_form/${id}`);
      setSelectedSubscriptionDetail(response.data); // Set the fetched details into the state
    } catch (error) {
      console.error('Error fetching subscription details:', error);
      Alert.alert('Error', 'Failed to fetch subscription details. Please try again later.');
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
  const slicedSubscriptions = subscriptions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row' }}>
          <View style={{ width: '45%', height: 120, justifyContent: 'center', backgroundColor: 'white', marginRight: 10, padding: 16, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 75, borderRadius: 400, width: '50%', backgroundColor: '#c5e6f5', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon size={37} icon={faUser} style={{ color: '#0b7ffe' }} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ marginTop: 6, fontSize: 35, fontWeight: 'bold', marginLeft: 12, color: '#0b7ffe' }}>0</Text>
              </View>
            </View>
          </View>
          <View style={{ width: '45%', height: 120, justifyContent: 'center', backgroundColor: 'white', padding: 16, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 75, borderRadius: 400, width: '50%', backgroundColor: '#c5e6f5', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon size={37} icon={faChartPie} style={{ color: '#0b7ffe' }} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ marginTop: 6, fontSize: 35, fontWeight: 'bold', marginLeft: 12, color: '#0b7ffe' }}>0</Text>
              </View>
            </View>
          </View>
        </View>
        <DataTable className="mt-10">
          <DataTable.Header style={styles.headerTable}>
            <DataTable.Title style={styles.title}>Category</DataTable.Title>
            <DataTable.Title style={styles.title}>Business Name</DataTable.Title>
            <DataTable.Title  style={styles.title}>Actions</DataTable.Title>
          </DataTable.Header>
          {slicedSubscriptions.map((subscription, index) => (
            <DataTable.Row key={subscription.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <DataTable.Cell style={styles.dataCell}>{subscription.business_category}</DataTable.Cell>
              <DataTable.Cell style={styles.dataCell}>{subscription.business_name}</DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => fetchSubscriptionDetail(subscription.id)} style={{backgroundColor:'#0b7ffe',padding:7,borderRadius:10}}>
                  <Text style={{color:'white'}}>Details</Text>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>
              <TouchableOpacity onPress={() => deleteSubscription(subscription.id)} style={{backgroundColor:'#FF5E5E',padding:7,borderRadius:10}}><Text style={{color:'white'}}>Delete</Text></TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <View style={styles.pagination} className="mt-5">
          <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 1} style={[styles.button, { backgroundColor: 'white' }] } className="p-2 rounded-3xl mr-2">
            <FontAwesomeIcon icon={faArrowLeft} size={14} color="black" />
          </TouchableOpacity>
          <Text className="mr-2">{`Page ${currentPage} of ${totalPages}`}</Text>
          <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages} style={[styles.button, { backgroundColor: 'white' }]} className="p-2 rounded-3xl mr-2">
            <FontAwesomeIcon icon={faArrowRight} size={14} color="#0b7ffe" />
          </TouchableOpacity>
        </View>
           {selectedSubscriptionDetail && (
             <View className="flex-1 justify-center items-center mt-5 mb-20">
               <Text className="text-base ml-2">{selectedSubscriptionDetail.business_size},{'\n'}{selectedSubscriptionDetail.business_name},{'\n'}{selectedSubscriptionDetail.firstname} {selectedSubscriptionDetail.lastname},{'\n'}
                {selectedSubscriptionDetail.email},{'\n'}{selectedSubscriptionDetail.phone_no},{'\n'}{selectedSubscriptionDetail.updated_date}</Text>
                  </View>
             )}
      </ScrollView>
      <CustomTabs navigation={navigation}/>
     </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    height: 200
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#EDF3FF'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerCell: {
    flex: 2,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dataCell: {
    flex: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 6,
    textAlign: 'center',
  },
  oddRow: {
    backgroundColor: '#EDF3FF',
  },
  evenRow: {
    backgroundColor: '#ffff',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 10
  },
  headerTable:{
    backgroundColor:'#EDF3FF',
  },
  headerCol:{
    fontSize:25,
    color:'black'
  }
});

export default AdminDashboard;
