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

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
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
  };

  const addMenuItem = () => {
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

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <Text style={styles.header}>Add Menu Item</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Dish Name"
              value={name}
              onChangeText={setName}
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
              value={priceText}
              onChangeText={setPriceText}
            />

            <TouchableOpacity
              style={styles.courseSelector}
              onPress={() => setShowCourseDropdown(!showCourseDropdown)}
            >
              <Text style={styles.courseSelectorText}>{course}</Text>
              <Text style={styles.courseSelectorArrow}>▼</Text>
            </TouchableOpacity>
  {showCourseDropdown && (
              <View style={styles.courseDropdown}>
                {COURSES.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={styles.courseOption}
                    onPress={() => {
                      setCourse(c);
                      setShowCourseDropdown(false);
                    }}
                  >
                    <Text style={styles.courseOptionText}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Menu Items</Text>
  <Text style={styles.totalCount}>Total: {menuItems.length}</Text>
</View>

            <View style={styles.empty}>
              <Text style={styles.emptyText}>No items yet.</Text>
            </View>
          ) : (
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
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
  input: {
    borderWidth: 1,
    borderColor: "#e2e2ea",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
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
  sectionHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
totalCount: {
  fontSize: 16,
  color: "#555",
  fontWeight: "600",
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
});
 

