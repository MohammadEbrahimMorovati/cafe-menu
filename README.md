# Café Menu App (React + JSON Server)

This project is an online café menu built with **React** and **JSON Server**. Users can browse different categories of food, drinks, and desserts with detailed information.

## 📁 Project Structure

```
├── db.json              # Database (categories and products)
├── server.js            # JSON server setup
├── package.json         # Project dependencies and scripts
├── public/              # Static public files (images, icons, etc.)
├── src/                 # Main React source code
│   ├── api/             # API request handlers
│   ├── assets/          # Images, fonts, and static assets
│   ├── components/      # Reusable React components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application pages (Home, Categories, Product)
│   ├── service/         # Utility services (e.g., HTTP clients)
│   ├── theme/           # Styles, colors, typography, and theme configuration
```

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cafe-menu.git
cd cafe-menu
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start JSON Server

```bash
npm start
```

The server will run on **http://localhost:4000**.

You can access the API endpoints:

```
http://localhost:4000/products
http://localhost:4000/categories
```

## 📦 Sample Data

The `db.json` file includes over 50 categories and products with the following fields:

- **name**: Product name
- **description**: Short description
- **price**: Product price
- **image**: Image path
- **categoryId**: Category ID

## 🛠️ Recommended Improvements

- Add **React Router** for multi-page navigation (Home, Category, Product details)
- Implement **product filtering and search**
- Add **shopping cart** and order management
- Use UI libraries like **TailwindCSS**, **MUI**, or **Chakra UI**
- Implement an **admin dashboard** to add/remove products

## ⚙️ Technologies

- React (with Vite)
- JSON Server
- Node.js

## 📄 License

**MIT**

---
> Built with ❤️ for smart café projects and learning purposes.