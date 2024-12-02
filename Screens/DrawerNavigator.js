import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./homeScreen";
import AvailableServices from "./OurServices";
import Contact from "./contactUs";
import Calculator from "./calculator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Services" component={AvailableServices} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="Calculator" component={Calculator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
