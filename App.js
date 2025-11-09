//App tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const starters = [
    "Hot Honey Beetroot",
    "Burrata & Toast",
    "Smoked Salmon Tartare",
  ];

  const mains = [
    "Pepper-Crusted Beef Fillet",
    "Miso-Glazed Salmon",
    "Masala Cauliflower (Vegetarian)",
  ];

  const desserts = [
    "Chocolate Symphony",
    "Mango Panna Cotta",
    "Deconstructed Lemon Tart",
  ];

  const totalItems = starters.length + mains.length + desserts.length;

  return (
    <LinearGradient
      colors={["#FFF3E0", "#FFE0B2", "#FFCC80"]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>👨‍🍳 Chef’s Menu</Text>
        <Text style={styles.subtitle}>Total Menu Items: {totalItems}</Text>

        <Text style={styles.sectionTitle}>🥗 Starters</Text>
        {starters.map((item, index) => (
          <Text key={index} style={styles.menuItem}>
            • {item}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>🥩 Main Courses</Text>
        {mains.map((item, index) => (
          <Text key={index} style={styles.menuItem}>
            • {item}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>🍰 Desserts</Text>
        {desserts.map((item, index) => (
          <Text key={index} style={styles.menuItem}>
            • {item}
          </Text>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddItem")}
        >
          <Text style={styles.addButtonText}>➕ Add Menu Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

function AddItemScreen({ navigation }) {
  const [itemName, setItemName] = useState("");

  const handleAdd = () => {
    if (itemName.trim() === "") {
      alert("Please enter a menu item name.");
      return;
    }
    alert(`✅ "${itemName}" added to the menu!`);
    setItemName("");
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={["#FFE0B2", "#FFB74D", "#FFA726"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>➕ Add a New Menu Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new item name"
          placeholderTextColor="#6D4C41"
          value={itemName}
          onChangeText={setItemName}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#FF7043" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AddItem"
          component={AddItemScreen}
          options={{ title: "Add Menu Item" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4E342E",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6D4C41",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D84315",
    marginTop: 15,
  },
  menuItem: {
    fontSize: 16,
    color: "#3E2723",
    marginLeft: 10,
    marginVertical: 4,
  },
  addButton: {
    backgroundColor: "#E64A19",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D7CCC8",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
});
