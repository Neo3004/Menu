# 🍽️ Chef's Menu App

A simple React Native application built with **Expo Snack** that allows
a chef to manage a restaurant menu. The app displays the complete menu
organized by courses, shows the total number of menu items, and provides
screens for adding, removing, and filtering menu items.

------------------------------------------------------------------------

## 📱 Overview

The **Chef's Menu App** helps chefs easily create and manage their menu
items in a user-friendly mobile interface.\
- The **Home screen** displays all the menu items grouped by course.\
- The **Add Menu Item** screen allows the chef to add new dishes and
remove existing ones.\
- The **Filter Menu** screen allows guests to view dishes by course
(Starters, Main Courses, or Desserts).

------------------------------------------------------------------------

## 🧭 App Navigation

The app contains three main screens:\
1. **🏠 Home Screen**\
- Displays all menu items organized by course.\
- Shows the total number of menu items.\
- Displays the average price for each course.\
- Has a colored background and a clear layout for readability.\
- Includes a red **"Add Menu Item"** button that navigates to the Add
Menu screen.

2.  **➕ Add Menu Item Screen**
    -   Allows the chef to enter new dishes.\
    -   Each item includes: *Course, Name, Description, and Price.*\
    -   Chef can remove dishes from the menu.\
    -   Updates reflect immediately on the Home Screen.
3.  **🔍 Filter Menu Screen**
    -   Lets guests view only specific categories (Starters, Main
        Courses, Desserts).\
    -   Displays only the selected items from the menu.

------------------------------------------------------------------------

## ⚙️ Dependencies

The following dependencies are required to run this project:

``` bash
"react": "18.2.0",
"react-native": "0.73.4",
"@react-navigation/native": "^6.x",
"@react-navigation/stack": "^6.x",
"react-native-safe-area-context": "4.6.3",
"react-native-screens": "~3.22.0"
```

*(These are usually installed automatically in Expo Snack. You can also
add them manually in the "Dependencies" tab.)*

------------------------------------------------------------------------

## 🚀 How to Run

### Option 1 -- Expo Snack (Online)

1.  Go to <https://snack.expo.dev>\
2.  Paste the full code into the editor.\
3.  Click **Run** and scan the QR code with the Expo Go app on your
    phone.

### Option 2 -- Android Studio

1.  Create a new React Native project.\

2.  Copy the `App.js` code into your main file.\
    https://github.com/Neo3004/Menu.git (Chef branch)
https://m.youtube.com/shorts/P7ZzooQ8Qh4
4.  Install the dependencies listed above using:

    ``` bash
    npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
    ```

5.  Run the app with:

    ``` bash
    npx react-native run-android
    ```

------------------------------------------------------------------------

## 🧑‍🍳 Features

✅ Displays the full restaurant menu by course\
✅ Shows total number of menu items\
✅ Shows average prices per course\
✅ Add or remove menu items easily\
✅ Filter menu items by course\
✅ Colorful, easy-to-read interface

------------------------------------------------------------------------

## 🪄 Future Improvements

✨ Add **data persistence** using `AsyncStorage`\
✨ Add **image upload** for each dish\
✨ Implement **user login** for chefs\
✨ Allow **guests to leave feedback** on menu items

------------------------------------------------------------------------

## 👨‍💻 Developer

Developed by **Neo Ngwako**\
Built with **React Native (Expo Snack)**
