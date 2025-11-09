# 🍽️ Chef’s Menu App

A React Native app built with Expo that allows a chef to manage and display a restaurant menu.  
The app separates the chef and guest functionalities:
- The **Home Screen** displays the complete menu for guests.  
- The **Add Menu Screen** allows the chef to add and remove menu items.  
- The **Filter Screen** allows guests to view specific menu courses (Starters, Main Courses, or Desserts).  

---

## 📱 Features

### 👨‍🍳 Chef Features
- Add new menu items (name, description, price, and course).
- Remove existing menu items.
- Menu items are stored in an array within the app.

### 🍴 Guest Features
- View the full menu (Starters, Mains, Desserts) on the **Home Screen**.
- Filter menu items by course type on a separate screen.
- See the **average price** for each course (Starters, Mains, Desserts).

---

## 🧮 Average Price Calculation
The home screen displays the average price of all items in each category:
- 🥗 **Starters**: Average of all starter prices  
- 🥩 **Main Courses**: Average of all main course prices  
- 🍰 **Desserts**: Average of all dessert prices  

These values update dynamically when the chef adds or removes menu items.

---

## 🧭 App Navigation

| Screen | Description |
|--------|--------------|
| **Home Screen** | Displays the full menu and average prices. |
| **Add Menu Screen** | Allows the chef to add or remove menu items. |
| **Filter Screen** | Lets guests filter the menu by course type. |

Navigation between screens is handled using **React Navigation Stack**.

---

## 🎨 Styling
- The app uses warm **orange and cream tones** for a modern dining theme.  
- Clear headers, emojis, and section spacing enhance readability.  
- Responsive layout suitable for both iOS and Android.

---

## ⚙️ Technologies Used

| Library | Purpose |
|----------|----------|
| **React Native** | Core framework |
| **Expo** | For running and testing the app |
| **React Navigation** | Handles screen navigation |
| **React Hooks (useState, useEffect)** | State management |

---

## 🧩 Dependencies

Ensure these dependencies are installed in your project:

```bash
expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/stack
```

If using Expo Snack, add them under **Dependencies** in the editor.

---

## 🚀 How to Run the App

1. Open [https://snack.expo.dev](https://snack.expo.dev).
2. Paste the full app code (provided in one file).
3. Add the above dependencies.
4. Run it on your **iOS** or **Android** device.

---

## 🧑‍💻 Developer Notes
- Menu items are initialized with default starter, main, and dessert examples.  
- New items are appended to the correct category.  
- Data persists during app use (not across app restarts).  

---

## 🏁 Example Default Menu

### 🥗 Starters
- Hot Honey Beetroot — R100  
- Burrata & Toast — R110  
- Smoked Salmon Tartare — R120  

### 🥩 Main Courses
- Pepper-Crusted Beef Fillet — R220  
- Miso-Glazed Salmon — R230  
- Masala Cauliflower (Vegetarian) — R200  

### 🍰 Desserts
- Chocolate Symphony — R90  
- Mango Panna Cotta — R85  
- Deconstructed Lemon Tart — R95  
