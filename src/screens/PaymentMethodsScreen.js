import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: '#FF6B35',
  white: '#FFFFFF',
  background: '#F9FAFB',
  danger: '#EF4444',
  gray: {
    100: '#F3F4F6',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    800: '#1F2937',
  },
};

const mockPaymentMethods = [
  { id: '1', type: 'Credit Card', brand: 'Visa', last4: '1234', expiry: '12/25', isDefault: true },
  { id: '2', type: 'Credit Card', brand: 'Mastercard', last4: '5678', expiry: '09/24', isDefault: false },
  { id: '3', type: 'Mobile Money', provider: 'MTN', number: '+250 788 123 456', isDefault: false },
  { id: '4', type: 'Mobile Money', provider: 'Airtel', number: '+250 738 987 654', isDefault: false },
];

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const navigation = useNavigation();

  // Header Animation Values [cite: 49-50]
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const setAsDefault = (id) => {
    setPaymentMethods(prev =>
      prev.map(method => ({ ...method, isDefault: method.id === id }))
    );
  };

  const deletePaymentMethod = (id) => {
    Alert.alert('Delete Payment Method', 'Are you sure you want to remove this?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => setPaymentMethods(prev => prev.filter(m => m.id !== id)), style: 'destructive' },
    ]);
  };

  const renderPaymentMethod = (item, index) => {
    const itemAnim = new Animated.Value(0);

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
        style={[styles.methodCard, {
          opacity: itemAnim,
          transform: [{ translateY: itemAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
        }]}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <CreditCard size={16} color={colors.gray[500]} />
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.methodType}>{item.type}</Text>
              {item.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
            <Text style={styles.methodDetails}>
              {item.brand && `${item.brand} •••• ${item.last4}`}
              {item.provider && `${item.provider} • ${item.number}`}
            </Text>
            {item.expiry && <Text style={styles.expiryText}>Expires {item.expiry}</Text>}
          </View>

          <View style={styles.actions}>
            {!item.isDefault && (
              <TouchableOpacity onPress={() => setAsDefault(item.id)} style={styles.setDefaultButton}>
                <Text style={styles.setDefaultText}>Set Default</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => deletePaymentMethod(item.id)} style={styles.trashIcon}>
              <Trash2 size={16} color={colors.danger} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color={colors.gray[800]} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment Methods</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('AddPaymentMethod')} 
            style={styles.headerAddButton}
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <Animated.Text style={[styles.subTitle, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            Manage your payment methods
          </Animated.Text>

          {paymentMethods.map((method, index) => renderPaymentMethod(method, index))}

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('AddPaymentMethod')} 
              style={styles.dashedButton}
            >
              <Plus size={20} color={colors.gray[500]} />
              <Text style={styles.dashedButtonText}>Add Payment Method</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  safeArea: { flex: 1 },
  header: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.gray[800], marginLeft: 16 },
  headerAddButton: { backgroundColor: colors.primary, borderRadius: 20, padding: 8 },
  scrollContainer: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  subTitle: { textAlign: 'center', color: colors.gray[600], marginBottom: 24 },
  methodCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[100],
    elevation: 1,
  },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 48, height: 32, backgroundColor: colors.gray[100], borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  infoContainer: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  methodType: { fontWeight: '600', color: colors.gray[800] },
  defaultBadge: { backgroundColor: 'rgba(255, 107, 53, 0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, marginLeft: 8 },
  defaultText: { color: colors.primary, fontSize: 10, fontWeight: 'bold' },
  methodDetails: { color: colors.gray[500], fontSize: 14, marginTop: 4 },
  expiryText: { color: colors.gray[400], fontSize: 12, marginTop: 2 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  setDefaultButton: { marginRight: 12 },
  setDefaultText: { color: colors.primary, fontSize: 14, fontWeight: '500' },
  trashIcon: { padding: 8 },
  dashedButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.gray[300],
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  dashedButtonText: { color: colors.gray[600], fontWeight: '500', marginLeft: 8 },
});