import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Platform, Alert } from "react-native";
import SplashScreen from "./Screens/SplashScreen";
import HomeScreen from "./Screens/homeScreen";
import SignUp from "./Screens/signUps";
import Login from "./Screens/login";
import Contact from "./Screens/contactUs";
import Calculator from "./Screens/calculator";
import MultiStepForm from "./Screens/form";
import AvailableServices from "./Screens/OurServices";
import CustomerDashboard from "./Screens/customerDashboard/index";
import AdminDashboard from "./Screens/adminDashboard/index";
import Chat from "./Screens/adminDashboard/chat";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "./Screens/Style/style";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#43a8fb",
  },
};

// Drawer Navigator
const Drawer = createDrawerNavigator();

// Function to clear AsyncStorage
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage successfully cleared");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

// Logout handler
const handleLogout = async (navigation) => {
  try {
    await clearAsyncStorage();
    navigation.replace("Login");
  } catch (error) {
    console.error("Error logging out:", error);
    Alert.alert(
      "Error",
      "An error occurred while logging out. Please try again."
    );
  }
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
        },

        headerTitle: () => (
          <Image
            source={require("./img/Virsme.png")}
            style={{
              width: 180,
              height: 50,
              resizeMode: "contain",
              marginLeft: Platform.OS === "ios" ? 40 : 0,
            }}
          />
        ),
      }}
    >
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false, // Hide the header for the Login screen
        }}
      />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Sign Up" component={SignUp}
         options={{
          headerShown: false,
      }}/>
      <Drawer.Screen name="Services" component={AvailableServices} />
      <Drawer.Screen name="Contact Us" component={Contact} />
      <Drawer.Screen name="Calculator" component={Calculator} />
      <Drawer.Screen name="Multi-Step Form" component={MultiStepForm} />
      <Drawer.Screen name="Customer Dashboard" component={CustomerDashboard} />
      <Drawer.Screen name="Admin Dashboard" component={AdminDashboard} />
      <Drawer.Screen name="Chat" component={Chat} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
