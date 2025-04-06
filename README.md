🛒 E-Commerce Product Search Using Binary Search
This project is a modern, responsive E-Commerce website built with React, TypeScript, Tailwind CSS, and ShadCN UI. It features a highly optimized binary search algorithm to enable fast and efficient product search. Users can browse, search, filter, sort, and manage products in a cart with an intuitive and clean user interface.

🚀 Features
🔍 Binary Search Integration for fast product lookup

🧠 TypeScript-powered for safer, scalable code

💅 Tailwind CSS + ShadCN UI for responsive, modern design

📦 Product Listing with dynamic filtering and sorting

🛍️ Shopping Cart with add/remove functionality

🧩 Modular component architecture for easy maintenance

🧱 Tech Stack
Frontend: React + TypeScript

Styling: Tailwind CSS, ShadCN UI

Search Algorithm: Binary Search (custom implementation)

State Management: React State (can be extended with Context/Redux)

📁 Folder Structure
bash
Copy
Edit
/src
│
├── components
│   ├── SearchBar.tsx         # Input field for search queries
│   ├── ProductList.tsx       # Displays filtered/sorted product list
│   ├── ProductCard.tsx       # UI for individual product cards
│   ├── FilterSort.tsx        # Handles filtering and sorting options
│   └── CartManager.tsx       # Cart logic & display
│
├── utils
│   └── BinarySearch.ts       # Core binary search algorithm
│
├── data
│   └── products.ts           # Static product data (can be replaced with API)
│
└── App.tsx                   # Main app entry point
🧠 How Binary Search is Used
The product list is sorted alphabetically (or by a selected field), and the BinarySearch.ts utility performs a fast lookup to find matching products based on user queries. This dramatically improves performance, especially for large product datasets.

🛠️ Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/ecommerce-binary-search.git
cd ecommerce-binary-search
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the Development Server
bash
Copy
Edit
npm run dev


✨ Future Improvements
Integrate real-time product API

Add user authentication

Enable pagination and wishlist

Implement backend with Node.js/Express

📄 License
This project is open-source and available under the MIT License.

