import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Clock, MapPin, Heart, ShoppingCart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Theme Constants [cite: 1, 17-29]
const colors = {
  primary: '#FF6B35',
  white: '#FFFFFF',
  background: '#FFFFFF',
  gray: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
  },
};

const mockMenuItems = [
  { id: '1', name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, basil', price: '$12.99', image: 'https://picsum.photos/seed/pizza1/80/80' },
  { id: '2', name: 'Caesar Salad', description: 'Romaine lettuce, parmesan, croutons', price: '$8.99', image: 'https://picsum.photos/seed/salad1/80/80' },
  { id: '3', name: 'Grilled Chicken', description: 'Herb-marinated chicken with vegetables', price: '$15.99', image: 'https://picsum.photos/seed/chicken1/80/80' },
]; // [cite: 1, 30-52]

export default function RestaurantDetailScreen({ route }) {
  const { restaurant } = route.params || {};
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  // Animation values [cite: 1, 57-66]
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Header Opacity Interpolation [cite: 1, 67-72]
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderMenuItem = (item, index) => {
    const itemAnim = new Animated.Value(0);

    React.useEffect(() => {
      Animated.timing(itemAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []); // [cite: 1, 73-83]

    return (
      <Animated.View
        key={item.id}
        style={{
          opacity: itemAnim,
          transform: [{ translateY: itemAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
        }}
      >
        <TouchableOpacity 
          style={styles.menuItemCard} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('FoodDetail', { item })}
        >
          <View style={styles.menuItemContent}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Cart', { addedItem: item })} // FIX: Redirects to Cart
              style={styles.addToCartButton}
              activeOpacity={0.6}
            >
              <ShoppingCart size={16} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    ); // [cite: 1, 84-110]
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.floatingHeader}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Search')} // FIX: Now directs to Search screen
            style={styles.iconButtonCircle}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setIsFavorite(!isFavorite)} 
            style={styles.iconButtonCircle}
            activeOpacity={0.7}
          >
            <Heart size={20} color="white" fill={isFavorite ? "white" : "none"} />
          </TouchableOpacity>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: restaurant?.image || 'https://picsum.photos/seed/restaurant/400/250' }}
              style={styles.heroImage}
            />
            <View style={styles.imageOverlay}>
              <Animated.Text style={[styles.restaurantTitle, { opacity: fadeAnim }]}>
                {restaurant?.name || 'Choose Kigali'}
              </Animated.Text>
            </View>
          </View>

          <Animated.View style={[styles.infoSection, { opacity: fadeAnim }]}>
            <View style={styles.metaRow}>
              <View style={styles.ratingRow}>
                <Star size={16} color={colors.primary} fill={colors.primary} />
                <Text style={styles.ratingScore}>4.8</Text>
                <Text style={styles.reviewCount}>(200+ reviews)</Text>
              </View>
              <View style={styles.timeRow}>
                <Clock size={16} color={colors.gray[500]} />
                <Text style={styles.timeText}>25-30 min</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <MapPin size={16} color={colors.gray[500]} />
              <Text style={styles.locationText}>Kigali, Rwanda • 2.5 km away</Text>
            </View>

            <Text style={styles.descriptionText}>
              Experience the best of world cuisine with African influences. From authentic pizzas to premium coffee.
            </Text>
          </Animated.View>

          <View style={styles.menuSection}>
            <Text style={styles.menuHeader}>Popular Items</Text>
            {mockMenuItems.map((item, index) => renderMenuItem(item, index))}
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  ); // [cite: 1, 111-183]
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  safeArea: { flex: 1 },
  stickyHeader: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 100,
    backgroundColor: colors.primary, zIndex: 1000,
  },
  floatingHeader: {
    position: 'absolute', top: 50, left: 0, right: 0, zIndex: 1100,
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24,
  },
  iconButtonCircle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 20, padding: 8,
  },
  heroContainer: { position: 'relative' },
  heroImage: { width: '100%', height: 260 },
  imageOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
    backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', padding: 24,
  },
  restaurantTitle: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  infoSection: { padding: 24 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingScore: { color: colors.gray[800], fontWeight: '600', marginLeft: 4 },
  reviewCount: { color: colors.gray[500], marginLeft: 4, fontSize: 13 },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  timeText: { color: colors.gray[600], marginLeft: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  locationText: { color: colors.gray[600], marginLeft: 8 },
  descriptionText: { color: colors.gray[700], fontSize: 15, lineHeight: 22 },
  menuSection: { paddingHorizontal: 24, paddingBottom: 40 },
  menuHeader: { fontSize: 22, fontWeight: 'bold', color: colors.gray[800], marginBottom: 24 },
  menuItemCard: {
    backgroundColor: colors.white, borderRadius: 20, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: colors.gray[100], elevation: 2, shadowOpacity: 0.05,
  },
  menuItemContent: { flexDirection: 'row', alignItems: 'center' },
  itemImage: { width: 80, height: 80, borderRadius: 12 },
  itemInfo: { flex: 1, marginLeft: 16 },
  itemName: { fontSize: 18, fontWeight: '600', color: colors.gray[800] },
  itemDescription: { fontSize: 13, color: colors.gray[500], marginTop: 4 },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: colors.primary, marginTop: 8 },
  addToCartButton: { backgroundColor: colors.primary, borderRadius: 20, padding: 8 },
}); // [cite: 1, 184-254]