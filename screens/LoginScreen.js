import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
        axios.post('127.0.0.1:8000/api/login/',  { email, password } )
            .then(response => {
              const { access, refresh } = response.data;
                if (response.status === 200) {
                navigation.navigate('Home');
                } else {
                Alert.alert("Login failed", "Invalid email or password");
                }
            })
            .catch(error => {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                    Alert.alert("Login failed", `Server responded with status ${error.response.status}`);
                  } else if (error.request) {
                    // No response received
                    console.error('Request data:', error.request);
                    Alert.alert("Login failed", "No response received from server");
                  } else {
                    // Error setting up the request
                    console.error('Error message:', error.message);
                    Alert.alert("Login failed", "Error setting up request");
                  }
                  console.error('Axios error config:', error.config);
                console.error(error);
                Alert.alert("Login failed", "An error occurred");
            });

  };

  const handleForgetPassword = () => {
    axios.post('http://127.0.0.1:8000/accounts/password_reset/', { email })
      .then(response => {
        if (response.data.status === 'success') {
          Alert.alert("Forget Password", response.data.message);
        } else {
          Alert.alert("Error", "Something went wrong");
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Login failed", "Invalid username or password");
      })
    };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Eat-Venture.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} color="#00796B" />
      <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign Up
      </Text>
      <Button title="Forget Password?" onPress={handleForgetPassword} color="#00796B" />
      <Text style={styles.forgetText} onPress={handleForgetPassword}>
        Forget Password?
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
    width: 200,
    height: 200,
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
    backgroundColor: '#FFFFFF',
  },
  signupText: {
    marginTop: 20,
    color: '#00796B',
    textDecorationLine: 'underline',
  },
  forgetText: {
    marginTop: 10,
    color: '#00796B',
    textDecorationLine: 'underline',
  },
});
