import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function RouteOptionsScreen() {
  const [numberOfStops, setNumberOfStops] = useState(1);
  const [kosher, setKosher] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { city, neighborhood, location } = route.params;

  const handleGenerateRoutes = () => {
    const queryParams = {
      city,
      neighborhood,
      numberOfStops,
      kosher,
      vegetarian,
    };
    axios.get('http://your-django-server-url/api/routes', { params: queryParams })
      .then(response => {
        navigation.navigate('Trip', { routes: response.data });
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route Options</Text>
      <Picker
        selectedValue={numberOfStops}
        style={styles.picker}
        onValueChange={(itemValue) => setNumberOfStops(itemValue)}>
        {[...Array(8).keys()].map(i => (
          <Picker.Item key={i + 1} label={`${i + 1} stops`} value={i + 1} />
        ))}
      </Picker>
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Kosher</Text>
        <Switch
          value={kosher}
          onValueChange={setKosher}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Vegetarian</Text>
        <Switch
          value={vegetarian}
          onValueChange={setVegetarian}
        />
      </View>
      <Button title="Generate Routes" onPress={handleGenerateRoutes} />
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
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginRight: 10,
    color: '#00796B',
  },
});
