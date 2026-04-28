import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, CheckCircle, Phone, MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#FF6B35',
  success: '#10B981',
  blue: '#3B82F6',
  white: '#FFFFFF',
  background: '#F9FAFB',
  gray: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    800: '#1F2937',
  },
};

export default function OrderTrackingScreen() {
  const [currentStep] = useState(2);
  const navigation = useNavigation();

  // Animation Values [cite: 16-17]
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const orderSteps = [
    { id: 1, title: 'Order Confirmed', time: '12:30 PM', description: 'Your order has been received', completed: true },
    { id: 2, title: 'Preparing', time: '12:35 PM', description: 'Restaurant is preparing your food', completed: true, current: true },
    { id: 3, title: 'On the way', time: 'Estimated 12:50 PM', description: 'Rider is picking up your order', completed: false },
    { id: 4, title: 'Delivered', time: 'Estimated 1:00 PM', description: 'Enjoy your meal!', completed: false },
  ];

  const orderInfo = {
    id: 'ORD001',
    restaurant: 'Choose Kigali',
    items: [
      { name: 'Tom Yummy', quantity: 2, price: 5000 },
      { name: 'Singapore Sling', quantity: 1, price: 6000 },
      { name: 'White Russian', quantity: 1, price: 5000 },
    ],
    total: 19600,
    deliveryAddress: 'KG 123 St, Kigali, Rwanda',
    estimatedDelivery: '12:50 PM - 1:00 PM',
  };

  const riderInfo = {
    name: 'Jean Mugisha',
    phone: '+250 788 123 456',
    photo: 'https://picsum.photos/seed/rider/60/60',
    vehicle: 'Motorcycle',
    plateNumber: 'RAB 123 C',
  };

  const renderOrderStep = ({ step, index }) => {
    const isCompleted = step.completed;
    const isCurrent = step.current;

    return (
      <View key={step.id} style={styles.stepRow}>
        <View style={styles.stepLeftColumn}>
          <View style={[
            styles.stepCircle,
            isCompleted ? styles.bgSuccess : isCurrent ? styles.bgPrimary : styles.bgGray
          ]}>
            {isCompleted ? <CheckCircle size={20} color="white" /> : <Text style={styles.stepNumber}>{step.id}</Text>}
          </View>
          {index < orderSteps.length - 1 && (
            <View style={[styles.stepLine, isCompleted ? styles.bgSuccess : styles.bgGray]} />
          )}
        </View>

        <View style={styles.stepContent}>
          <View style={styles.stepHeader}>
            <Text style={[
              styles.stepTitle,
              isCurrent ? styles.textPrimary : isCompleted ? styles.textDark : styles.textGray
            ]}>
              {step.title}
            </Text>
            <Text style={[styles.stepTime, isCurrent ? styles.textPrimary : styles.textGray]}>
              {step.time}
            </Text>
          </View>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Track Order</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
          {/* Order Status Badge Section [cite: 170-190] */}
          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.orderIdText}>Order {orderInfo.id}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{orderSteps[currentStep - 1]?.title}</Text>
              </View>
            </View>
            <Text style={styles.estimateText}>Estimated delivery: {orderInfo.estimatedDelivery}</Text>
          </Animated.View>

          {/* Progress Timeline Section [cite: 191-204] */}
          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            {orderSteps.map((step, index) => renderOrderStep({ step, index }))}
          </Animated.View>

          {/* Rider Details Section [cite: 205-247] */}
          {currentStep >= 3 && (
            <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <Text style={styles.sectionTitle}>Delivery Partner</Text>
              <View style={styles.riderRow}>
                <Image source={{ uri: riderInfo.photo }} style={styles.riderImage} />
                <View style={styles.flex1}>
                  <Text style={styles.riderName}>{riderInfo.name}</Text>
                  <Text style={styles.riderVehicle}>{riderInfo.vehicle} • {riderInfo.plateNumber}</Text>
                  <View style={styles.contactRow}>
                    <TouchableOpacity style={styles.callButton}><Phone size={16} color="white" /></TouchableOpacity>
                    <TouchableOpacity style={styles.messageButton}><MessageCircle size={16} color="white" /></TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Detailed Summary Section [cite: 248-291] */}
          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }], marginBottom: 30 }]}>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <View style={styles.restaurantSection}>
              <Text style={styles.restaurantLabel}>{orderInfo.restaurant}</Text>
              <View style={styles.addressRow}>
                <MapPin size={14} color={colors.gray[500]} />
                <Text style={styles.addressText}>{orderInfo.deliveryAddress}</Text>
              </View>
            </View>
            <View style={styles.itemsDivider}>
              <Text style={styles.itemsHeader}>Items</Text>
              {orderInfo.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemQuantityText}>{item.quantity}x {item.name}</Text>
                  <Text style={styles.itemPriceText}>Frw {(item.price * item.quantity).toLocaleString()}</Text>
                </View>
              ))}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>Frw {orderInfo.total.toLocaleString()}</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  safeArea: { flex: 1 },
  flex1: { flex: 1 },
  header: { backgroundColor: colors.white, paddingHorizontal: 24, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', elevation: 2, shadowOpacity: 0.1 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.gray[800], marginLeft: 16 },
  card: { backgroundColor: colors.white, marginHorizontal: 24, marginTop: 16, borderRadius: 20, padding: 16, elevation: 1, shadowOpacity: 0.05 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderIdText: { fontSize: 18, fontWeight: '700', color: colors.gray[800] },
  statusBadge: { backgroundColor: 'rgba(255, 107, 53, 0.1)', px: 12, py: 4, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  statusBadgeText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  estimateText: { color: colors.gray[600], fontSize: 14 },
  stepRow: { flexDirection: 'row', marginBottom: 24 },
  stepLeftColumn: { alignItems: 'center', marginRight: 16 },
  stepCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  stepNumber: { color: colors.white, fontWeight: '700' },
  stepLine: { width: 2, height: 40, marginTop: 8 },
  stepContent: { flex: 1 },
  stepHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepTitle: { fontWeight: '700', fontSize: 16 },
  stepTime: { fontSize: 13 },
  stepDescription: { color: colors.gray[600], fontSize: 13, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.gray[800], marginBottom: 12 },
  riderRow: { flexDirection: 'row', alignItems: 'center' },
  riderImage: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  riderName: { fontSize: 16, fontWeight: '700', color: colors.gray[800] },
  riderVehicle: { fontSize: 14, color: colors.gray[500], marginTop: 2 },
  contactRow: { flexDirection: 'row', marginTop: 12 },
  callButton: { backgroundColor: colors.success, borderRadius: 20, padding: 8, marginRight: 12 },
  messageButton: { backgroundColor: colors.blue, borderRadius: 20, padding: 8 },
  restaurantSection: { marginBottom: 16 },
  restaurantLabel: { color: colors.gray[600], fontSize: 14, marginBottom: 4 },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  addressText: { color: colors.gray[500], fontSize: 13, marginLeft: 8 },
  itemsDivider: { borderTopWidth: 1, borderTopColor: colors.gray[200], pt: 12, paddingTop: 12 },
  itemsHeader: { fontSize: 15, fontWeight: '600', color: colors.gray[800], marginBottom: 8 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  itemQuantityText: { color: colors.gray[600] },
  itemPriceText: { color: colors.gray[800] },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.gray[200], marginTop: 12, paddingTop: 12 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: colors.gray[800] },
  totalValue: { fontSize: 18, fontWeight: '800', color: colors.primary },
  bgPrimary: { backgroundColor: colors.primary },
  bgSuccess: { backgroundColor: colors.success },
  bgGray: { backgroundColor: colors.gray[300] },
  textPrimary: { color: colors.primary },
  textGray: { color: colors.gray[500] },
  textDark: { color: colors.gray[800] },
});