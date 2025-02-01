# ITG Third Rotation (React Native)

## 📌 Project Overview
This repository contains two React Native applications:  

### 🕒 SessionTime
A session management app that allows users to:
- Specify a task and set a session duration.
- Start and manage tasks efficiently.

### 🛒 Elevation (E-Commerce App)
A full-featured e-commerce application with various functionalities for seamless online shopping.

---

## 🚀 Features & Functionality

### 🔐 Authentication
- **Login**: Registered users can securely log in using their email and password.
- **Registration**: New users can easily sign up with minimal required information.

### 🏠 Home
- Users can **search for products** directly from the top search bar or through the bottom navigation bar.
- **Product listings** are fetched and displayed with **pagination** to enhance user experience.
- Clicking on a product navigates to the **Product Details Page**.
- Users can **filter products** based on various attributes.
- Bottom **navigation bar** allows easy access to:
  - 🏠 Home
  - 🔍 Search
  - ❤️ Favorites
  - 🛒 Cart
  - 👤 Account

### 🔎 Search
- Users can search for products via the **search bar** on the search screen.
- The app begins fetching results **after typing the second letter**.
- **Top five products** matching the search query will be displayed.
- Clicking on a product reveals **detailed information**.
- To see **all relevant products**, users can click the **magnify icon** next to the search bar.

### 📄 Searched Products Page
- Displays **all products** found for the search query.
- Allows **sorting & filtering**:
  - **Sort by:** Price (High to Low, Low to High), Relevance.
  - **Filter by:** Price range.

### 🛍️ Product Details Page (PDP)
- Displays **complete product details** including title, price, description, and more.
- Users can:
  - **Add products to the cart**.
  - **Adjust quantity** (increase/decrease).

### ❤️ Favorites
- Users can **add products to favorites** by tapping the heart icon.
- A dedicated **Favorites screen** displays all saved products.

### 🛒 Cart & Cart Screen
- Users can **add products to the cart**.
- Inside the **cart screen**, users can:
  - ✅ Increase or decrease product quantity.
  - ❌ Remove products from the cart.
  - 🏷️ View **total cost** (including product prices, taxes, and shipping).
  - 🛍️ Proceed to **Checkout**.

### 💳 Checkout
- Users can **review and modify their address** before placing an order.
- Choose **payment method**:
  - **Card Payment**: Modify and switch payment cards.
  - **Cash on Delivery**.
  - **Apple Pay** (if applicable).
- **Final order summary** with total cost.
- Option to **place the order**.

### 👤 Account Management
Users can manage their personal details and settings:
- **View & update personal information** (Name, DOB, Email, Phone, Gender).
- **Manage payment methods**:
  - View saved cards.
  - Add a new payment card.
- **Manage delivery addresses**:
  - View saved addresses.
  - Add new addresses.
- **View order history**:
  - See all previously placed orders.
- **Logout**:
  - Users can log out easily from the account settings.

---

## 🛠️ Tech Stack & Tools
This app is built using the following technologies:
- **React Native** 📱 (for cross-platform mobile development).
- **Redux** 🎛️ (state management for handling global application data).
- **dummyJSON API** 🗄️ (backend for fetching product data).

## 📖 Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**
- **npm or yarn** 
- **React Native CLI** 
- **Android Studio** (For Android development) or **Xcode** (For iOS development)
