import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const navigation = useNavigation();

  const handleSignup = () => {
    const userData = {
      fullName,
      email,
      password,
      isBusinessOwner,
      businessName: isBusinessOwner ? businessName : null
    };
    console.log('User data:', userData); // Log the data being sent

    axios.post('http://127.0.0.1:8000/api/signup/', userData)
      .then(response => {
        console.log('Response:', response.data); // Log the response
        if (response.status === 201) {
          navigation.navigate('Home');
        } else {
          Alert.alert("Signup failed", "An error occurred");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert("Signup failed", "An error occurred");
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
        Alert.alert("Signup failed", error.response ? error.response.data.message : "An error occurred");
      });
      
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Eat-Venture.png')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Business Owner</Text>
        <Switch
          value={isBusinessOwner}
          onValueChange={setIsBusinessOwner}
        />
      </View>
      {isBusinessOwner && (
        <TextInput
          style={styles.input}
          placeholder="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
        />
      )}
      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,  // Updated size
    height: 200,  // Updated size
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#00796B',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00796B',
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    marginRight: 10,
    color: '#00796B',
  },
  loginText: {
    marginTop: 20,
    color: '#00796B',
    textDecorationLine: 'underline',
  },
});
