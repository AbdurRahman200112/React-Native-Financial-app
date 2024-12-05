import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const CreateTeacherForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://192.168.1.215:8080/teachers', data);
      setModalVisible(true); // Show modal on success
      reset(); // Reset form after submission
    } catch (error) {
      Alert.alert('Error', 'Failed to create teacher account. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Teacher Account</Text>

      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            placeholder="Enter teacher's name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Enter teacher's email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required', minLength: 6 }}
        render={({ field: { onChange, value } }) => (
        <TextInput
          style={[
            styles.input,
            errors.password && styles.errorInput
          ]}
          placeholder="Enter a password"
          secureTextEntry={true} // Ensure boolean prop has proper syntax
          value={value}
          onChangeText={onChange}
        />

        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Text style={styles.label}>Department</Text>
      <Controller
        control={control}
        name="department"
        rules={{ required: 'Department is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.department && styles.errorInput]}
            placeholder="Enter teacher's department"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.department && <Text style={styles.errorText}>{errors.department.message}</Text>}

      <TouchableOpacity className="rounded-3xl bg-blue-800 p-4"  onPress={handleSubmit(onSubmit)}>
            <Text className="text-center text-white text-md">ADD TEACHER</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png' }}
              style={styles.modalIcon}
            />
            <Text style={styles.modalText}>Teacher added successfully!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#ffff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 17, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 15,
    marginBottom: 16,
  },
  errorInput: { borderColor: 'red' },
  errorText: { color: 'red', marginBottom: 8 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 10,
  },
  modalIcon: { width: 80, height: 80, marginBottom: 20 },
  modalText: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  closeButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});

export default CreateTeacherForm;
