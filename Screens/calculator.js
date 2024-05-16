import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
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
  const [totalPrices, setTotalPrices] = useState({ standard: 0, discount: 0 });
  const [individualPrices, setIndividualPrices] = useState({
    "No of Monthly Transaction": { standard: 0, discount: 0 },
    "No of Monthly Invoices": { standard: 0, discount: 0 },
    "No of Monthly Payroll": { standard: 0, discount: 0 },
    "Monthly Cashflow": { standard: 0, discount: 0 },
    "Monthly Budgeting": { standard: 0, discount: 0 },
    "QuickBook Xero/Setup": { standard: 0, discount: 0 },
  });

  useEffect(() => {
    calculateTotalPrices();
  }, [categoryTotal, checkboxes]);

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
    const prices = { standard: 0, discount: 0 };
    switch (category) {
      case "Monthly Cashflow":
      case "Monthly Budgeting":
        if (checkboxes[category]) {
          prices.standard = (((categoryTotal["No of Monthly Transaction"] +
            categoryTotal["No of Monthly Invoices"] +
            categoryTotal["No of Monthly Payroll"]) * 5) / 60) * 15;
          prices.discount = (((categoryTotal["No of Monthly Transaction"] +
            categoryTotal["No of Monthly Invoices"] +
            categoryTotal["No of Monthly Payroll"]) * 5) / 60) * 10;
        }
        break;
      case "QuickBook Xero/Setup":
        if (checkboxes[category]) {
          prices.standard = prices.discount = 300;
        }
        break;
      case "No of Monthly Transaction":
        if (checkboxes[category]) {
          prices.standard = ((categoryTotal["No of Monthly Transaction"] * 5) / 60) * 15;
          prices.discount = ((categoryTotal["No of Monthly Transaction"] * 1) / 60) * 10;
        }
        break;
      case "No of Monthly Invoices":
        if (checkboxes[category]) {
          prices.standard = ((categoryTotal["No of Monthly Invoices"] * 15) / 60) * 15;
          prices.discount = ((categoryTotal["No of Monthly Invoices"] * 5) / 60) * 10;
        }
        break;
      case "No of Monthly Payroll":
        if (checkboxes[category]) {
          prices.standard = ((categoryTotal["No of Monthly Payroll"] * 15) / 60) * 15;
          prices.discount = ((categoryTotal["No of Monthly Payroll"] * 5) / 60) * 10;
        }
        break;
      default:
        break;
    }
    setIndividualPrices(prevPrices => ({
      ...prevPrices,
      [category]: prices,
    }));
    return prices;
  };

  const calculateTotalPrices = () => {
    let totalStandard = 0;
    let totalDiscount = 0;
    Object.keys(categoryTotal).forEach((category) => {
      const categoryPrices = calculateCategoryTotal(category);
      totalStandard += categoryPrices.standard;
      totalDiscount += categoryPrices.discount;
    });
    setTotalPrices({ standard: totalStandard, discount: totalDiscount });
  };

const handleLockPrice = () => {
  const selectedCategories = Object.keys(checkboxes).filter(
    (category) => checkboxes[category]
  );
  const lockedPrices = selectedCategories.map((category) => ({
    category,
    priceStandard: individualPrices[category].standard,
    priceDiscount: individualPrices[category].discount,
  }));
  const totalStandard = lockedPrices.reduce((total, { priceStandard }) => total + priceStandard, 0);
  const totalDiscount = lockedPrices.reduce((total, { priceDiscount }) => total + priceDiscount, 0);
  const lockedPricesText = lockedPrices
    .map(({ category, priceStandard, priceDiscount }) => `${category}: $${priceDiscount.toFixed(2)}`)
    .join('\n');

  navigation.navigate("LockedPriceScreen", {
    lockedPricesText: `${lockedPricesText}\nTotal: $${totalDiscount.toFixed(2)}`,
  });
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
              style={{ backgroundColor: "#f5f8fa" }}>
              {Object.keys(individualPrices).map((category) => (
                <Text className="text-base p-2" key={category}>
                  {category}: {"\n"}
                  {category === "QuickBook Xero/Setup" ? (
                    <Text>${individualPrices[category].standard.toFixed(2)}</Text>
                  ) : (
                    <Text>
                      <Text className="mr-5" style={{ textDecorationLine: "line-through" }}>
                        ${individualPrices[category].standard.toFixed(2)}
                      </Text>{" "}
                      <Text>${individualPrices[category].discount.toFixed(2)}</Text>
                    </Text>
                  )}
                </Text>
              ))}
              <Text className="text-base p-2">
                Total Billing:{"\n"} <Text style={{ textDecorationLine: 'line-through' }}>${totalPrices.standard.toFixed(2)}</Text> ${totalPrices.discount.toFixed(2)}
              </Text>
              <View className="flex-row mt-2">
                <TouchableOpacity
                  style={{ backgroundColor: "#0b7ffe" }}
                  className="p-3 rounded-md"
                  onPress={handleLockPrice}>
                  <Text className="text-white text-md">Lock the price Now</Text>
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
