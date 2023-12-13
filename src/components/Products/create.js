import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert, Keyboard } from 'react-native';
import { db } from '../../firebase/firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";

const CreateProduct = () => {
  const navigation = useNavigation();
  const Products = collection(db, 'products'); 
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState('');

  const createProduct = async () => {
    Keyboard.dismiss();
    try {
      // Add data to the Firestore
      await addDoc(Products, {
        Name: name,
        Price: price,
        Quantity: quantity,
        Size: size,
      });
      Alert.alert("Success", "Data Successfully Created", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('List')
          }
        }
      ]);
      setName("")
      setPrice(0)
      setQuantity(0)
      setSize("")
     
    } catch (error) {
      Alert.alert("Error", "Error adding document: " + error.message, [
        {
          text: "OK",
          onPress: () => {
            // Handle the OK button press, if needed
          }
        }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
        required
      />

      <TextInput
        style={styles.input}
        placeholder="Enter a price"
        keyboardType="numeric"
        onChangeText={(text) => setPrice(text)}
        value={price}
      />  

      <TextInput
        style={styles.input}
        placeholder="Enter a quantity"
        keyboardType="numeric"
        onChangeText={(text) => setQuantity(text)}
        value={quantity}
      /> 

      <TextInput
        style={styles.input}
        placeholder="Size"
        onChangeText={(text) => setSize(text)}
        value={size}
        required
      />

      <Button title="Create" onPress={createProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default CreateProduct;
