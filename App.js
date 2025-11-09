//App tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();

export default function App() {
  const [menu, setMenu] = useState([
    // 🥗 Starters
    {
      name: "Hot Honey Beetroot",
      course: "Starter",
      description:
        "Spiced labneh, macadamia nuts, radish, and fresh herbs.",
      price: 100,
    },
    {
      name: "Burrata & Toast",
      course: "Starter",
      description:
        "Red pepper romesco, heritage tomatoes, pickled onion, and charred sourdough.",
      price: 110,
    },
    {
      name: "Smoked Salmon Tartare",
      course: "Starter",
      description:
        "White asparagus, chive mayo, and artisanal sourdough toast.",
      price: 120,
    },

    // 🥩 Mains
    {
      name: "Pepper-Crusted Beef Fillet",
      course: "Main",
      description:
        "Carrot purée, charred baby onions, mushrooms, coffee cream sauce, and crispy onions.",
      price: 220,
    },
    {
      name: "Miso-Glazed Salmon",
      course: "Main",
      description:
        "Plantain arancini, cauliflower & biltong rice, pea purée, and miso sauce.",
      price: 230,
    },
    {
      name: "Masala Cauliflower (Vegetarian)",
      course: "Main",
      description:
        "Minted labneh, sultana chutney, salsa verde, besan sev, and pickled red cabbage.",
      price: 200,
    },

    // 🍰 Desserts
    {
      name: "Chocolate Symphony",
      course: "Dessert",
      description:
        "Chocolate genoise, banana ganache, chocolate feuilletine, and hazelnut ice cream.",
      price: 90,
    },
    {
      name: "Mango Panna Cotta",
      course: "Dessert",
      description:
        "Fresh mint, berry medley, and bright passionfruit sauce.",
      price: 85,
    },
    {
      name: "Deconstructed Lemon Tart",
      course: "Dessert",
      description:
        "Lemon curd, confit zest, yuzu gel, and crispy meringues.",
      price: 95,
    },
  ]);

  // Add & remove menu items
  const addMenuItem = (name, course, description, price) => {
    if (!name || !course || !price) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    setMenu([
      ...menu,
      { name, course, description, price: parseFloat(price) },
    ]);
  };

  const removeMenuItem = (index) => {
    const updated = [...menu];
    updated.splice(index, 1);
    setMenu(updated);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#FF7043" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} menu={menu} />}
        </Stack.Screen>
        <Stack.Screen name="Manage Menu">
          {(props) => (
            <ManageMenuScreen
              {...props}
              menu={menu}
              addMenuItem={addMenuItem}
              removeMenuItem={removeMenuItem}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Filter Menu">
          {(props) => <FilterScreen {...props} menu={menu} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation, menu }) {
  const starters = menu.filter((i) => i.course === "Starter");
  const mains = menu.filter((i) => i.course === "Main");
  const desserts = menu.filter((i) => i.course === "Dessert");

  const avg = (arr) =>
    arr.length > 0
      ? (arr.reduce((sum, i) => sum + i.price, 0) / arr.length).toFixed(2)
      : "0.00";

  return (
    <LinearGradient colors={["#FFF3E0", "#FFE0B2", "#FFCC80"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>👨‍🍳 Chef’s Menu</Text>
        <Text style={styles.subtitle}>Total Items: {menu.length}</Text>

        <CourseSection title="🥗 Starters" avg={avg(starters)} items={starters} />
        <CourseSection title="🥩 Main Courses" avg={avg(mains)} items={mains} />
        <CourseSection title="🍰 Desserts" avg={avg(desserts)} items={desserts} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.manageButton}
            onPress={() => navigation.navigate("Manage Menu")}
          >
            <Text style={styles.addButtonText}>🍳 Manage Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate("Filter Menu")}
          >
            <Text style={styles.addButtonText}>🔍 Filter Menu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function CourseSection({ title, avg, items }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>
        {title} (Avg: R{avg})
      </Text>
      {items.map((item, index) => (
        <View key={index} style={styles.menuCard}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuDescription}>{item.description}</Text>
          <Text style={styles.menuPrice}>R{item.price}</Text>
        </View>
      ))}
    </View>
  );
}

function ManageMenuScreen({ menu, addMenuItem, removeMenuItem }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  return (
    <LinearGradient colors={["#FFE0B2", "#FFB74D", "#FFA726"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🍳 Manage Menu</Text>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Course (Starter/Main/Dessert)"
          value={course}
          onChangeText={setCourse}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price (e.g., 120)"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addMenuItem(name, course, description, price);
            setName("");
            setCourse("");
            setDescription("");
            setPrice("");
          }}
        >
          <Text style={styles.addButtonText}>Add Menu Item</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Current Menu Items</Text>
        {menu.map((item, index) => (
          <View key={index} style={styles.menuRow}>
            <Text style={styles.menuItem}>
              {item.name} ({item.course}) - R{item.price}
            </Text>
            <TouchableOpacity
              onPress={() => removeMenuItem(index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

function FilterScreen({ menu }) {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? menu : menu.filter((item) => item.course === filter);

  return (
    <LinearGradient colors={["#FFF3E0", "#FFE0B2", "#FFCC80"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>🔍 Filter by Course</Text>
        <View style={styles.filterRow}>
          {["All", "Starter", "Main", "Dessert"].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButtonSmall, filter === f && styles.filterActive]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === f && { color: "#fff", fontWeight: "bold" },
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuCard}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
              <Text style={styles.menuPrice}>R{item.price}</Text>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 20 },
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
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D84315",
    marginTop: 20,
  },
  menuCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    elevation: 2,
  },
  menuItemName: { fontWeight: "bold", fontSize: 16, color: "#3E2723" },
  menuDescription: { fontSize: 14, color: "#5D4037", marginVertical: 4 },
  menuPrice: { fontSize: 15, color: "#BF360C", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#E64A19",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#D7CCC8",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  removeButton: {
    backgroundColor: "#D84315",
    padding: 8,
    borderRadius: 8,
  },
  removeButtonText: { color: "#fff", fontSize: 14 },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  filterButtonSmall: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E64A19",
  },
  filterActive: { backgroundColor: "#E64A19" },
  filterButtonText: { color: "#E64A19", fontSize: 16 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  manageButton: {
    backgroundColor: "#E64A19",
    padding: 12,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: "#F57C00",
    padding: 12,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
});

