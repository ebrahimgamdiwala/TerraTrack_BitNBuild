# 🌍 TerraTrack Client

Frontend of **TerraTrack**, an automated planetary health monitoring platform.
This React application provides an **interactive GIS dashboard**, analytics tools, and alert configurations to monitor environmental changes detected from satellite imagery.

---

## ⚡ Tech Stack

* **React (Vite)** → fast, modular frontend framework
* **TailwindCSS** → utility-first styling
* **React Router** → navigation & routing
* **Redux Toolkit** → state management
* **Leaflet.js / Mapbox** → interactive GIS map viewer
* **Recharts** → data visualization

---

## 📂 Folder Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, static resources
│   ├── common/          # Shared UI components (buttons, modals, loaders)
│   ├── components/      # Feature-based components (MapViewer, TimeSlider, ChartPanel)
│   ├── hooks/           # Custom hooks (useAuth, useApi)
│   ├── layouts/         # Layouts (DashboardLayout, AuthLayout)
│   ├── pages/           # Pages (DashboardPage, ReportsPage, LoginPage)
│   ├── provider/        # Context providers (AuthProvider, ThemeProvider)
│   ├── routes/          # Route definitions
│   ├── store/           # Redux slices + store setup
│   ├── utils/           # Helpers (api.js, formatters.js, constants.js)
│   ├── App.jsx          # Root app
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
└── vite.config.js       # Vite configuration
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/terratrack.git
cd terratrack/client
```

### 2. Install Dependencies

```bash
npm install
```

Dependencies include:

```json
"dependencies": {
  "@reduxjs/toolkit": "^1.9.7",
  "react-redux": "^9.0.5",
  "axios": "^1.6.7",
  "react-router-dom": "^6.23.0",
  "leaflet": "^1.9.4",
  "recharts": "^2.10.3"
}
```

### 3. Run Development Server

```bash
npm run dev
```

App will be available at: **`http://localhost:5173/`**

---

## 🔑 Environment Variables

Create a `.env` file in the root of `client/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_MAPBOX_TOKEN=your_mapbox_token
```

---

## 🗺️ Core Features (Frontend)

* **🌍 GIS Dashboard** → Map-based visualization of detected environmental changes
* **📊 Analytics Panel** → Charts & reports on deforestation, urban growth, water changes
* **⏳ Time Slider** → Scroll through satellite data across months/years
* **⚡ Alerts System** → Configure thresholds and receive updates
* **🔐 Authentication** → Login/Register pages with JWT-based flow

---

## 🗄️ Redux Structure

* `store/`

  * `store.js` → root Redux store
  * `slices/authSlice.js` → authentication state
  * `slices/imagerySlice.js` → imagery & change detection state
  * `slices/alertsSlice.js` → user alerts configuration
  * `slices/reportsSlice.js` → analytics/reporting state

---

## 🎨 UI/UX Guidelines

* Minimalist, data-first design
* Dark mode default with light mode toggle
* Consistent use of **common components** (buttons, modals, loaders)
* Components ≤150 LOC for readability

---