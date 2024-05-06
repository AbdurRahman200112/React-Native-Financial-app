import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CheckBox from "expo-checkbox";
import styles from "./Style/style";
import { LinearGradient } from 'expo-linear-gradient';

const CalculatorScreen = ({ navigation }) => {
  const [categoryTotal, setCategoryTotal] = useState({
    "No of Monthly Transaction": 0,
    "No of Monthly Invoices": 0,
    "No of Monthly Payroll": 0,
    "Monthly Cashflow": 0,
    "Monthly Budgeting": 0,
    "QuickBook Xero/Setup": 0,
  });
  const [checkboxes, setCheckboxes] = useState({
    "No of Monthly Transaction": false,
    "No of Monthly Invoices": false,
    "No of Monthly Payroll": false,
    "Monthly Cashflow": false,
    "Monthly Budgeting": false,
    "QuickBook Xero/Setup": false,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [individualPrices, setIndividualPrices] = useState({
    "No of Monthly Transaction": 0,
    "No of Monthly Invoices": 0,
    "No of Monthly Payroll": 0,
    "Monthly Cashflow": 0,
    "Monthly Budgeting": 0,
    "QuickBook Xero/Setup": 0,
  });
  const [discountApplied, setDiscountApplied] = useState(false); // State to track if discount is applied

  useEffect(() => {
    calculateTotalPrice();
  }, [categoryTotal, checkboxes, discountApplied]);
  const handleCheckboxChange = (category) => {
    setCheckboxes({
      ...checkboxes,
      [category]: !checkboxes[category],
    });
  };

  const handleInputChange = (value, category) => {
    setCategoryTotal({
      ...categoryTotal,
      [category]: parseFloat(value),
    });
  };
  const calculateCategoryTotal = (category) => {
    const multiplier = discountApplied ? 10 : 15;
    switch (category) {
      case "Monthly Cashflow":
      case "Monthly Budgeting":
        if (checkboxes[category]) {
          const price =
            (((categoryTotal["No of Monthly Transaction"] +
              categoryTotal["No of Monthly Invoices"] +
              categoryTotal["No of Monthly Payroll"]) *
              5) /
              60) *
            multiplier;
          setIndividualPrices({ ...individualPrices, [category]: price });
          return price;
        }
        break;
      case "QuickBook Xero/Setup":
        if (checkboxes[category]) {
          const price = 300
          setIndividualPrices({ ...individualPrices, [category]: price });
          return price;
        }
        break;
      case "No of Monthly Transaction":
        if (checkboxes[category]) {
          const price =
            ((categoryTotal["No of Monthly Transaction"] * 5) / 60) *
            multiplier; // Use multiplier
          setIndividualPrices({ ...individualPrices, [category]: price });
          return price;
        }
        break;
      case "No of Monthly Invoices":
        if (checkboxes[category]) {
          const price =
            ((categoryTotal["No of Monthly Invoices"] * 15) / 60) *
            multiplier; // Use multiplier
          setIndividualPrices({ ...individualPrices, [category]: price });
          return price;
        }
        break;
      case "No of Monthly Payroll":
        if (checkboxes[category]) {
          const price =
            ((categoryTotal["No of Monthly Payroll"] * 15) / 60) *
            multiplier; // Use multiplier
          setIndividualPrices({ ...individualPrices, [category]: price });
          return price;
        }
        break;
      default:
        return 0;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    let total = 0;
    Object.keys(categoryTotal).forEach((category) => {
      const categoryPrice = calculateCategoryTotal(category);
      total += categoryPrice;
    });
    setTotalPrice(total);
  };

  const handleDiscountButtonClick = () => {
    setDiscountApplied(true); // Apply discount
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView>
            <LinearGradient
                colors={[
                  'rgba(213, 234, 253, 0.8)',
                  'rgba(213, 234, 253, 0.8)',
                  'rgba(213, 234, 253, 0.3)',
                  'rgba(245, 186, 207, 0.1)',
                  'rgba(243, 168, 195, 0.1)',
                  'rgba(240, 148, 182, 0.1)',
                  'rgba(213, 234, 253, 0.8)',
                  'rgba(213, 234, 253, 0.8)',
                  'rgba(252, 247, 232, 1)'
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
         <View className="items-center h-full justify-center flex-1">
          <View
            className="bg-white justify-center flex-1 mt-10 flex-1 rounded-xl shadow-lg flex space-x-4 w-11/12 p-5"
            style={{ backgroundColor: "#f5f8fa" }}
          >
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              Bookkeeping Calculator
            </Text>
            {Object.keys(categoryTotal).map((category) => (
              <View key={category}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <CheckBox
                    value={checkboxes[category]}
                    onValueChange={() => handleCheckboxChange(category)}
                    className="mt-2"
                    style={{ tintColor: "#0b7ffe" }}
                  />
                  <Text className="ml-2 mt-1 text-base">{category}</Text>
                </View>
                {category !== "Monthly Cashflow" &&
                  category !== "Monthly Budgeting" &&
                  category !== "QuickBook Xero/Setup" &&
                  checkboxes[category] && (
                    <TextInput
                      onChangeText={(value) =>
                        handleInputChange(value, category)
                      }
                      keyboardType="numeric"
                      style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
                      className="rounded-lg mt-2"
                    />
                  )}
              </View>
            ))}
            <Text></Text>
          </View>
          <View
            className="bg-white justify-center flex-1 mt-3 mb-10 flex-1 rounded-xl shadow-lg flex space-x-1 w-11/12 p-5"
            style={{ backgroundColor: "#f5f8fa" }}
          >
            {Object.keys(individualPrices).map((category) => (
              <>
                <Text className="text-base p-2" key={category}>
                  {category}: ${individualPrices[category].toFixed(2)}
                </Text>
              </>
            ))}
            <Text className="text-base p-2">
              Total Billing: ${totalPrice.toFixed(2)}
            </Text>
            <View className="flex-row mt-2">
              <TouchableOpacity
                style={{ backgroundColor: "#0b7ffe" }}
                className="p-3 rounded-md"
              >
                <Text className="text-white text-md">Lock the price Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "#0b7ffe" }}
                className="p-3 rounded-md ml-1"
                onPress={handleDiscountButtonClick} // Call the discount function
              >
                <Text className="text-white text-md">Get Discount Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CalculatorScreen;
