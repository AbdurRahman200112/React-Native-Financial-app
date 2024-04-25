import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, SafeAreaView,TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import Footer from './footer';

const CalculatorScreen = ( {navigation} ) => {
  const [categoryTotal, setCategoryTotal] = useState({
    monthlyTransaction: 0,
    monthlyInvoices: 0,
    payroll: 0,
    cashflow: 0,
    budget: 0,
    setup: 0
  });
  const [checkboxes, setCheckboxes] = useState({
    monthlyTransaction: false,
    monthlyInvoices: false,
    payroll: false,
    cashflow: false,
    budget: false,
    setup: false
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [individualPrices, setIndividualPrices] = useState({
    monthlyTransaction: 0,
    monthlyInvoices: 0,
    payroll: 0,
    cashflow: 0,
    budget: 0,
    setup: 0
  });

  useEffect(() => {
    calculateTotalPrice();
  }, [categoryTotal, checkboxes]);

  const handleCheckboxChange = (category) => {
    setCheckboxes({
      ...checkboxes,
      [category]: !checkboxes[category]
    });
  };
  const handleInputChange = (value, category) => {
    setCategoryTotal({
      ...categoryTotal,
      [category]: parseFloat(value)
    });
  };
  const calculateCategoryTotal = (category) => {
    switch (category) {
      case 'cashflow':
      case 'budget':
        if (checkboxes[category]) {
          const price = (categoryTotal.monthlyTransaction + categoryTotal.monthlyInvoices + categoryTotal.payroll) * 5 / 60 * 15;
          setIndividualPrices({...individualPrices, [category]: price});
          return price;
        }
        break;
      case 'setup':
        if (checkboxes[category]) {
          const price = 300;
          setIndividualPrices({...individualPrices, [category]: price});
          return price;
        }
        break;
      case 'monthlyTransaction':
        if (checkboxes[category]) {
          const price = categoryTotal.monthlyTransaction * 5 / 60 * 15;
          setIndividualPrices({...individualPrices, [category]: price});
          return price;
        }
        break;
      case 'monthlyInvoices':
        if (checkboxes[category]) {
          const price = categoryTotal.monthlyInvoices * 15 / 60 * 15;
          setIndividualPrices({...individualPrices, [category]: price});
          return price;
        }
        break;
      case 'payroll':
        if (checkboxes[category]) {
          const price = categoryTotal.payroll * 15 / 60 * 15;
          setIndividualPrices({...individualPrices, [category]: price});
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
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="items-center h-full justify-center flex-1">
          <View className="bg-white justify-center flex-1 mt-10 flex-1 rounded-xl shadow-lg flex space-x-4 w-80 p-5">
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Bookkeeping Calculator</Text>
             {Object.keys(categoryTotal).map((category) => (
              <View key={category}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <CheckBox
                    value={checkboxes[category]}
                    onValueChange={() => handleCheckboxChange(category)}
                    className="mt-2"
                  />
                  <Text className="ml-2">{category}</Text>
                </View>
                {category !== 'cashflow' && category !== 'budget' && category !== 'setup' && checkboxes[category] && (
                  <TextInput
                    onChangeText={(value) => handleInputChange(value, category)}
                    keyboardType="numeric"
                    style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
                    className="rounded-lg mt-2"
                  />
                )}
              </View>
            ))}
            <Text></Text>
          </View>
          <View className="bg-white justify-center flex-1 mt-3 mb-10 flex-1 rounded-xl shadow-lg flex space-x-1 w-80 p-5">
            {Object.keys(individualPrices).map((category) => (
             <>
            <Text className="text-base p-2" key={category}>{category}: ${individualPrices[category].toFixed(2)}</Text>
             </>
            ))}
            <Text className="text-base p-2">Total Price: ${totalPrice.toFixed(2)}</Text>
            <View className="flex-row mt-2">
             <TouchableOpacity style={{backgroundColor:'#0b7ffe'}} className="p-3 rounded-md"><Text className="text-white text-md">Lock the price Now</Text></TouchableOpacity>
             <TouchableOpacity style={{backgroundColor:'#0b7ffe'}} className="p-3 rounded-md ml-1"><Text className="text-white text-md">Get Discount Now</Text></TouchableOpacity>
           </View>
          </View>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CalculatorScreen;
