import React, { useState, useEffect } from 'react';
import { View, Text, Image, Platform,TouchableOpacity } from 'react-native';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/homeScreen';
import SignUp from './Screens/signUps';
import Login from './Screens/login';
import AdminDashboard from './Screens/index';
import LoginButton from './Screens/loginButton';
import Contact from './Screens/contactUs';
import CalculatorScreen from './Screens/calculator';
import AvailableServices from './Screens/OurServices';
import MultiStepForm from './Screens/form';
import Calculator from './Screens/calculator';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { MaterialIcons, FontAwesome, Octicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './Screens/Style/style';
import WelcomeScreen from './Screens/welcome';
import { Alert } from 'react-native';

const MyTheme = {
  colors: {
    ...DefaultTheme.colors,
    primary: '#43a8fb',
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage successfully cleared');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};
const handleLogout = async (navigation) => {
  try {
    await clearAsyncStorage();
    navigation.replace('LOGIN');
  } catch (error) {
    console.error('Error logging out:', error);
    Alert.alert('Error', 'An error occurred while logging out. Please try again.');
  }
};

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
};
const MainScreen = ({ route }) => {
  const isAdminRoute = route.name === 'ADMIN DASHBOARD';

  if (isAdminRoute) {
    return <AdminTabNavigator />;
  } else {
    return <UserTabNavigator />;
  }
};

const UserTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Octicons name="home" size={24} color={focused ? "#0b7ffe" : "#111"} />
              <Text style={{ fontSize: 12, color: "#000" }}>HOME</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LOGIN"
        component={Login}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Feather name="user" size={24} color={focused ? "#0b7ffe" : "#111"} />
              <Text style={{ fontSize: 12, color: "#000" }}>LOGIN</Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="SUBSCRIPTION FORM"
        component={MultiStepForm}
        options={{
          tabBarIcon: ({ focused }) => (
           <View
             style={{
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: "#0b7ffe",
               width: Platform.OS == "ios" ? 50 : 60,
               height: Platform.OS == "ios" ? 50 : 60,
               top: Platform.OS == "ios" ? -10 : -20,
               borderRadius: Platform.OS == "ios" ? 25 : 30
              }}
            >
              <MaterialIcons name="add" size={28} color="white" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SERVICES"
        component={AvailableServices}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="miscellaneous-services" size={24} color={focused ? "#0b7ffe" : "#111"} />
              <Text style={{ fontSize: 12, color: "#000" }}>SERVICES</Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Contact}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome name="phone" size={24} color={focused ? "#0b7ffe" : "#111"} />
              <Text style={{ fontSize: 12, color: "#000" }}>CONTACT</Text>
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="ADMIN DASHBOARD"
        component={AdminDashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="dashboard" size={24} color={focused ? "#0b7ffe" : "#111"} />
              <Text style={{ fontSize: 12, color: "#000" }}>DASHBOARD</Text>
            </View>
          ),
        }}
      />
     <Tab.Screen
       name="Settings"
       component={Contact}
       options={{
         tabBarIcon: ({ focused }) => (
           <View style={{ alignItems: "center", justifyContent: "center" }}>
             <FontAwesome name="phone" size={24} color={focused ? "#0b7ffe" : "#111"} />
             <Text style={{ fontSize: 12, color: "#000" }}>CONTACT</Text>
           </View>
          )
         }}
       />
    </Tab.Navigator>
  );
};
const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSplashVisible(false);
    };
    fetchData();
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        {isSplashVisible ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        ) : (
        <Stack.Screen
         name="Main"
         component={UserTabNavigator}
         options={({ navigation }) => ({
          headerRight: () => (
            <LoginButton />
          ),
          headerTitle: () => (
           <Image
            source={require('./img/logo2.png')}
            style={{ width: 200, height: 200, resizeMode: 'contain', marginLeft: Platform.OS === 'ios' ? 40 : 0 }}
           />
          ),
          headerStyle: {
           backgroundColor: '#fff',
         },
        })}
       />
        )}
       <Stack.Screen
         name="LOGIN"
         component={Login}
          options={({ navigation }) => ({
//           headerLeft: () => (
//            <TouchableOpacity className="ml-4" onPress={() => navigation.navigate('HOME')}>
//             <FontAwesome name="angle-left" size={28} color="#0b7ffe" />
//            </TouchableOpacity>
//           ),
           headerRight: () => (
            <LoginButton />
           ),
           headerTitle: () => (
            <Image
             source={require('./img/logo2.png')}
             style={{ width: 200, height: 200, resizeMode: 'contain', marginLeft: Platform.OS === 'ios' ? 40 : 0 }}
            />
            ),
            headerStyle: {
             backgroundColor: '#fff',
            },
         })}
       />
        <Stack.Screen
          name="SIGNUP"
          component={SignUp}
          options={({ navigation }) => ({
//          headerLeft: () => (
//            route.name !== 'Home' && (
//             <TouchableOpacity onPress={() => navigation.navigate('HOME')}>
//               <FontAwesome name="angle-left" size={24} color="#0b7ffe" style={{ marginLeft: 10 }} />
//             </TouchableOpacity>
//           )
//          ),
          headerRight: () => (
              <LoginButton />
            ),
            headerTitle: () => (
              <Image
                source={require('./img/logo2.png')}
                style={{ width: 200, height: 200, resizeMode: 'contain', marginLeft: Platform.OS === 'ios' ? 40 : 0 }}
              />
            ),
            headerStyle: {
              backgroundColor: '#fff',
            },
          })}
        />
        <Stack.Screen
          name="WELCOMEPAGE"
          component={WelcomeScreen}
          options={({ navigation }) => ({
//          headerRight: () => (
//           <TouchableOpacity
//              onPress={() => handleLogout(navigation)}
//              className="px-5" style={style.headerBtnStyle}>
//              <Text className="text-white font-bold">Logout</Text>
//           </TouchableOpacity>
//            ),
            headerTitle: () => (
              <Image
                source={require('./img/logo2.png')}
                style={{ width: 200, height: 200, resizeMode: 'contain', marginLeft: Platform.OS === 'ios' ? 40 : 0 }}
              />
            ),
            headerStyle: {
              backgroundColor: '#fff',
            },
          })}
        />
         <Stack.Screen
          name="ADMIN DASHBOARD"
          component={AdminDashboard}
          options={({ navigation }) => ({
            headerRight: () => (
             <TouchableOpacity
                onPress={() => handleLogout(navigation)}
                className="px-5" style={style.headerBtnStyle}>
                <Text className="text-white font-bold">Logout</Text>
             </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image
                source={require('./img/logo2.png')}
                style={{ width: 200, height: 200, resizeMode: 'contain', marginLeft: Platform.OS === 'ios' ? 40 : 0 }}
              />
            ),
            headerStyle: {
              backgroundColor: '#fff',
            },
          })}
        />
        <Stack.Screen
          name="CALCULATOR"
          component={Calculator}
          options={({ navigation }) => ({
//            headerRight: () => (
//             <TouchableOpacity
//                onPress={() => handleLogout(navigation)}
//                className="px-5" style={style.headerBtnStyle}>
//                <Text className="text-white font-bold">Logout</Text>
//             </TouchableOpacity>
//            ),
            headerTitle: () => (
              <Image
                source={require('./img/logo2.png')}
                style={{ width: 200, height: 200, resizeMode: 'contain', marginLeft: Platform.OS === 'ios' ? 40 : 0 }}
              />
            ),
            headerStyle: {
              backgroundColor: '#fff',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
