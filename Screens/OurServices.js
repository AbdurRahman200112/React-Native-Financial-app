import React from 'react';
import { View, Image, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import CarouselComponent from './slider';
import CreativeDesign from './creativeDesign';
import Footer from './footer';
import style from './Style/style';
const { width, height } = Dimensions.get('window');
const AvailableServices = ({ navigation }) => {
  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
     <ScrollView>
      <View style={style.row}>
       <Text className="text-4xl ml-4 font-semibold mt-9" style={{color:'#000'}}>Having more than <Text style={{color:'#0d6efd'}}>25 years </Text>of Experience</Text>
      </View>
      <View style={style.row}>
       <Text className="text-lg mt-2 ml-4">Do you immediately need an SME (Subject {"\n"}Matter Expert) like CFO,
        CSO, or COO who can provide strategic guidance.</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
       <Image source={require('../img/services.png')} style={{ width: '90%',height:282 }} />
      </View>
      <View style={{height: 32, width: 144, borderRadius: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30 }} className="bg-slate-100">
       <Text className="text-xs" style={{color:'#0b7ffe'}}>What We Can Do For You</Text>
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
        Have A Look At The Services {"\n"}We Offer.</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
       <View style={{height: 335, width: 320, borderRadius: 20, padding: 20, marginBottom: 10 }} className="bg-slate-100">
       <Text className="text-lg font-semibold">Cloud Bookkeeping</Text>
       <Text className="text-base font-md">Streamline business success with cloud-based bookkeeping, offering insights, efficiency, and accessibility.</Text>
       <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../img/art-1.png')} style={{ width: 200, height: 200 }} />
       </View>
      </View>
      <View style={{height: 335, width: 320, borderRadius: 20, padding: 20, marginBottom: 10 }}
        className="bg-slate-100">
        <Text className="text-lg font-semibold">Accounting Service</Text>
        <Text className="text-base font-md">Experienced team, cost-effective services, advanced tools, tailored solutions for efficient accounting.</Text>
       <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../img/illustrator_art.png')} style={{ width: 200, height: 200 }} />
       </View>
      </View>
      <View style={{height: 335, width: 320, borderRadius: 20, padding: 20, marginBottom: 10 }} className="bg-slate-100">
       <Text className="text-lg font-semibold">Tax Service</Text>
       <Text className="text-base font-md">Mavens Advisor offers competitive, specialized tax accounting for streamlined compliance and reporting.</Text>
       <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../img/men-art.png')} style={{ width: 200, height: 200 }} />
       </View>
       </View>
       <View style={{height: 335, width: 320, borderRadius: 20, padding: 20, marginBottom: 10 }} className="bg-slate-100">
        <Text className="text-lg font-semibold">Virtual CFO Service</Text>
        <Text className="text-base font-md">Expert advice on financial matters, including budgeting, forecasting, and investment strategies.</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../img/art_3.png')} style={{ width: 200, height: 200 }}/>
       </View>
      </View>
      <View style={{height: 335, width: 320, borderRadius: 20, padding: 20,marginBottom: 10 }} className="bg-slate-100">
       <Text className="text-lg font-semibold">Audit Service</Text>
       <Text className="text-base font-md">Efficient handling of payroll processes, ensuring compliance, accuracy, and timeliness.</Text>
       <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../img/art_4.png')}style={{ width: 200, height: 200 }}/>
       </View>
      </View>
      <View style={{height: 335, width: 320, borderRadius: 20, padding: 20 }} className="bg-slate-100 ">
       <Text className="text-lg font-semibold">Valuation Service</Text>
       <Text className="text-base font-md">Efficient handling of payroll processes, ensuring compliance, accuracy, and timeliness.</Text>
       <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../img/art_5.png')}style={{ width: 200, height: 200 }}/>
       </View>
      </View>
      <View style={{height: 335, width: 320, borderRadius: 20, padding: 20,marginTop:10 }} className="bg-slate-100 ">
       <Text className="text-lg font-semibold">Operations Partner</Text>
       <Text className="text-base font-md">Professionals adept in best practices enable affordable access, ensuring SME growth.</Text>
       <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../img/operation-partner.png')}style={{ width: 200, height: 200 }}/>
       </View>
      </View>
      <View style={{height: 335, width: 320, borderRadius: 20, padding: 20, marginTop:10 }} className="bg-slate-100 mb-10">
       <Text className="text-lg font-semibold">Compilance Partner</Text>
       <Text className="text-base font-md">Professionals adept in best practices enable affordable access, ensuring SME growth.</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../img/compilance-partner.png')}style={{ width: 200, height: 200 }}/>
       </View>
      </View>
      </View>
      <View>
       <Footer navigation={navigation}/>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
};
export default AvailableServices;
