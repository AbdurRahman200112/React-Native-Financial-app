import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = ({ label, icon, isActive, onPress }) => (
  <TouchableOpacity style={[styles.tab, isActive && styles.activeTab]} onPress={onPress}>
    <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>{label}</Text>
    {icon}
  </TouchableOpacity>
);

const CustomTabs = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  return (
    <View style={styles.container}>
            <LinearGradient
                colors={[
                  'rgba(213, 234, 253, 0.8)',
                  'rgba(213, 234, 253, 0.8)',
                  'rgba(213, 234, 253, 0.3)',
                  'rgba(213, 234, 253, 0.8)',
                  'rgba(213, 234, 253, 0.8)',

          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
        <View style={styles.tabBar}>
        <Tab
          icon={<Octicons name="home" size={24} color="#0b7ffe" />}
          onPress={() => navigation.navigate('ADMIN DASHBOARD')}
          isActive={activeTab === 'ADMIN DASHBOARD'}
          label="Home"
        />
        <Tab
          label="Chat"
          icon={<MaterialIcons name="chat-bubble-outline" size={24} color="#0b7ffe" />}
          onPress={() => navigation.navigate('CHAT')}
          isActive={activeTab === 'CHAT'}
        />
        <Tab
          label="Contact"
          icon={<MaterialCommunityIcons name="contacts-outline" size={24} color="#0b7ffe" />}
          onPress={() => navigation.navigate('CONTACT FORM DATA')}
          isActive={activeTab === 'CONTACT FORM DATA'}
        />
      </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 11,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabLabel: {
    fontSize: 16,
    color: '#333',
  },
  activeLabel: {
    color: 'blue',
  },
});
export default CustomTabs;
