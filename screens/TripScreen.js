import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TripScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { routes } = route.params;

  const handleSelectRoute = (route) => {
    navigation.navigate('TripDetails', { route });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Route</Text>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.routeContainer}>
            <Text style={styles.routeName}>{item.name}</Text>
            <Button title="Select" onPress={() => handleSelectRoute(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,} })
