import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './Style/style';
import axios from 'axios'; // Import axios

const LockedPriceScreen = ({ route, navigation }) => {
  const { lockedPricesText } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);
    };
    checkAuthentication();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.2.78:8080/customer/login", {
        email_address: customerEmail,
        password: customerPassword,
      });

      if (response.status === 200) {
        const userData = response.data;
        setIsLoggedIn(true);
      } else {
        console.error("Login failed. Invalid credentials.");
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        if (error.response.status === 401) {
          alert("Unauthorized. Please check your email and password.");
        } else {
          alert("An error occurred while logging in. Please try again.");
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("No response from the server. Please check your network.");
      } else {
        console.error("Error message:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post("http://192.168.2.78:8080/LockedPrices/message", {
        email_address: customerEmail,
        message: lockedPricesText, // Include the lockedPricesText as the message
      });
      setNewMessage("");
      navigation.navigate('CUSTOMER DASHBOARD', { user_email: customerEmail} );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!isLoggedIn) {
    return (
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            placeholder="Enter Your Email"
            placeholderTextColor="black"
            value={customerEmail}
            className="p-3 rounded-lg w-80"
            style={{ borderWidth: 1 }}
            onChangeText={setCustomerEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter Your Password"
              placeholderTextColor="black"
              value={customerPassword}
              className="p-3 mt-3 rounded-lg w-80"
              style={{ borderWidth: 1 }}
              onChangeText={setCustomerPassword}
            />
            <View>
              <TouchableOpacity onPress={handleLogin} className="mt-2 p-3 rounded-xl" style={{ backgroundColor: "#0b7ffe" }} >
                <Text className="text-center text-white text-base">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <View className="items-center h-full justify-center flex-1">
            <View className="bg-white mt-10 rounded-xl w-11/12 p-5">
              <Text className="text-xl mb-2">
                Billing Details
              </Text>
              <TextInput
                value={lockedPricesText}
                multiline
                editable={false}
                className="border-solid text-base p-4 text-black mb-3 rounded-lg mt-2"
                style={{ borderWidth: 1 }}
              />
              <View>
                <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: "#0b7ffe" }} className="p-3 rounded-xl">
                  <Text className="text-white text-center text-base">Go to Chat Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LockedPriceScreen;
