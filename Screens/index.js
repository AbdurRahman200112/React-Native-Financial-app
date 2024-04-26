import React, { useState, useEffect } from 'react';
import {FLatList, View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper'; // Import DataTable from react-native-paper
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CustomTabBar from './adminNavigation';
import { NavigationContainer } from '@react-navigation/native';


const AdminDashboard = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await axios.get('http://192.168.0.79:8080/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('There was a problem fetching subscription data:', error);
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

  fetchDataById = (id) => {
    fetch(`http://192.168.0.79:8080/api/data/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(error => console.error(error));
  };
  return (
    <View style={styles.container}>
      <ScrollView className="container">
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row' }}>
          <View style={{ width: '45%', height: 120, justifyContent: 'center', backgroundColor: 'white', marginRight: 10, padding: 16, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 75, borderRadius: 400, width: '50%', backgroundColor: '#c5e6f5', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon size={37} icon={faUser} style={{ color: '#0b7ffe' }} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ marginTop: 6, fontSize: 24, fontWeight: 'bold', marginLeft: 12, color: '#0b7ffe' }}>0</Text>
              </View>
            </View>
          </View>
          <View style={{ width: '45%', height: 120, justifyContent: 'center', backgroundColor: 'white', padding: 16, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 75, borderRadius: 400, width: '50%', backgroundColor: '#c5e6f5', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon size={37} icon={faChartPie} style={{ color: '#0b7ffe' }} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ marginTop: 6, fontSize: 24, fontWeight: 'bold', marginLeft: 12, color: '#0b7ffe' }}>0</Text>
              </View>
            </View>
          </View>
        </View>
        <DataTable className="mt-10">
          <DataTable.Header style={styles.headerTable}>
            <DataTable.Title style={styles.title}>Business Name</DataTable.Title>
            <DataTable.Title style={styles.title}>Size</DataTable.Title>
            <DataTable.Title style={styles.title}>Category</DataTable.Title>
            <DataTable.Title style={styles.title} className="ml-10">Details</DataTable.Title>
            <DataTable.Title style={styles.title}>Actions</DataTable.Title>
          </DataTable.Header>
          {slicedSubscriptions.map((subscription, index) => (
            <DataTable.Row key={subscription.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <DataTable.Cell>{subscription.business_name}</DataTable.Cell>
              <DataTable.Cell>{subscription.business_size}</DataTable.Cell>
              <DataTable.Cell>{subscription.business_category}</DataTable.Cell>
              <DataTable.Cell>
              <TouchableOpacity onPress={() =>this.fetchDataById(subscription.id)} className="ml-3" style={{backgroundColor:'#0b7ffe',padding:7,borderRadius:10}}><Text style={{color:'white'}}>Details</Text></TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>
              <TouchableOpacity style={{backgroundColor:'#FF5E5E',padding:7,borderRadius:10}}><Text style={{color:'white'}}>Delete</Text></TouchableOpacity>
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
       </ScrollView>
     </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
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
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dataCell: {
    flex: 1,
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
