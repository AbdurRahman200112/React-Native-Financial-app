import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import Footer from './footer';
import axios from 'axios';

const MultiStepForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    step: 1,
    business_description: '',
    business_size: '',
    business_category: '',
    business_name: '',
    firstName: '',
    lastName: '',
    email: '',
    phone_no: ''
  });

  const [openStep1, setOpenStep1] = useState(false);
  const [valueStep1, setValueStep1] = useState(null);

  const [openStep2, setOpenStep2] = useState(false);
  const [valueStep2, setValueStep2] = useState(null);

  const [openStep3, setOpenStep3] = useState(false);
  const [valueStep3, setValueStep3] = useState(null);


  const handleInputChange = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNextStep = () => {
    setFormData({ ...formData, step: formData.step + 1 });
  };

  const handlePreviousStep = () => {
    setFormData({ ...formData, step: formData.step - 1 });
  };
  const handleSubmit = () => {
    const formDataToSend = {
      business_description: formData.business_description,
      business_size: formData.business_size,
      business_category: formData.business_category,
      business_name: formData.business_name,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone_no: formData.phone_no
    };
    fetch('http://192.168.0.79:8080/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Form submitted successfully:', data);
        navigation.navigate('CALCULATOR')
      })
      .catch(error => {
        console.error('There was a problem with the form submission:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {formData.step === 1 && (
        <View style={styles.container}>
          <Text className="text-base mb-2 text-left">What Best Describes Your Business?</Text>
            <DropdownPicker
              open={openStep1}
              value={valueStep1}
              placeholder="Select categories"
              items={[
                { label: 'Consulting Real Estate', value: 'consulting-real-estate' },
                { label: 'Consulting', value: 'consulting' },
                { label: 'Food & Beverages', value: 'food-beverages' },
                { label: 'Health', value: 'health' },
                { label: 'Manufacturing / Wholesale', value: 'manufacturing-wholesale' },
                { label: 'Non Profit', value: 'non-profit' },
                { label: 'Retail', value: 'retail' },
                { label: 'Transportation / Logistics', value: 'transportation-logistics' },
                { label: 'Other Services', value: 'other-services' },
              ]}
              setOpen={setOpenStep1}
              setValue={setValueStep1}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
              labelStyle={styles.dropdownLabel}
                onChangeItem={(item) => {
                  setValueStep1(item.value);
                  setFormData({ ...formData, business_description: item.value });
                }}
            />
          <TouchableOpacity className="bg-blue-500 px-3 py-3 mt-6 rounded-md" onPress={handleNextStep}>
            <Text style={styles.buttonText}>Next Step</Text>
          </TouchableOpacity>
        </View>
      )}
      {formData.step === 2 && (
        <View style={styles.container}>
          <Text className="text-base text-black mr-28 mb-2 text-left">How Large is Your Business?</Text>
        <DropdownPicker
          open={openStep2}
          value={valueStep2}
          placeholder="Select an Option"
          items={[
            { label: 'Startup (1 - 9 Employees)', value: 'startup' },
            { label: 'Small (10 - 50 Employees)', value: 'small' },
            { label: 'Mid-Size (51 - 250 Employees)', value: 'finance' },
            { label: 'Middle Market (250 - 1000 Employees)', value: 'middle-market' },
            { label: 'Enterprise (1000+ Employees)', value: 'enterprise' },
          ]}
          setOpen={setOpenStep2}
          setValue={setValueStep2}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownStyle={styles.dropdown}
          labelStyle={styles.dropdownLabel}
           onChangeItem={(item) => {
             setValueStep2(item.value);
             setFormData({ ...formData, business_size: item.value });
           }}
        />
          <View className="flex flex-row justify-between mt-5">
           <TouchableOpacity className="bg-blue-500 px-5 py-3 rounded-md ml-2"  onPress={handlePreviousStep}>
            <Text className="text-white text-base font-bold">Back</Text>
           </TouchableOpacity>
           <TouchableOpacity className="ml-20 mr-20" >
           </TouchableOpacity>
           <TouchableOpacity className="bg-blue-500 px-3 py-3 rounded-md" onPress={handleNextStep}>
            <Text className="text-white font-bold text-base">Next Step</Text>
           </TouchableOpacity>
         </View>
         </View>
      )}
      {/* Step 3 */}
      {formData.step === 3 && (
        <View style={styles.container}>
          <Text className="text-base mr-28 mb-3 text-left">Select Your Business Category</Text>
        <DropdownPicker
          open={openStep3}
          value={valueStep3}
          placeholder="Select categories"
          items={[
            { label: 'Accounting & Bookkeeping Service', value: 'accounting-bookkeeping' },
            { label: 'Financial Planning & Analysis', value: 'financial-planning' },
            { label: 'Business System & Processes', value: 'business-system' },
            { label: 'Audit & Assurance', value: 'audit-assurance' },
            { label: 'Tax', value: 'tax' },
          ]}
          setOpen={setOpenStep3}
          setValue={setValueStep3}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownStyle={styles.dropdown}
          labelStyle={styles.dropdownLabel}
          onChangeItem={(item) => {
            setValueStep3(item.value);
            setFormData({ ...formData, business_category: item.value });
          }}
        />
          <View className="flex flex-row justify-between mt-5">
           <TouchableOpacity className="bg-blue-500 px-5 py-3 rounded-md ml-2"  onPress={handlePreviousStep}>
            <Text className="text-white text-base font-bold">Back</Text>
           </TouchableOpacity>
           <TouchableOpacity className="ml-20 mr-20" >
           </TouchableOpacity>
           <TouchableOpacity className="bg-blue-500 px-3 py-3 rounded-md" onPress={handleNextStep}>
            <Text className="text-white font-bold text-base">Next Step</Text>
           </TouchableOpacity>
         </View>
         </View>
      )}
      {formData.step === 4 && (
        <View style={styles.container}>
          <Text className="text-base mb-2 mr-52">Business Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              placeholderTextColor="black"
              onChangeText={(value) => handleInputChange(value, 'business_name')}
            />
          <View className="flex flex-row justify-between ">
           <TouchableOpacity className="bg-blue-500 px-5 py-3 rounded-md ml-2"  onPress={handlePreviousStep}>
            <Text className="text-white text-base font-bold">Back</Text>
           </TouchableOpacity>
            <TouchableOpacity className="ml-20 mr-20" >
            </TouchableOpacity>
           <TouchableOpacity className="bg-blue-500 px-3 py-3 rounded-md" onPress={handleNextStep}>
            <Text className="text-white font-bold text-base">Next Step</Text>
           </TouchableOpacity>
           </View>
        </View>
      )}
      {formData.step === 5 && (
        <View style={{width:'50%',justifyContent:'center',alignItems:'center',flex:1}}>
          <Text className="text-lg text-start">Personal Details</Text>
           <View className="flex flex-row justify-between">
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="black"
              onChangeText={(value) => handleInputChange(value, 'firstName')}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="black"
              className="ml-3"
              style={styles.input}
              onChangeText={(value) => handleInputChange(value, 'lastName')}
            />
          </View>
          <View className="flex flex-row justify-between">
           <TextInput
             style={styles.input}
             placeholder="Email"
             placeholderTextColor="black"
             onChangeText={(value) => handleInputChange(value, 'email')}
            />
           <TextInput
             style={styles.input}
             placeholder="Phone No"
             placeholderTextColor="black"
             className="ml-3"
             onChangeText={(value) => handleInputChange(value, 'phone_no')}
            />
           </View>
           <View className="flex flex-row justify-between">
          <TouchableOpacity className="bg-blue-500 px-5 py-3 rounded-md mr-3"  onPress={handlePreviousStep}>
            <Text className="text-white text-base font-bold">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity className="ml-20 mr-20">
          </TouchableOpacity>
          <TouchableOpacity className="bg-blue-500 px-3 py-3 rounded-md" onPress={handleSubmit}>
            <Text className="text-white font-bold text-base">Submit</Text>
          </TouchableOpacity>
         </View>
        </View>
      )}
      <Footer navigation={navigation}/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    width:'100%'
  },
  stepContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownContainer: {
    width: '80%',
    height: 40,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth:0,
    padding:12,
    height:65
  },
  dropdownList: {
    borderWidth:0,
    border:'none'
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    padding: 14,
    borderRadius:12,
    marginBottom: 20,
    backgroundColor:'#F5F8FA',
    width: '80%',
    },
});

export default MultiStepForm;
