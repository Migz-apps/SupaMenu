import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, QrCode, ArrowLeft, Home } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Sample restaurant data [cite: 17-26]
const restaurants = [
  { id: 1, name: 'Burger Palace', cuisine: 'American', rating: 4.5 },
  { id: 2, name: 'Pizza Heaven', cuisine: 'Italian', rating: 4.8 },
  { id: 3, name: 'Sushi Master', cuisine: 'Japanese', rating: 4.7 },
  { id: 4, name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.6 },
  { id: 5, name: 'Pasta Paradise', cuisine: 'Italian', rating: 4.4 },
  { id: 6, name: 'BBQ Barn', cuisine: 'American', rating: 4.9 },
  { id: 7, name: 'Curry House', cuisine: 'Indian', rating: 4.3 },
  { id: 8, name: 'Noodle Express', cuisine: 'Chinese', rating: 4.5 },
];

const colors = {
  primary: '#FF6B35',
  light: '#F8F9FA',
  gray: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    400: '#9CA3AF',
    500: '#6B7280',
    800: '#1F2937',
  },
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigation = useNavigation();

  // Animation Values [cite: 99-101]
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(20))[0];
  const scaleAnim = useState(new Animated.Value(0.9))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  // Search Logic 
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery]);

  const renderRestaurant = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
      style={styles.restaurantItem}
      activeOpacity={0.7}
    >
      <View style={styles.restaurantIcon}>
        {/* Placeholder House Icon used instead of images  */}
        <Home size={24} color={colors.primary} />
      </View>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
      </View>
      <View style={styles.restaurantRating}>
        <Text style={styles.ratingText}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.mainContent}>
          {/* Header & Search Bar Area */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <ArrowLeft size={28} color="white" />
            </TouchableOpacity>

            <Animated.View style={[styles.searchBarContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <Search size={20} color={colors.gray[500]} />
              <TextInput
                style={styles.textInput}
                placeholder="Search for your preferred restaurant"
                placeholderTextColor={colors.gray[400]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
              />
            </Animated.View>
          </View>

          {/* Body Content */}
          <View style={styles.body}>
            {showResults ? (
              <Animated.View style={[styles.resultsContainer, { opacity: fadeAnim }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.resultsList}>
                  {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map(renderRestaurant)
                  ) : (
                    <Text style={styles.noResultText}>No restaurants found</Text>
                  )}
                </ScrollView>
              </Animated.View>
            ) : (
              <View style={styles.centerContent}>
                <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                  <Text style={styles.orText}>or</Text>
                  <TouchableOpacity 
                    onPress={() => console.log('QR Scan')} 
                    style={styles.qrButton}
                  >
                    <QrCode size={80} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.bottomText}>Scan, Pay & Enjoy!</Text>
                </Animated.View>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35', // Match primary for seamless top
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#FF6B35',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 20,
    width: 40,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: '#1F2937',
    fontSize: 16,
  },
  body: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsList: {
    paddingBottom: 20,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
  },
  restaurantIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#6B7280',
  },
  restaurantRating: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orText: {
    color: '#FF6B35',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  qrButton: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 30,
    alignSelf: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  bottomText: {
    marginTop: 30,
    color: '#FF6B35',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noResultText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 20,
  }
});