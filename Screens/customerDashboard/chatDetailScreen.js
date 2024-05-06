import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import io from "socket.io-client";
import { LinearGradient } from "expo-linear-gradient";

const CustomerChatDetail = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const socket = io("http://192.168.2.78:8080");

  useEffect(() => {
    //        fetchAdminEmail(route.params.userEmail);
    fetchMessages();
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("initial_messages", (initialMessages) => {
      setMessages(initialMessages);
    });
    socket.on("new_message", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const user_email = route.params.user_email;
      const response = await axios.get(
        `http://192.168.2.78:8080/CustomerMessages/${user_email}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(error.message);
    }
  };
  const fetchAdminEmail = async (userEmail) => {
    try {
      const response = await axios.get(
        `http://192.168.2.78:8080/adminEmail/${userEmail}`
      );
      setAdminEmail(response.data.adminEmail);
    } catch (error) {
      console.error("Error fetching admin email:", error);
    }
  };
  const sendMessage = async () => {
    try {
      const userEmail = route.params.user_email;
      await axios.post("http://192.168.2.78:8080/Customer/new_message", {
        email_address: userEmail,
        message: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching messages: {error}</Text>
      </View>
    );
  }
  return (
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
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.container}>
        <ScrollView>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                message.admin_email === "info@mavensadvisor.com"
                  ? styles.userMessage
                  : styles.adminMessage,
              ]}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={styles.message}>{message.message}</Text>
                <Text style={styles.timestamp}>
                  {formatDate(message.timestamp)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type your message..."
            value={newMessage}
            onChangeText={setNewMessage}
            style={styles.input}
            multiline
          />
          <TouchableOpacity
            style={{ backgroundColor: "#0b7ffe" }}
            onPress={sendMessage}
            className="p-3 rounded-3xl"
          >
            <Feather name="send" size={18} color="#ffff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    paddingVertical: 15,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  adminMessage: {
    justifyContent: "flex-end",
  },
  userMessage: {
    justifyContent: "flex-start",
  },
  message: {
    fontSize: 14,
    color: "black",
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginRight: 10,
  },
});
export default CustomerChatDetail;
