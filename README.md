# SupaMenu - Food Delivery Mobile App

A modern, smooth, and responsive food delivery mobile application built with React Native and Expo, featuring Tailwind CSS for styling and beautiful animations throughout.

## 🚀 Features

### Core Functionality
- **User Authentication**: Registration, login, and social media integration
- **Restaurant Discovery**: Browse nearby restaurants with detailed information
- **Menu & Ordering**: Full menu browsing with item customization
- **Shopping Cart**: Add/remove items, quantity management, and real-time total calculation
- **Checkout Process**: Multiple payment methods, delivery address management
- **Order Tracking**: Real-time order status updates and delivery tracking
- **Order History**: Complete order history with detailed receipts

### User Experience
- **Smooth Animations**: Carefully crafted transitions and micro-interactions
- **Responsive Design**: Optimized for all screen sizes and orientations
- **Intuitive Navigation**: Bottom tab navigation and gesture-based navigation
- **Search & Filters**: Advanced restaurant and food search capabilities
- **QR Code Scanning**: Quick restaurant access via QR codes
- **Push Notifications**: Order updates, promotions, and delivery alerts

### Account Management
- **Profile Management**: Personal information and preferences
- **Address Management**: Multiple delivery addresses with default selection
- **Payment Methods**: Credit cards and mobile money integration
- **Settings**: App preferences, notifications, and privacy controls

## 🛠 Technology Stack

- **Framework**: React Native with Expo
- **Styling**: Tailwind CSS (NativeWind)
- **Navigation**: React Navigation 6
- **Icons**: Lucide React Native
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler
- **Safe Areas**: React Native Safe Area Context

## 📱 Screens

### Authentication Flow
- Welcome Screen
- Login Screen
- Registration Screen

### Main Application
- Search/QR Scan Screen
- Home/Nearby Restaurants
- Restaurant Details
- Menu Categories
- Item Details
- Shopping Cart
- Checkout Process
- Order Tracking
- Order History

### User Account
- Profile Screen
- Settings
- Payment Methods
- Address Management
- Notifications
- Help & Support

## 🎨 Design System

### Colors
- **Primary**: #FF6B35 (Orange)
- **Secondary**: #FF8C42 (Light Orange)
- **Accent**: #FFA726 (Amber)
- **Dark**: #2D3436 (Charcoal)
- **Light**: #F8F9FA (Off White)

### Typography
- Clean, modern typography optimized for mobile readability
- Consistent font weights and sizes throughout the app
- High contrast for accessibility

### Components
- Reusable UI components with consistent styling
- Smooth hover states and transitions
- Loading states and error handling
- Empty states with helpful guidance

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Expo CLI
- React Native development environment

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/supamenu.git
   cd supamenu
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web (for development)
   npm run web
   ```

### Testing Commands

```bash
# Start the Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Build for production
npm run build

# Run tests (when implemented)
npm test

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 📁 Project Structure

```
supamenu/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── RestaurantCard.js
│   ├── constants/           # App constants and colors
│   │   └── colors.js
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.js
│   │   └── BottomTabNavigator.js
│   └── screens/            # App screens
│       ├── WelcomeScreen.js
│       ├── LoginScreen.js
│       ├── HomeScreen.js
│       ├── CartScreen.js
│       └── ...
├── App.js                  # Main app entry point
├── package.json            # Dependencies and scripts
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md              # This file
```

## 🎯 Key Features Highlight

### Smooth Animations
- Fade-in effects for screen transitions
- Slide animations for list items
- Spring animations for interactive elements
- Loading states with skeleton screens

### Responsive Design
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Optimized for both portrait and landscape modes
- Proper safe area handling

### User Experience
- Intuitive navigation flow
- Real-time feedback for user actions
- Error handling with helpful messages
- Offline capability considerations

## 🔧 Configuration

### Tailwind CSS
The app uses NativeWind for Tailwind CSS support in React Native. Configuration is in `tailwind.config.js`.

### Navigation
React Navigation 6 is configured for both stack and bottom tab navigation with smooth transitions.

### Animations
React Native Reanimated 3 provides smooth 60fps animations throughout the app.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Expo team for the amazing framework
- Tailwind CSS team for the utility-first CSS framework
- Lucide for the beautiful icon set
- React Navigation team for the navigation solution

## 📞 Support

For support, please email support@supamenu.rw or create an issue in the GitHub repository.

---

Made with ❤️ in Rwanda 🇷🇼
