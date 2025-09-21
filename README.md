# 🌍 TerraTrack - Environmental Impact Platform

TerraTrack is a cutting-edge environmental monitoring and AR visualization platform that combines real-time environmental data tracking, immersive 3D plant experiences, and comprehensive campaign management for environmental conservation efforts.

## ✨ Key Features

### 🎯 **Environmental Tracking & Analytics**
- **Interactive Dashboard**: Real-time environmental metrics and data visualization
- **Google Maps Integration**: Interactive mapping with point-and-click environmental analysis
- **Campaign Management**: Create, track, and manage environmental conservation campaigns
- **Donation System**: Integrated Stripe payment system for environmental funding
- **Advanced Analytics**: Charts and reports for environmental impact tracking

### 🌱 **AR Plant Experience**
- **Camera-based AR**: Place virtual plants in real environments using device camera
- **High-quality 3D Models**: Detailed plant models with realistic materials and animations
- **Environmental Benefits**: Learn about each plant's CO₂ removal and air purification capabilities
- **Cross-device Compatibility**: Optimized for both desktop and mobile devices
- **Performance Adaptive**: Automatically adjusts quality based on device capabilities

### 🤖 **AI-Powered Features**
- **TerraBot Chat**: AI assistant for environmental questions and guidance using Google Gemini
- **Smart Analysis**: AI-powered environmental data interpretation
- **Personalized Recommendations**: Tailored suggestions for environmental actions

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19+ with functional components and hooks
- **Build Tool**: Vite (ultra-fast build system with HMR)
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM for SPA navigation
- **State Management**: React Context API + hooks
- **Icons**: Lucide React (modern icon library)

### **3D Graphics & AR**
- **3D Engine**: Three.js (WebGL-based 3D graphics)
- **React Integration**: @react-three/fiber (React renderer for Three.js)
- **3D Utilities**: @react-three/drei (helpers and abstractions)
- **Model Loading**: GLTF/GLB model support with fallbacks
- **AR Technology**: Camera-based AR using getUserMedia API
- **Performance**: Adaptive quality and device-specific optimizations

### **Backend & Database**
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with refresh token system
- **File Upload**: Multer with Cloudinary integration
- **Email Service**: Nodemailer for transactional emails

### **Integrations & APIs**
- **Maps**: Google Maps API for interactive mapping
- **AI**: Google Gemini API for chat functionality  
- **Payments**: Stripe API for donation processing
- **Charts**: Chart.js with React wrapper for data visualization
- **Animations**: Framer Motion for smooth transitions

### **Development Tools**
- **Package Manager**: npm
- **Code Quality**: ESLint with custom configuration
- **Version Control**: Git
- **Development**: Hot Module Replacement (HMR)
- **Build**: Optimized production builds with code splitting

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud)
- Git for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/ebrahimgamdiwala/TerraTrack_BitNBuild.git
   cd TerraTrack_BitNBuild
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` files in both client and server directories:
   
   **Client (.env):**
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```
   
   **Server (.env):**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

### **Running the Application**

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd client  
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 📱 Features Overview

### **Dashboard**
- Environmental metrics visualization
- Interactive charts and graphs
- Campaign progress tracking
- Real-time data updates

### **AR Plants Experience**
- Camera-based augmented reality
- High-quality 3D plant models
- Environmental impact calculations
- Mobile-optimized performance

### **Campaign Management**
- Create environmental campaigns
- Track donations and progress
- Share campaign details
- Analytics and reporting

### **TerraBot Chat**
- AI-powered environmental assistant
- Natural language processing
- Contextual responses
- Environmental education

## 🏗️ Project Structure

```
TerraTrack_BitNBuild/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages/routes
│   │   ├── services/      # API services and utilities
│   │   ├── context/       # React context providers
│   │   ├── routes/        # Route configurations
│   │   └── utils/         # Helper functions
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── server/                # Node.js backend application
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middleware
│   ├── config/           # Database and email config
│   ├── utils/            # Backend utilities
│   └── package.json      # Backend dependencies
└── README.md             # Project documentation
```

## 🔧 Available Scripts

### **Frontend (client/)**
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Backend (server/)**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run debug` - Start with debugging enabled

## 🌐 Browser Support

- **Desktop**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: Chrome Mobile, Safari Mobile, Samsung Internet
- **WebGL**: Required for 3D graphics and AR features
- **Camera**: Required for AR plant placement feature

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email ebrahimgamdiwala@example.com or create an issue in the GitHub repository.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **API Docs**: [Coming Soon]

---

Made with 🌱 for a greener planet by the TerraTrack team
