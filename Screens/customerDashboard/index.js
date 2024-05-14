import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const Chat = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const user_email = route.params.user_email;
      const response = await axios.get(
        `http://192.168.2.78:8080/Detail/${user_email}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(error.message);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
  };

  const markAsRead = (email) => {
    const updatedMessages = messages.map((message) => {
      if (message.email_address === email) {
        return { ...message, unread: false };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  return (
    <View style={{ flex: 1 }}>
      <View className="h-full" style={{ backgroundColor: "white" }}>
        <LinearGradient
          colors={[
            "rgba(213, 234, 253, 0.8)",
            "rgba(213, 234, 253, 0.8)",
            "rgba(213, 234, 253, 0.3)",
            "rgba(245, 186, 207, 0.1)",
            "rgba(243, 168, 195, 0.1)",
            "rgba(240, 148, 182, 0.1)",
            "rgba(213, 234, 253, 0.8)",
            "rgba(213, 234, 253, 0.8)",
            "rgba(252, 247, 232, 1)",
          ]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {messages
            .reduce((acc, message, index) => {
              const existingMessageIndex = acc.findIndex(
                (m) => m.email_address === message.email_address
              );
              if (existingMessageIndex !== -1) {
                acc[existingMessageIndex] = message;
              } else {
                acc.push(message);
              }
              return acc;
            }, [])
            .map((message, index) => (
              <TouchableOpacity
                key={message.email_address}
                onPress={() => {
                  navigation.navigate("CUSTOMERCHATDETAIL", {
                    user_email: route.params.user_email,
                  });
                  markAsRead(message.email_address);
                }}
              >
                <View
                  style={[
                    styles.messageContainer,
                    index !== messages.length - 1 && styles.borderBottom,
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Admin
                    </Text>
                    <Text>{message.message.split("\n")[0]}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 12 }}>
                      {formatDate(message.timestamp)}
                    </Text>
                    {message.unread && (
                      <View className="mt-3" style={styles.unreadIndicator} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    padding: 18,
    paddingBottom: 15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "#0b7ffe",
    borderRadius: 5,
    position: "absolute",
    top: 8,
    right: 8,
  },
});

export default Chat;
