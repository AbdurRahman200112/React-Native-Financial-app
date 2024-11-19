
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import style from "./Style/style";
import Footer from "./footer";
import Slider from "./slider";
const { width, height } = Dimensions.get("window");
const HomeScreen = ({ navigation }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const CounterHeading = ({ maxValue, speed }) => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter < maxValue) {
            return prevCounter + 1;
          } else {
            clearInterval(interval);
            return prevCounter;
          }
        });
      }, speed);
      return () => clearInterval(interval);
    }, []);
    return (
      <Text className="text-4xl font-black text-black m-1">
        {counter}
        <Text style={{ fontWeight: "normal", color: "#0b7ffe" }}>+</Text>
      </Text>
    );
  };
  return (
  <View style={{flex:1, backgroundColor:'white'}}>
    <LinearGradient
        colors={[
          'rgba(213, 234, 253, 0.8)',
          'rgba(213, 234, 253, 0.8)',
          'rgba(213, 234, 253, 0.3)',
          'rgba(245, 186, 207, 0.1)',
          'rgba(243, 168, 195, 0.1)',
          'rgba(240, 148, 182, 0.1)',
          'rgba(213, 234, 253, 0.6)',
          'rgba(213, 234, 253, 0.6)',
          'rgba(252, 247, 232, 1)'
  ]}
  style={styles.gradient}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
>
    <SafeAreaView>
      <ScrollView>
        <View style={style.row}>
          <Text
            className="text-4xl ml-4 font-semibold mt-9"
            style={{ color: "#000" }}
          >
            Empower Growth {"\n"}
            <Text style={{ color: "#0d6efd" }}>Virsme's</Text> Virtual CFO Services!
          </Text>
        </View>
        <View style={style.row}>
          <Text className="text-base ml-4">
            Unlock the full potential of your business with Mavens Advisor
            Financial Services. Trusted expertise in accounting and finance for
            the {"\n"}USA and UK markets.
          </Text>
        </View>
        <View className="flex flex-row m-2">
          <TouchableOpacity
            onPressIn={handleMouseEnter}
            onPressOut={handleMouseLeave}
            style={[style.secBtnStyle2, isHovered && style.secBtnStyle2Hover]}
            onPress={() => navigation.navigate("SUBSCRIPTION FORM")}
          >
            <Text className="text-center text-lg" style={{ color: "#0D6EFD" }}>
              Get Subscription Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../img/bg-4.png")}
            style={{ width: "95%" }}
            className="rounded-xl"
          />
        </View>
        <View className="mt-10 mb-10">
          <Text className="text-3xl mt-2 mb-2 text-left ml-4 font-sans-serif font-bold">
            Business <Text style={{ color: "#0b7ffe" }}>Consulting</Text>
          </Text>
          <View className="flex-1 justify-center items-center">
          <Text className="text-base text-justify w-11/12">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here,
          </Text>
          </View>
          <Slider />
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            source={require("../img/image19.jpg")}
            style={{ height: 550 }}
          />
        </View>
        <View style={{ alignItems: "center" }} className="mb-20">
          <Text className="text-3xl mt-12 font-sans-serif ml-2 font-bold">
            Continue Your{" "}
            <Text style={{ color: "#0b7ffe", textAlign: "center" }}>
              Business
            </Text>
            {"\n"}With Us
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={style.col}>
              <CounterHeading maxValue={85} speed={1} />
              <Text className="text-base font-sm text-black">
                Total Clients
              </Text>
            </View>
            <View style={style.col}>
              <CounterHeading maxValue={95} speed={1} />
              <Text className="text-base font-sm text-black">Employees</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }} className="mt-12 mb-5">
            <View style={style.col}>
              <CounterHeading maxValue={90} speed={10} />
              <Text className="text-base font-sm text-black">
                Useful Programs
              </Text>
            </View>
            <View style={style.col}>
              <CounterHeading maxValue={75} speed={10} />
              <Text className="text-base font-sm text-black">
                Total Freelancer
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
   </LinearGradient>
   </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
