import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from '../../firebase/firebase-config';
import { collection, getDoc, doc } from 'firebase/firestore'
import { useNavigation } from "@react-navigation/native";

const ProductDetail = () => {
  const navigation = useNavigation();
  const products = collection(db, "products")
  const route = useRoute();
  const { id } = route.params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState('');

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      try {
        const docRef = doc(products, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setName(data.Name);
          setPrice(data.Price);
          setQuantity(data.Quantity);
          setSize(data.Size);
          console.log(`Name: ${data.name}`)
        } else {
          Alert.alert("Document not found");
        }
      } catch (error) {
        Alert.alert("Error", "Error Fetching Document: " + error.message, [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate('List')
            }
          }
        ]);
      }
    };

    fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: {name}</Text>
      <Text style={styles.title}>Price: {price}</Text>
      <Text style={styles.title}>Quantity: {quantity}</Text>
      <Text style={styles.title}>Size: {size}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  body: {
    fontSize: 18,
  },
});

export default ProductDetail;
