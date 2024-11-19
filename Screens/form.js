import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import DropdownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import AutoType from "./autoType";

const MultiStepForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    step: 1,
    business_description: "",
    business_size: "",
    business_category: "",
    business_name: "",
    currency: "",
    foundedYear: "",
    customer_type: "",
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
  });

  const [openStep1, setOpenStep1] = useState(false);
  const [valueStep1, setValueStep1] = useState(null);

  const [openStep2, setOpenStep2] = useState(false);
  const [valueStep2, setValueStep2] = useState(null);

  const [openStep3, setOpenStep3] = useState(false);
  const [valueStep3, setValueStep3] = useState(null);

  const [businessCategory1, setBusinessCategory] = useState(false);
  const [businessValue, setBusinessValue] = useState(null);

  const [openCurrency, setOpenCurrency] = useState(false);
  const [valueCurrency, setValueCurrency] = useState(null);
  const [itemsCurrency, setItemsCurrency] = useState([]);
  const [loadingCurrency, setLoadingCurrency] = useState(true);

  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);

  const [openCountry, setOpenCountry] = useState(false);
  const [valueCountry, setValueCountry] = useState(false);

  const [itemsYear, setItemsYear] = useState([]);
  const [loadingYear, setLoadingYear] = useState(true);

  const [customer, setCustomer] = useState(false);
  const [valueCustomer, setValueCustomer] = useState(null);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const parentCategories = [
    { label: 'Consulting Real Estate', value: 'consulting-real-estate' },
    { label: 'Retail', value: 'Retail' },
    { label: 'Tech Services', value: 'Tech Services' },
    { label: 'Health', value: 'Health' },
    { label: 'Food & Beverages', value: 'Food & Beverages' },
    { label: 'Advertisement Agency', value: 'Advertisement Agency' },
    { label: 'Education', value: 'Education' },
    { label: 'Manufacturing / Wholesale', value: 'Manufacturing / Wholesale' },
    { label: 'Media / Entertainment', value: 'Media / Entertainment' },
    { label: 'Transportation / Logistics', value: 'Transportation / Logistics' },
    { label: 'Event Management', value: 'Event Management' },
    { label: 'Travel & Tourism', value: 'Travel & Tourism' },
    { label: 'Freelancer', value: 'Freelancer' },
    { label: 'Event Decor', value: 'Event Decor' },
    { label: 'Interior Design', value: 'Interior Design' },
    { label: 'Non Profit', value: 'Non Profit' },
    { label: 'Beauty', value: 'Beauty' },
    { label: 'PR Agency', value: 'PR Agency' },
    { label: 'Online Stores', value: 'Online Stores' },
    { label: 'Coach (Life / Business / Sports)', value: 'Coach (Life / Business / Sports)' },
    { label: 'Artisanal and Handcraft', value: 'Artisanal and Handcraft' },
    { label: 'Photography', value: 'Photography' },
    { label: 'Legal Service', value: 'Legal Service' },
    { label: 'Home Decor', value: 'Home Decor' },
    { label: 'Factory Production Facility', value: 'Factory Production Facility' },
    { label: 'Gifting Service', value: 'Gifting Service' },
    { label: 'Pets', value: 'Pets' },
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Rent a Car Service', value: 'Rent a Car Service' },
    { label: 'Performers', value: 'Performers' },
    { label: 'Other Services', value: 'Other Services' },
  ];

  const subCategories = {
    'Food & Beverages': [
      { label: 'Baking Business / Dessert', value: 'Baking Business / Dessert' },
      { label: 'Catering Business', value: 'Catering Business' },
      { label: 'Online Food Business / Fresh or Frozen', value: 'Online Food Business / Fresh or Frozen' },
      { label: 'Restaurant / Cafe', value: 'Restaurant / Cafe' },
      { label: 'Other Food Products / Services', value: 'Other Food Products / Services' },
    ],
    'Agriculture': [
      { label: 'Farming', value: 'Farming' },
      { label: 'Gardening Supplies', value: 'Gardening Supplies' },
      { label: 'Livestock & Poultry', value: 'Livestock & Poultry' },
      { label: 'Other Agriculture Service', value: 'Other Agriculture Service' },
    ],
    'Artisanal and Handcraft': [
      { label: 'Artist / Painter', value: 'Artist / Painter' },
      { label: 'Candle Making', value: 'Candle Making' },
      { label: 'Handmade Leather Products', value: 'Handmade Leather Products' },
      { label: 'Pottery', value: 'Pottery' },
      { label: 'Other Artisanal and Handcraft', value: 'Other Artisanal and Handcraft' },
    ],
    'Beauty': [
      { label: 'Beautician (At Home Services)', value: 'Beautician (At Home Services)' },
      { label: 'Cosmetologist / Aesthetician', value: 'Cosmetologist / Aesthetician' },
      { label: 'Hairstylist (Specialize Service)', value: 'Hairstylist (Specialize Service)' },
      { label: 'Henna Artist (Specialize Service)', value: 'Henna Artist (Specialize Service)' },
      { label: 'Lash Technician (Specialize Service)', value: 'Lash Technician (Specialize Service)' },
      { label: 'Makup Artist (Specialize Service)', value: 'Makup Artist (Specialize Service)' },
      { label: 'ManuFacture Cosmetics / Skin Care', value: 'ManuFacture Cosmetics / Skin Care' },
      { label: 'Nail Technician (Specialize Service)', value: 'Nail Technician (Specialize Service)' },
      { label: 'Reselling Cosmetics', value: 'Reselling Cosmetics' },
    ],
    'PR Agency' : [
       { label: "Academic Consultant", value: "Academic Consultant"},
       { label: "Edtech", value: "Edtech"},
       { label: "School", value: "School"},
       { label: "Tution Center / Academy", value: "Tution Center / Academy" },
   ],
   'Online Stores': [
       { label: "Bags Manufacturer", value: "Bags Manufacturer"},
       { label: "Furniture Manufacturer", value: "Furniture Manufacturer"},
       { label: "Jewelry Designer / Manufacturer", value: "Jewelry Designer / Manufacturer"},
       { label: "Shoe / Manufacturer", value: "Shoe / Manufacturer"},
   ],
   'Health': [
        { label: "Dentist", value: "Dentist" },
        { label: "Dermatologist", value: "Dermatologist" },
        { label: "Doctor (Private Practice)", value: "Doctor (Private Practice)" },
        { label: "Gym Business", value: "Gym Business" },
        { label: "Gym Trainer / Instructor", value: "Gym Trainer / Instructor"},
        { label: "Mental Health Practioners", value: "Mental Health Practioners"},
        { label: "Nutritionist", value: "Nutritionist" },
   ],
   'Travel & Tourism': [
        { label: "Guest House / Hotel", value: "Guest House / Hotel"},
        { label: "Immigration Services", value: "Immigration Services" },
        { label: "Tour Company / Operator / Guide", value: "Tour Company / Operator / Guide"},
        { label: "Travel Agency", value: "Travel Agency",},
   ],
   'Tech Services' : [
        { label: "Hardware Development", value: "Hardware Development"},
        { label: "IoT Services", value: "IoT Services" },
        { label: "Software House", value: "Software House" },
        { label: "Others", value: "Others"},
   ],
   'Pets': [
        { label: "Pets Accessories", value: "Pets Accessories" },
        { label: "Pets Accessories", value: "Pets Accessories" },
        { label: "Pet Services", value: "Pet Services" },
        { label: "Veterinary Services", value: "Veterinary Services" },
   ]
  };

  const handleInputChange = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePreviousStep = () => {
    setFormData({ ...formData, step: formData.step - 1 });
  };

  useEffect(() => {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((response) => response.json())
      .then((data) => {
        const currencyItems = Object.keys(data).map((key) => ({
          label: `${data[key]} (${key})`,
          value: key,
        }));
        setItemsCurrency(currencyItems);
        setLoadingCurrency(false);
      })
      .catch((error) => {
        console.error("Error fetching currencies:", error);
        setLoadingCurrency(false);
      });
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i).map(
      (year) => ({
        label: year.toString(),
        value: year.toString(),
      })
    );
    setItemsYear(years);
  }, []);

  const handleSubmit = () => {
    const formDataToSend = {
      business_description: valueStep1,
      business_size: valueStep2,
      business_category: valueStep3,
      business_name: formData.business_name,
      currency: valueCurrency,
      foundedYear: valueYear,
      customer_type: valueCustomer,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone_no: formData.phone_no,
    };
    axios
      .post("http://192.168.2.81:8080/api", formDataToSend)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        navigation.navigate("CALCULATOR");
      })
      .catch((error) => {
        console.error("There was a problem with the form submission:", error);
      });
  };

  const handleNextStep = () => {
    if (formData.step === 1 && !valueStep1) {
      alert("Please select an Option");
      return;
    }
    if (formData.step === 2 && !valueStep2) {
      alert("Please select an Option");
      return;
    }
    if (formData.step === 3 && !valueStep3) {
      alert("Please select an Option");
      return;
    }
    setFormData({ ...formData, step: formData.step + 1 });
  };

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
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView className="w-96 items-center">
        <View style={styles.stepIndicator}>
          {[1, 2, 3, 4].map((stepNumber, index) => (
            <React.Fragment key={stepNumber}>
              <View
                style={[
                  styles.stepCircle,
                  formData.step >= stepNumber && styles.stepCircleActive,
                ]}
              >
                <Text style={styles.stepText}>{stepNumber}</Text>
              </View>
              {index < 3 && (
                <View
                  style={[
                    styles.stepLine,
                    formData.step > stepNumber && styles.stepLineActive,
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>
        {formData.step === 1 && (
          <View className="w-96 items-center">
            <DropdownPicker
              open={openStep1}
              value={valueStep1}
              placeholder="Business Categories"
              items={parentCategories}
              onChangeItem={(item) => {
                setValueStep1(item.label);
                setFormData({ ...formData, business_description: item.label });
              }}
              setOpen={setOpenStep1}
              setValue={setValueStep1}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
              labelStyle={styles.dropdownLabel}
              itemStyle={{ borderWidth: 0 }}
            />
            <View className="mt-2 hidden">
              <DropdownPicker
                open={businessCategory1}
                value={businessValue}
                placeholder="select Education Sub Category"
                items={[
                  {
                    label: "Academic Consultant",
                    value: "Academic Consultant",
                  },
                  {
                    label: "Edtech",
                    value: "Edtech",
                  },
                  {
                    label: "School",
                    value: "School",
                  },
                  {
                    label: "Tution Center / Academy",
                    value: "Tution Center / Academy",
                  },
                ]}
                onChangeItem={(item) => {
                  setValueStep1(item.label);
                  setFormData({
                    ...formData,
                    business_description: item.label,
                  });
                }}
                setOpen={setBusinessCategory}
                setValue={setBusinessValue}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                labelStyle={styles.dropdownLabel}
                itemStyle={{ borderWidth: 0 }}
              />
            </View>
            <View className="mt-2 hidden">
              <DropdownPicker
                open={businessCategory1}
                value={businessValue}
                placeholder="select Freelancer Business Sub Category"
                items={[
                  {
                    label: "Consultant",
                    value: "Consultant",
                  },
                  {
                    label: "Customer Service",
                    value: "Customer Service",
                  },
                  {
                    label: "Graphic Designer (Freelance)",
                    value: "Graphic Designer (Freelance)",
                  },
                  {
                    label: "Online Assistant",
                    value: "Online Assistant",
                  },
                  {
                    label: "Software Developer",
                    value: "Software Developer",
                  },
                  {
                    label: "Teacher (Freelance)",
                    value: "Teacher (Freelance)",
                  },
                  {
                    label: "Translation",
                    value: "Translation",
                  },
                  {
                    label: "UI / UX Designer",
                    value: "UI / UX Designer",
                  },
                  {
                    label: "Video Editor",
                    value: "Video Editor",
                  },
                  {
                    label: "Writer (Freelance)",
                    value: "Writer (Freelance)",
                  },
                  {
                    label: "Other Freelance Service",
                    value: "Other Freelance Service",
                  },
                ]}
                onChangeItem={(item) => {
                  setValueStep1(item.label);
                  setFormData({
                    ...formData,
                    business_description: item.label,
                  });
                }}
                setOpen={setBusinessCategory}
                setValue={setBusinessValue}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                labelStyle={styles.dropdownLabel}
                itemStyle={{ borderWidth: 0 }}
              />
            </View>
            <View className="mt-2 hidden">
              <DropdownPicker
                open={businessCategory1}
                value={businessValue}
                placeholder="select Gift Packing Sub Category"
                items={[
                  {
                    label: "Gift Deliver",
                    value: "Gift Deliver",
                  },
                  {
                    label: "Gift Packing",
                    value: "Gift Packing",
                  },
                ]}
                onChangeItem={(item) => {
                  setValueStep1(item.label);
                  setFormData({
                    ...formData,
                    business_description: item.label,
                  });
                }}
                setOpen={setBusinessCategory}
                setValue={setBusinessValue}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                labelStyle={styles.dropdownLabel}
                itemStyle={{ borderWidth: 0 }}
              />
            </View>

            <View className="mt-2 hidden">
              <DropdownPicker
                open={businessCategory1}
                value={businessValue}
                placeholder="select influencer Sub Category"
                items={[
                  {
                    label: "Youtuber",
                    value: "Youtuber",
                  },
                  {
                    label: "influencer - Others",
                    value: "influencer - Others",
                  },
                ]}
                onChangeItem={(item) => {
                  setValueStep1(item.label);
                  setFormData({
                    ...formData,
                    business_description: item.label,
                  });
                }}
                setOpen={setBusinessCategory}
                setValue={setBusinessValue}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                labelStyle={styles.dropdownLabel}
                itemStyle={{ borderWidth: 0 }}
              />
            </View>
            <View className="mt-2 hidden">
              <DropdownPicker
                open={businessCategory1}
                value={businessValue}
                placeholder="select Performers Sub Category"
                items={[
                  {
                    label: "Choreographer",
                    value: "Choreographer",
                  },
                  {
                    label: "Comedian",
                    value: "Comedian",
                  },
                  {
                    label: "Magician",
                    value: "Doctor (Private Practice)",
                  },
                  {
                    label: "Musician",
                    value: "Musician",
                  },
                  {
                    label: "Singer",
                    value: "Singer",
                  },
                  {
                    label: "Performers (Others)",
                    value: "Performers (Others)",
                  },
                ]}
                onChangeItem={(item) => {
                  setValueStep1(item.label);
                  setFormData({
                    ...formData,
                    business_description: item.label,
                  });
                }}
                setOpen={setBusinessCategory}
                setValue={setBusinessValue}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                labelStyle={styles.dropdownLabel}
                itemStyle={{ borderWidth: 0 }}
              />
            </View>
            <View className="mt-2 hidden">
              <DropdownPicker
                open={businessCategory1}
                value={businessValue}
                placeholder="select Pets Sub Category"
                items={[
                  {
                    label: "Pets Accessories",
                    value: "Pets Accessories",
                  },
                  {
                    label: "Pet Services",
                    value: "Pet Services",
                  },
                  {
                    label: "Veterinary Services",
                    value: "Veterinary Services",
                  },
                ]}
                onChangeItem={(item) => {
                  setValueStep1(item.label);
                  setFormData({
                    ...formData,
                    business_description: item.label,
                  });
                }}
                setOpen={setBusinessCategory}
                setValue={setBusinessValue}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                labelStyle={styles.dropdownLabel}
                itemStyle={{ borderWidth: 0 }}
              />
            </View>
            <DropdownPicker
              open={openStep2}
              value={valueStep2}
              placeholder="Business Size"
              items={[
                {
                  label: "Startup (1 - 9 Employees)",
                  value: "Startup (1 - 9 Employees)",
                },
                {
                  label: "Small (10 - 50 Employees)",
                  value: "Small (10 - 50 Employees)",
                },
                {
                  label: "Mid-Size (51 - 250 Employees)",
                  value: "Mid-Size (51 - 250 Employees)",
                },
                {
                  label: "Middle Market (250 - 1000 Employees)",
                  value: "Middle Market (250 - 1000 Employees)",
                  value: "Middle Market (250 - 1000 Employees)",
                },
                {
                  label: "Enterprise (1000+ Employees)",
                  value: "Enterprise (1000+ Employees)",
                },
              ]}
              setOpen={setOpenStep2}
              setValue={setValueStep2}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
              labelStyle={styles.dropdownLabel}
              className="mt-3"
              onChangeItem={(item) => {
                setValueStep2(item.value);
                setFormData({ ...formData, business_size: item.value });
              }}
              itemStyle={{ borderWidth: 0 }}
            />
            <TextInput
              style={styles.input}
              className="mt-6"
              placeholder="Business Name"
              placeholderTextColor="black"
              onChangeText={(value) =>
                handleInputChange(value, "business_name")
              }
            />
            <DropdownPicker
              open={openCurrency}
              value={valueCurrency}
              items={itemsCurrency}
              className="mt-3"
              setOpen={setOpenCurrency}
              setValue={setValueCurrency}
              setItems={setItemsCurrency}
              placeholder="Select Currency"
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropDownContainer}
              textStyle={styles.dropdownText}
              labelStyle={styles.dropdownLabel}
              listMode="SCROLLVIEW"
              onChangeItem={(item) => {
                setValueStep3(item.value);
                setFormData({ ...formData, currency: item.value });
              }}
            />
            <DropdownPicker
              open={openYear}
              value={valueYear}
              items={itemsYear}
              setOpen={setOpenYear}
              className="mt-5"
              setValue={setValueYear}
              setItems={setItemsYear}
              placeholder="Founded Year"
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropDownContainer}
              textStyle={styles.dropdownText}
              labelStyle={styles.dropdownLabel}
              listMode="SCROLLVIEW"
              onChangeItem={(item) => {
                setValueStep3(item.value);
                setFormData({ ...formData, foundedYear: item.value });
              }}
            />
            <DropdownPicker
                open={openCountry}
                value={valueCountry}
                className="mt-7"
               items={[
                 {
                   label: "United States",
                   value: "United States",
                 },
                 {
                   label: "United Kingdom",
                   value: "United Kingdom",
                 },
               ]}
               setOpen={setOpenCountry}
                   setValue={setValueCountry}
                   containerStyle={styles.dropdownContainer}
                   style={styles.dropdown}
                   dropDownStyle={styles.dropdown}
                   labelStyle={styles.dropdownLabel}
                   onChangeItem={(item) => {
                   setValueStep2(item.value);
                   setFormData({ ...formData, country: item.value });
                 }}
                 itemStyle={{ borderWidth: 0 }}
             />
            <TouchableOpacity
              className="bg-blue-500 px-3 py-3 mt-10 rounded-md"
              onPress={handleNextStep}>
              <Text style={styles.buttonText}>Next Step</Text>
            </TouchableOpacity>
          </View>
        )}
        {formData.step === 2 && (
          <View className="w-96 items-center">
         <DropdownPicker
               open={customer}
               value={valueCustomer}
               className="mt-7"
               placeholder="Who are your Customer"
               items={[
                 {
                   label: "Other Business",
                   value: "Other Business",
                 },
                 {
                   label: "Individuals",
                   value: "Individuals",
                 },
                 {
                   label: "Both",
                   value: "Both",
                 },
               ]}
               setOpen={setCustomer}
               setValue={setValueCustomer}
               containerStyle={styles.dropdownContainer}
               style={styles.dropdown}
               dropDownStyle={styles.dropdown}
               labelStyle={styles.dropdownLabel}
               onChangeItem={(item) => {
                 setValueStep3(item.value);
                 setFormData({ ...formData, customer_type: item.value });
               }}
               itemStyle={{ borderWidth: 0 }}
             />
             <View className="hidden">
               <TextInput
                 style={styles.input}
                 className="mt-6"
                 placeholder="Please Specify"
                 placeholderTextColor="black"
                 onChangeText={(value) =>
                   handleInputChange(value, "business_name")
                 }
               />
             </View>
            <Text className="text-base mr-28 mb-3 text-left">
              Select Your Business Category
            </Text>
            <DropdownPicker
              open={openStep3}
              value={valueStep3}
              placeholder="Select categories"
              items={[
                {
                  label: "Accounting & Bookkeeping Service",
                  value: "Accounting & Bookkeeping Service",
                },
                {
                  label: "Financial Planning & Analysis",
                  value: "Financial Planning & Analysis",
                },
                {
                  label: "Business System & Processes",
                  value: "Business System & Processes",
                },
                { label: "Audit & Assurance", value: "Audit & Assurance" },
                { label: "Tax", value: "Tax" },
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
              itemStyle={{ borderWidth: 0 }}
            />
            <View className="flex flex-row justify-between mt-5 w-11/12">
              <TouchableOpacity
                className="bg-blue-500 px-5 py-3 rounded-md ml-2"
                onPress={handlePreviousStep}
              >
                <Text className="text-white text-base font-bold">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity className="ml-20 mr-20"></TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-3 py-3 rounded-md"
                onPress={handleNextStep}
              >
                <Text className="text-white font-bold text-base">
                  Next Step
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {formData.step === 3 && (
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-lg text-start">Personal Details</Text>
            <View className="flex flex-row justify-between">
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="black"
                onChangeText={(value) => handleInputChange(value, "firstName")}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="black"
                className="ml-3"
                onChangeText={(value) => handleInputChange(value, "lastName")}
              />
            </View>
            <View className="flex flex-row justify-between mt-2">
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
                onChangeText={(value) => handleInputChange(value, "email")}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone No"
                placeholderTextColor="black"
                className="ml-3"
                onChangeText={(value) => handleInputChange(value, "phone_no")}
              />
            </View>
            <View className="flex flex-row justify-between mt-2">
              <TouchableOpacity
                className="bg-blue-500 px-5 py-3 rounded-md"
                onPress={handlePreviousStep}>
                <Text className="text-white text-base font-bold">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity className="ml-20 mr-20"></TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-3 py-3 rounded-md"
                onPress={handleSubmit}
              >
                <Text className="text-white font-bold text-base">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
  },
  stepCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  stepCircleActive: {
    backgroundColor: "#0b7ffe",
  },
  stepText: {
    color: "white",
    fontSize: 16,
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#ccc",
  },
  stepLineActive: {
    backgroundColor: "#0b7ffe",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownContainer: {
    width: "90%",
    height: 40,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.5)",
    padding: 12,
    zIndex: 1,
    height: 60,
  },
  dropdownList: {
    borderWidth: 0,
    border: 0,
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    padding: 14,
    borderRadius: 12,
    width: "90%",
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.5)",
  },
});

export default MultiStepForm;
