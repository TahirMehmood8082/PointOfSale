import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProductScreen from "../screens/ProductScreen";
import CreateProduct from "../components/Products/create";
import ProductList from "../components/Products/list";
import ProductDetail from "../components/Products/show";
import EditProduct from "../components/Products/edit";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create"
          component={CreateProduct}
          options={{ headerShown: true, title: 'Create Product' , 
          headerStyle: {
            backgroundColor: 'green', 
          },
          headerTitleAlign: 'center', 
        }}
        />
        <Stack.Screen
          name="List"
          component={ProductList}
          options={{ headerShown: true, title: 'Products List', 
          headerStyle: {
            backgroundColor: 'green', 
          },
          headerTitleAlign: 'center', 
        }}
        />
        <Stack.Screen
          name="Show"
          component={ProductDetail}
          options={{ headerShown: true, title: 'Product Detail' , 
          headerStyle: {
            backgroundColor: 'green', 
          },
          headerTitleAlign: 'center', 
        }}
        />
        <Stack.Screen
          name="Edit"
          component={EditProduct}
          options={{ headerShown: true, title: 'Edit Product' , 
          headerStyle: {
            backgroundColor: 'green', 
          },
          headerTitleAlign: 'center', 
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});