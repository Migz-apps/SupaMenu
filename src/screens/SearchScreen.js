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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, QrCode, ArrowLeft, Home } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, borderRadius, fontSize, shadow } from '../utils/styles';

const { width, height } = Dimensions.get('window');

// Sample restaurant data
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

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigation = useNavigation();
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
      setShowResults(true);
    } else {
      setFilteredRestaurants([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Home');
    }
  };

  const handleRestaurantSelect = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const handleQRScan = () => {
    console.log('QR Scan');
    navigation.navigate('Home');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderRestaurant = (item, index) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleRestaurantSelect(item)}
      style={styles.restaurantItem}
      activeOpacity={0.7}
    >
      <View style={styles.restaurantIcon}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flex}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>9:41</Text>
            <View style={styles.statusIcons}>
              <View style={[styles.statusIcon, { backgroundColor: '#fff' }]}></View>
              <View style={[styles.statusIcon, { backgroundColor: '#fff' }]}></View>
              <View style={[styles.statusIcon, { width: spacing[6], height: spacing[3], backgroundColor: '#fff' }]}></View>
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>

          {/* Search Bar */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              ...styles.searchBarContainer,
            }}
          >
            <Search size={20} color={colors.gray[500]} />
            <TextInput
              style={styles.textInput}
              placeholder="Search for your preferred restaurant"
              placeholderTextColor={colors.gray[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </Animated.View>

          {/* Search Results */}
          {showResults && (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                ...styles.resultsContainer,
              }}
            >
              <View style={styles.resultsList}>
                {filteredRestaurants.map((item, index) => renderRestaurant(item, index))}
              </View>
            </Animated.View>
          )}

          {!showResults && (
            <>
              {/* OR Text */}
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                  ...styles.orContainer,
                }}
              >
                <Text style={styles.orText}>or</Text>
              </Animated.View>

              {/* QR Code Button */}
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim },
                  ],
                  ...styles.qrContainer,
                }}
              >
                <TouchableOpacity
                  onPress={handleQRScan}
                  style={styles.qrButton}
                  activeOpacity={0.8}
                >
                  <QrCode size={80} color={colors.primary} />
                </TouchableOpacity>
              </Animated.View>

              {/* Bottom Text */}
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                  ...styles.bottomTextContainer,
                }}
              >
                <Text style={styles.bottomText}>
                  Scan, Pay & Enjoy!
                </Text>
              </Animated.View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  statusText: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: spacing[1],
  },
  statusIcon: {
    width: spacing[4],
    height: spacing[3],
    borderRadius: borderRadius.sm,
  },
  backButton: {
    marginBottom: spacing[6],
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderRadius: borderRadius[32],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[8],
    ...shadow.lg,
  },
  textInput: {
    flex: 1,
    marginLeft: spacing[3],
    color: colors.gray[800],
    fontSize: fontSize.base,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: borderRadius[24],
    marginBottom: spacing[4],
    maxHeight: height * 0.4,
    ...shadow.md,
  },
  resultsList: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    borderRadius: borderRadius[16],
    marginBottom: spacing[2],
    backgroundColor: '#fff',
  },
  restaurantIcon: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: borderRadius[12],
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: spacing[1],
  },
  restaurantCuisine: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
  },
  restaurantRating: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius[12],
  },
  ratingText: {
    fontSize: fontSize.xs,
    color: '#fff',
    fontWeight: '500',
  },
  orContainer: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  orText: {
    color: '#fff',
    fontSize: fontSize['2xl'],
    fontWeight: '500',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: spacing[12],
  },
  qrButton: {
    backgroundColor: '#fff',
    borderRadius: borderRadius[48],
    padding: spacing[8],
    ...shadow['2xl'],
  },
  bottomTextContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing[8],
  },
  bottomText: {
    color: '#fff',
    fontSize: fontSize['3xl'],
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
