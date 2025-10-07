// App.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
  createdAt: number;
};

const COURSES = ["Starters", "Mains", "Dessert"];

export default function App(){
  const [menuItems, setMenuItems] = useState>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceText, setPriceText] = useState("");
  const [course, setCourse] = useState(COURSES[0]);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPriceText("");
    setCourse(COURSES[0]);
    setShowCourseDropdown(false);
  };//closes only resetForm
  

return(
  <div>
      <h1>Menu Form</h1>
      <input
        type="text"
        placeholder="Dish Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={priceText}
        onChange={(e) => setPriceText(e.target.value)}
      />
      <select value={course} onChange={(e) => setCourse(e.target.value)}>
        {COURSES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
<button
        onClick={() => {
          if (name && description && priceText) {
            const newItem = { name, description, price: priceText, course };
            setMenuItems([...menuItems, newItem]);
            resetForm();
          }
        }}
      >
        Add Item
      </button>
      <button onClick={resetForm}>Reset</button>

      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <b>{item.name}</b> ({item.course}) - {item.description} : {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

  const addMenuItem = () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter the dish name.");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Validation", "Please enter a description.");
      return;
    }
    const parsedPrice = parseFloat(priceText);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      Alert.alert("Validation", "Please enter a valid non-negative price.");
      return;
    }

    // Animate list change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newItem: MenuItem = {
      id: String(Date.now()),
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsedPrice,
      createdAt: Date.now(),
    };

    setMenuItems((prev) => [newItem, ...prev]);
    resetForm();
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCourse}>{item.course}</Text>
        </View>
        <Text style={styles.cardDesc}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>R {item.price.toFixed(2)}</Text>
          <Text style={styles.cardDate}>
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  };
  //return MUST be inside App function, not after a stray '}'
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
       
         class KeyboardAvoidingView>
           KeyboardAvoidingView:true
         
class SafeAreaView>
   SafeAreaView>
      );


const styles = StyleSheet.create({
  Safe: {
    flex: 1,
    backgroundColor: "#f7f7fb",
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    marginTop: 8,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e2ea",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  multiline: {
    minHeight: 70,
  },
  courseSelector: {
    borderWidth: 1,
    borderColor: "#e2e2ea",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  courseSelectorText: {
    fontSize: 16,
  },
  courseSelectorArrow: {
    fontSize: 12,
    color: "#666",
  },
  courseDropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e2e2ea",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  courseOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f3",
  },
  courseOptionText: {
    fontSize: 15,
  },
  addButton: {
    marginTop: 12,
    backgroundColor: "#2e86de",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#ececf2",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  totalCount: {
    fontSize: 16,
    color: "#666",
    alignSelf: "center",
  },
  list: {
    paddingBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f3",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  cardCourse: {
    fontSize: 13,
    color: "#666",
  },
  cardDesc: {
    color: "#444",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardPrice: {
    fontWeight: "700",
    color: "#111",
  },
  cardDate: {
    color: "#888",
    fontSize: 12,
  },
  empty: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
