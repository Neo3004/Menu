// App.tsx
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

const Stack = createStackNavigator();

// 🏠 Home Screen – Displays the prepared menu
function HomeScreen({ navigation, route }) {
  const [menuItems, setMenuItems] = useState([]);

  // If a new item is passed back from Add screen, add it
  React.useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prev) => [...prev, route.params.newItem]);
    }
  }, [route.params?.newItem]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardCourse}>{item.course}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
      <Text style={styles.cardPrice}>R {item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>🍽️ Chef’s Menu</Text>
        <Text style={styles.totalCount}>
          Total Menu Items: {menuItems.length}
        </Text>

        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>No menu items added yet.</Text>
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddMenuItem", { existing: menuItems })
          }
        >
          <Text style={styles.addButtonText}>➕ Add Menu Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ➕ Add Menu Item Screen
function AddMenuItemScreen({ navigation }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (!name || !course || !description || !price) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      course,
      description,
      price: parseFloat(price).toFixed(2),
    };

    navigation.navigate("Home", { newItem });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Add New Menu Item</Text>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Course (Starter, Main, Dessert)"
          value={course}
          onChangeText={setCourse}
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Save Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "#777", marginTop: 8 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.addButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AddMenuItem"
          component={AddMenuItemScreen}
          options={{ title: "Add Menu Item" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f7f7fb",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#2e86de",
    marginBottom: 16,
  },
  totalCount: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#2e86de",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardCourse: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#555",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e86de",
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  multiline: {
    height: 70,
    textAlignVertical: "top",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginBottom: 16,
  },
});

