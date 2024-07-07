import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, Pressable, View, Alert, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Picker } from '@react-native-picker/picker';

const RoutePlannerScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [numStops, setNumStops] = useState('1');
  const [isKosher, setIsKosher] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleCreateRoute = () => {
    Alert.alert('Route Created', `Number of Stops: ${numStops}\nKosher: ${isKosher}\nVegan: ${isVegan}`);
  };

  const handleContinue = () => {
    if (!city || !address) {
      Alert.alert('Incomplete Selection', 'Please select both a city and an address');
      return;
    }
    navigation.navigate('RouteOptions', { city, address, location });
  };

  return (
    <LinearGradient
      colors={['#00796B', '#004D40']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Image source={require('../assets/Eat-Venture.png')} style={styles.logo} />
          <Text style={styles.title}>Select Your Location</Text>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => console.log(location)}
          >
            <Ionicons name="location-sharp" size={24} color="#FFF" />
            <Text style={styles.locationButtonText}>Use Current Location</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>OR</Text>

          <Text style={styles.label}>Select City</Text>
          <View style={styles.autocompleteContainer}>
            <GooglePlacesAutocomplete
              placeholder='Enter City'
              onPress={(data, details = null) => {
                setCity(data.description);
                setAddress(''); // Reset street selection when city changes
              }}
              fetchDetails={true}
              query={{
                key: 'AIzaSyAJLe6L_bHnzqC6K3YO0ET_iw7D1gmo07I',
                language: 'en',
                types: '(cities)',
                componentRestrictions: { country: 'IL' },
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  marginBottom: 20,
                  elevation: 2,
                  width: '100%',
                },
                textInput: {
                  color: '#000',
                  fontSize: 16,
                },
              }}
              id="cityAutocomplete"
            />
          </View>

          <Text style={styles.label}>Select Address</Text>
          <View style={styles.autocompleteContainer}>
            <GooglePlacesAutocomplete
              placeholder='Enter Address'
              onPress={(data, details = null) => {
                setAddress(data.description);
              }}
              fetchDetails={true}
              query={{
                key: 'AIzaSyAJLe6L_bHnzqC6K3YO0ET_iw7D1gmo07I',
                language: 'en',
                types: 'address',
                componentRestrictions: { country: 'IL' },
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  marginBottom: 20,
                  elevation: 2,
                  width: '100%',
                },
                textInput: {
                  color: '#000',
                  fontSize: 16,
                },
              }}
              id="addressAutocomplete"
            />
          </View>

          <Text style={styles.title}>Create Your Route</Text>

          <Text style={styles.label}>Number of Stops</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={numStops}
              style={styles.picker}
              onValueChange={(itemValue) => setNumStops(itemValue)}
            >
              {Array.from({ length: 7 }, (_, i) => (i + 1)).map((num) => (
                <Picker.Item key={num} label={`${num}`} value={`${num}`} />
              ))}
            </Picker>
          </View>
          <Text style={styles.selectedStops}>Selected Stops: {numStops}</Text>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Kosher</Text>
            <Switch
              value={isKosher}
              onValueChange={setIsKosher}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Vegan</Text>
            <Switch
              value={isVegan}
              onValueChange={setIsVegan}
            />
          </View>

          <Pressable
            style={styles.continueButton}
            onPress={handleCreateRoute}
          >
            <Text style={styles.buttonText}>Create Route</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  orText: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#004D40',
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
  },
  picker: {
    color: '#FFFFFF',
  },
  selectedStops: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  switchContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#004D40',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  switchLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#004D40',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00796B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  locationButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#FFF',
  },
  autocompleteContainer: {
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#004D40',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    elevation: 2,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoutePlannerScreen;
