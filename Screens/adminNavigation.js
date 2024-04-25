import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome, Octicons, Feather } from '@expo/vector-icons';
import HomeScreen from './homeScreen';
import SignUp from './signUps';
import Contact from './contactUs';
import AvailableServices from './OurServices';
import MultiStepForm from './form';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 60, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            key={index}>
            {label === 'HOME' && <Octicons name="home" size={24} color={isFocused ? '#0b7ffe' : '#111'} />}
            {label === 'SIGNUP' && <Feather name="user" size={24} color={isFocused ? '#0b7ffe' : '#111'} />}
            {label === 'SUBSCRIPTION FORM' && <MaterialIcons name="add" size={28} color="white" style={{ backgroundColor: '#0b7ffe', borderRadius: 15, padding: 5 }} />}
            {label === 'SERVICES' && <MaterialIcons name="miscellaneous-services" size={24} color={isFocused ? '#0b7ffe' : '#111'} />}
            {label === 'Contact' && <FontAwesome name="phone" size={24} color={isFocused ? '#0b7ffe' : '#111'} />}
            <Text style={{ fontSize: 12, color: isFocused ? '#0b7ffe' : '#666', marginTop: 2 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const AdminNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} tabBarOptions={{ showLabel: false }}>
      <Tab.Screen name="HOME" component={HomeScreen} />
      <Tab.Screen name="SIGNUP" component={SignUp} />
      <Tab.Screen name="SUBSCRIPTION FORM" component={MultiStepForm} />
      <Tab.Screen name="SERVICES" component={AvailableServices} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

export default AdminNavigation;
