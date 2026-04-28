import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

// FIXED: Converted string values (e.g., '16px') to numbers for React Native compatibility [cite: 35-54]
const colors = {
  primary: '#FF6B35',
  secondary: '#FF8C42',
  light: '#F8F9FA',
  gray: {
    50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB',
    400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563', 700: '#374151',
    800: '#1F2937', 900: '#111827',
  },
};

const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32 };
const fontSize = { sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30 };
const borderRadius = { lg: 12, xl: 16, '2xl': 24, full: 999 };

const mockCartItems = [
  { id: '1', name: 'Tom Yummy', description: 'Spicy and sour soup', price: 5000, quantity: 2, image: 'https://picsum.photos/seed/tomyummy/80/80' },
  { id: '2', name: 'Singapore Sling', description: 'Classic cocktail', price: 6000, quantity: 1, image: 'https://picsum.photos/seed/singaporesling/80/80' },
  { id: '3', name: 'White Russian', description: 'Creamy cocktail', price: 5000, quantity: 1, image: 'https://picsum.photos/seed/whiterussian/80/80' },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const navigation = useNavigation();

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const removeItem = (id) => {
    Alert.alert('Remove Item', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', onPress: () => setCartItems(prev => prev.filter(i => i.id !== id)), style: 'destructive' },
    ]);
  };

  const calculateTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const renderCartItem = (item, index) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.cartItemHeader}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemPrice}>Frw {item.price.toLocaleString()}</Text>
        </View>
        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
      <View style={styles.quantitySection}>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
            <Minus size={16} color={colors.gray[600]} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
            <Plus size={16} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemTotal}>Frw {(item.price * item.quantity).toLocaleString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color={colors.gray[700]} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cart ({cartItems.length})</Text>
          </View>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <ShoppingBag size={80} color={colors.gray[300]} />
            <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Restaurants</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
              {cartItems.map((item, index) => renderCartItem(item, index))}
            </ScrollView>
            <View style={styles.checkoutSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>Frw {calculateTotal().toLocaleString()}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <BottomTabNavigator activeTab="cart" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light },
  safeArea: { flex: 1 },
  header: { 
    backgroundColor: '#fff', 
    paddingHorizontal: spacing[6], 
    paddingVertical: spacing[4],
    elevation: 2,
    shadowOpacity: 0.05,
  },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: fontSize['2xl'], fontWeight: '600', color: colors.gray[800], marginLeft: spacing[4] },
  scrollViewContent: { padding: spacing[6] },
  cartItem: { 
    backgroundColor: '#fff', 
    borderRadius: borderRadius['2xl'], 
    padding: spacing[4], 
    marginBottom: spacing[4],
    borderWidth: 1,
    borderColor: colors.gray[100],
  },
  cartItemHeader: { flexDirection: 'row' },
  itemImage: { width: 80, height: 80, borderRadius: borderRadius.xl },
  itemInfo: { marginLeft: spacing[4], flex: 1 },
  itemName: { fontSize: fontSize.lg, fontWeight: '600', color: colors.gray[800] },
  itemDescription: { fontSize: fontSize.sm, color: colors.gray[500] },
  itemPrice: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.primary, marginTop: spacing[2] },
  quantitySection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing[4] },
  quantityControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.gray[100], borderRadius: borderRadius.full, paddingHorizontal: spacing[3], paddingVertical: spacing[2] },
  quantityText: { marginHorizontal: spacing[4], fontSize: fontSize.base, fontWeight: '500' },
  itemTotal: { fontSize: fontSize.base, fontWeight: '600' },
  checkoutSection: { backgroundColor: '#fff', padding: spacing[6], borderTopWidth: 1, borderTopColor: colors.gray[200] },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing[4] },
  totalAmount: { fontSize: fontSize['3xl'], fontWeight: 'bold', color: colors.primary },
  checkoutButton: { backgroundColor: colors.primary, borderRadius: borderRadius['2xl'], paddingVertical: spacing[4], alignItems: 'center' },
  checkoutButtonText: { color: '#fff', fontSize: fontSize.lg, fontWeight: '600' },
  emptyCartContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  browseButton: { backgroundColor: colors.primary, borderRadius: borderRadius['2xl'], padding: spacing[4], marginTop: spacing[6] },
  browseButtonText: { color: '#fff', fontWeight: '600' },
});