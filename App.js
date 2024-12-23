import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Platform, Alert } from "react-native";
import SplashScreen from "./Screens/SplashScreen";
import HomeScreen from "./Screens/homeScreen";
import SignUp from "./Screens/signUps";
import Login from "./Screens/login";
import Contact from "./Screens/contactUs";
import Calculator from "./Screens/calculator";
import MultiStepForm from "./Screens/form";
import AcademicDeadlines from "./Screens/AcadmicDeadline";
import AvailableServices from "./Screens/OurServices";
import CustomerDashboard from "./Screens/customerDashboard/index";
import AdminDashboard from "./Screens/adminDashboard/index";
import CreateTeacherForm from "./Screens/adminDashboard/AddTeacher";
import AddCourse from "./Screens/adminDashboard/AddCourses";
import AddStudent from "./Screens/adminDashboard/AddStudent";
import AddCoursesStudent from "./Screens/adminDashboard/AddCoursesStudent";
import Chat from "./Screens/adminDashboard/chat";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "./Screens/Style/style";
import ProjectGroups from './Screens/RegisteredGroups';
import CourseTeacherSelector from './Screens/CourseRegistration';
import MyCourses from './Screens/MyCourses';

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
         <Text className="text-xl font-bold" >Admin</Text>
        ),
      }}
    >
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" }, // Hide from drawer

        }}
      />
      <Drawer.Screen name="General Information" component={HomeScreen} />
      <Drawer.Screen name="Sign Up" component={SignUp}
         options={{
          headerShown: false,
         drawerItemStyle: { display: "none" }, // Hide from drawer
      }}/>
      <Drawer.Screen name="My Courses" component={MyCourses} />
      <Drawer.Screen name="My Time Table" component={CustomerDashboard} />
      <Drawer.Screen name="My Attendance" component={Calculator} />
      <Drawer.Screen name="Academic Deadline" component={AcademicDeadlines} />
      <Drawer.Screen name="My Transcripts" component={AvailableServices} />
      <Drawer.Screen name="FYP Registration" component={Contact} />
      <Drawer.Screen name="My Program Courses" component={MultiStepForm} />
      <Drawer.Screen name="Fee Challan" component={AdminDashboard} />
      <Drawer.Screen name="Acadmic Calender" component={Chat} />
      <Drawer.Screen name="Registered Groups" component={ProjectGroups} />
      <Drawer.Screen name="Registered Course" component={CourseTeacherSelector} />

      <Drawer.Screen name="Add Teacher" component={CreateTeacherForm}  options={{
        drawerItemStyle: { display: "none" }, // Hide from drawer
      }}/>
      <Drawer.Screen name="Add Student" component={AddStudent} options={{
        drawerItemStyle: { display: "none" }, // Hide from drawer
      }}/>
      <Drawer.Screen name="Add Courses" component={AddCourse} options={{
        drawerItemStyle: { display: "none" }, // Hide from drawer
      }}/>
     <Drawer.Screen name="Add Courses to Student" component={AddCoursesStudent} options={{
        drawerItemStyle: { display: "none" }, // Hide from drawer
     }}/>

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
