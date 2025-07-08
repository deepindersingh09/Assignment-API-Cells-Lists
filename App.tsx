import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');

  const getFact = async () => {
    if (!month || !day || parseInt(day) < 1 || parseInt(day) > 31) return;

    try {
      const response = await fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.EXPO_PUBLIC_API_HOST!,
          'x-rapidapi-key': process.env.EXPO_PUBLIC_API_KEY!,
        }
      });

      const result = await response.text();
      setFact(result);
    } catch (error) {
      setFact("Failed to load fact.");
    }
  };

  useEffect(() => {
    getFact();
  }, [month, day]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        {fact !== '' && <Text style={styles.factBox}>{fact}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Month"
          keyboardType="numeric"
          onChangeText={(text) => setMonth(text)}
          value={month}
        />

        <TextInput
          style={styles.input}
          placeholder="Day"
          keyboardType="numeric"
          onChangeText={(text) => setDay(text)}
          value={day}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inner: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  factBox: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    width: '100%',
    marginBottom: 15,
    fontSize: 16,
  },
});
