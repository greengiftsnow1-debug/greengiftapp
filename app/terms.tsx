import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function TermsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>📜 Terms & Conditions</Text>

      <Text style={styles.text}>
        1. All plant gifts are non-returnable once delivered.{'\n\n'}
        2. Delivery charges apply based on distance from our store.{'\n\n'}
        3. Payment must be completed before order dispatch.{'\n\n'}
        4. Customized gift orders may take 1–2 extra days for preparation.{'\n\n'}
        5. We do not guarantee flowering or exact plant growth as shown in photos.{'\n\n'}
        6. All transactions are secured and private. We do not store your card or UPI details.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4CAF50',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
