import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, CheckCircle, XCircle, Truck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const colors = {
  primary: '#FF6B35',
  success: '#10B981',
  danger: '#EF4444',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    800: '#1F2937',
  },
  white: '#FFFFFF',
};

const mockOrders = [
  { id: 'ORD001', restaurant: 'Choose Kigali', date: '2024-04-27', time: '12:30 PM', total: 19600, status: 'delivered', items: [{ name: 'Tom Yummy', quantity: 2 }, { name: 'Singapore Sling', quantity: 1 }] },
  { id: 'ORD002', restaurant: 'Pizza Palace', date: '2024-04-26', time: '7:45 PM', total: 25000, status: 'cancelled', items: [{ name: 'Margherita Pizza', quantity: 1 }, { name: 'Caesar Salad', quantity: 1 }] },
  { id: 'ORD003', restaurant: 'Burger Hub', date: '2024-04-25', time: '1:15 PM', total: 18500, status: 'in-progress', items: [{ name: 'Classic Burger', quantity: 2 }, { name: 'Fries', quantity: 1 }] },
];

export default function OrderHistoryScreen() {
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'delivered':
        return { icon: CheckCircle, color: colors.success, bgColor: 'rgba(16, 185, 129, 0.1)', text: 'Delivered' };
      case 'cancelled':
        return { icon: XCircle, color: colors.danger, bgColor: 'rgba(239, 68, 68, 0.1)', text: 'Cancelled' };
      case 'in-progress':
        return { icon: Truck, color: colors.primary, bgColor: 'rgba(255, 107, 53, 0.1)', text: 'On the way' };
      default:
        return { icon: Clock, color: colors.gray[500], bgColor: 'rgba(107, 114, 128, 0.1)', text: 'Processing' };
    }
  };

  const renderOrderItem = (item, index) => {
    const itemAnim = new Animated.Value(0);
    const statusConfig = getStatusConfig(item.status);
    const StatusIcon = statusConfig.icon;

    React.useEffect(() => {
      Animated.timing(itemAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        key={item.id}
        style={[styles.orderCardWrapper, {
          opacity: itemAnim,
          transform: [{ translateY: itemAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
        }]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
          style={styles.orderCard}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{item.restaurant}</Text>
              <Text style={styles.orderDateTime}>{item.date} • {item.time}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
              <StatusIcon size={14} color={statusConfig.color} />
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {statusConfig.text}
              </Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.itemsSummary}>
              <Text style={styles.itemCountText}>{item.items.length} items</Text>
              <Text style={styles.itemListText} numberOfLines={1}>
                {item.items.slice(0, 2).map(i => i.name).join(', ')}
                {item.items.length > 2 && ` +${item.items.length - 2} more`}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.totalPrice}>Frw {item.total.toLocaleString()}</Text>
              <Text style={styles.orderIdText}>{item.id}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order History</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Animated.Text style={[styles.subTitle, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            Your recent orders
          </Animated.Text>
          {mockOrders.map((order, index) => renderOrderItem(order, index))}
        </ScrollView>
        <BottomTabNavigator activeTab="history" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[50] },
  safeArea: { flex: 1 },
  header: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.gray[800], marginLeft: 16 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  subTitle: { textAlign: 'center', color: colors.gray[600], marginBottom: 24, fontSize: 14 },
  orderCardWrapper: { marginBottom: 16 },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray[100],
    elevation: 1,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  restaurantInfo: { flex: 1 },
  restaurantName: { fontSize: 18, fontWeight: '600', color: colors.gray[800] },
  orderDateTime: { fontSize: 13, color: colors.gray[500], marginTop: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600', marginLeft: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: colors.gray[100], paddingTop: 12 },
  itemsSummary: { flex: 1, marginRight: 10 },
  itemCountText: { fontSize: 14, color: colors.gray[600], marginBottom: 2 },
  itemListText: { fontSize: 12, color: colors.gray[400] },
  priceContainer: { alignItems: 'flex-end' },
  totalPrice: { fontSize: 18, fontWeight: '700', color: colors.primary },
  orderIdText: { fontSize: 12, color: colors.gray[400], marginTop: 2 },
});