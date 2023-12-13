import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const ProductList = () => {
  const navigation = useNavigation();
  const [productsList, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  const DeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(productsCollectionRef, id));
      Alert.alert("Success", "Data Successfully Deleted", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('List')
          }
        }
      ]);
    } catch (error) {
      Alert.alert("Error", "Error Removing Document: " + error.message, [
        {
          text: "OK",
          onPress: () => {
            // Handle the OK button press, if needed
          }
        }
      ]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productsCollectionRef);
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(data);
        console.log(`Products: ${data}`)
      } catch (error) {
        Alert.alert("Error", "Error Getting Document: " + error.message, [
          {
            text: "OK",
            onPress: () => {
              // Handle the OK button press, if needed
            }
          }
        ]);
      }
    };

    fetchProducts();
  }, [productsList]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products List</Text>
      <FlatList
        data={productsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.title}>Name: {item.Name}</Text>
            <Text style={styles.title}>Price: {item.Price}</Text>
            <Text style={styles.title}>Quantity: {item.Quantity}</Text>
            <Text style={styles.title}>Size: {item.Size}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Show', { id: item.id })}
            >
              <Text style={styles.buttonText}>Show</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Edit', { id: item.id })}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => DeleteProduct(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Create')}
      >
        <Text style={styles.buttonText}>Create New</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  productItem: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ProductList;