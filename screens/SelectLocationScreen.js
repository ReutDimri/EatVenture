import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SelectLocationScreen() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    // Fetch cities and neighborhoods from your API
    axios.get('http://your-django-server-url/api/cities')
      .then(response => setCities(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (city) {
      axios.get(`http://your-django-server-url/api/neighborhoods?city=${city}`)
        .then(response => setNeighborhoods(response.data))
        .catch(error => console.error(error));
    }
  }, [city]);

  const handleContinue = () => {
    navigation.navigate('RouteOptions', { city, neighborhood, location });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Location</Text>
      <Button title="Use Current Location" onPress={() => console.log(location)} />
      <Text style={styles.orText}>OR</Text>
      <Picker
        selectedValue={city}
        style={styles.picker}
        onValueChange={(itemValue) => setCity(itemValue)}>
        {cities.map((city) => (
          <Picker.Item key={city.id} label={city.name} value={city.name} />
        ))}
      </Picker>
      <Picker
        selectedValue={neighborhood}
        style={styles.picker}
        onValueChange={(itemValue) => setNeighborhood(itemValue)}>
        {neighborhoods.map((neighborhood) => (
          <Picker.Item key={neighborhood.id} label={neighborhood.name} value={neighborhood.name} />
        ))}
      </Picker>
      <Button title="Continue" onPress={handleContinue} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#00796B',
  },
  orText: {
    marginVertical: 20,
    color: '#00796B',
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
});
