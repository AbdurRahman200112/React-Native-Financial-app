import React, { useState, useEffect } from 'react';
import { View, Text, Image, Platform,TouchableOpacity } from 'react-native';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/homeScreen';
import SignUp from './Screens/signUps';
import Login from './Screens/login';
import LoginButton from './Screens/loginButton';
import Contact from './Screens/contactUs';
import CalculatorScreen from './Screens/calculator';
import AvailableServices from './Screens/OurServices';
import MultiStepForm from './Screens/form';
import Calculator from './Screens/calculator';
import Chat from './Screens/adminDashboard/chat';
import AdminDashboard from './Screens/adminDashboard/index';
import CustomTabs from './Screens/adminDashboard/components/customTabs';
import ChatDetailScreen from './Screens/adminDashboard/chatDetailScreen';
import ContactFormData from './Screens/adminDashboard/contactFormData';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme , useRoute} from '@react-navigation/native';
import { MaterialIcons, FontAwesome, Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
const UserTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Octicons name="home" size={26} color={focused ? "#0b7ffe" : "#111"} />
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
              <Feather name="user" size={26} color={focused ? "#0b7ffe" : "#111"} />
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
              <Ionicons name="briefcase-outline" size={26} color={focused ? "#0b7ffe" : "#111"} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="CONTACT"
        component={Contact}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="call-outline" size={26} color={focused ? "#0b7ffe" : "#111"} />
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
           headerLeft: () => (
            <TouchableOpacity className="ml-4" onPress={() => navigation.navigate('HOME')}>
             <FontAwesome name="angle-left" size={28} color="#0b7ffe" />
            </TouchableOpacity>
           ),
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
          headerLeft: () => (
             <TouchableOpacity onPress={() => navigation.navigate('HOME')}>
               <FontAwesome name="angle-left" size={24} color="#0b7ffe" style={{ marginLeft: 10 }} />
             </TouchableOpacity>
          ),
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
        <Stack.Screen name="CustomTabs" component={CustomTabs} />
        <Stack.Screen
          name="WELCOMEPAGE"
          component={WelcomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => null,
            header: () => null,
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
          name="CONTACT FORM DATA"
          component={ContactFormData}
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
          name="CHAT"
          component={Chat}
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
           name="ChatDetailScreen"
           component={ChatDetailScreen}
           options={({ route, navigation }) => ({
             headerLeft: () => (
               <TouchableOpacity onPress={() => navigation.goBack()}>
                 <FontAwesome name="angle-left" size={24} color="#0b7ffe" style={{ marginLeft: 10 }} />
               </TouchableOpacity>
             ),
             headerTitle: () => (
               <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                 <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{route.params.email_address}</Text>
               </View>
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