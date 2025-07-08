import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
  //This is assignment 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.heading}>
          Choose a month and enter a day to get an interesting fact!
        </Text>

        {fact !== '' && (
          <View>
            <Text style={styles.factBox}>{fact}</Text>
          </View>
        )}  


        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={month}
            onValueChange={(value) => setMonth(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Month" value="" />
            <Picker.Item label="January" value="1" />
            <Picker.Item label="February" value="2" />
            <Picker.Item label="March" value="3" />
            <Picker.Item label="April" value="4" />
            <Picker.Item label="May" value="5" />
            <Picker.Item label="June" value="6" />
            <Picker.Item label="July" value="7" />
            <Picker.Item label="August" value="8" />
            <Picker.Item label="September" value="9" />
            <Picker.Item label="October" value="10" />
            <Picker.Item label="November" value="11" />
            <Picker.Item label="December" value="12" />
          </Picker>
        </View>

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
    gap: 10, 
  },

  factBox: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
    heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
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
  pickerWrapper: {
  width: '100%',
  borderWidth: 1,
  borderColor: '#999',
  borderRadius: 6,
  marginBottom: 15,
  backgroundColor: '#fff',
  overflow: 'hidden',
},

picker: {
  height: 50,
  width: '100%',
}

});
