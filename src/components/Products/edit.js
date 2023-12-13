import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { db } from '../../firebase/firebase-config';
import { collection, getDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

function EditProduct() {
  const route = useRoute();
  const navigation = useNavigation();
  const products = collection(db, "products")
  const { id } = route.params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(products, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setName(data.Name)
          setPrice(data.Price)
          setQuantity(data.Quantity)
          setSize(data.Size)
        } else {
          Alert.alert("Document not found");
        }
      } catch (error) {
        Alert.alert("Error", `Error fetching document: ${id} ` + error.message, [
          {
            text: "OK",
            onPress: () => {
              // Handle the OK button press, if needed
            }
          }
        ]);
      }
    };

    fetchData();
  }, [id]);

  const updateProduct = async () => {
    try {
      const docRef = doc(products, id);
      await updateDoc(docRef, {
        Name: name,
        Price: price,
        Quantity: quantity,
        Size: size,
      });

      Alert.alert("Success", "Data Successfully Updated", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('List')
          }
        }
      ]);
      // You can navigate back or perform other actions here
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", `Error updating document: ${id} ` + error.message, [
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

      <Button title="Update" onPress={updateProduct} />
    </View>
  );
}

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

export default EditProduct;
