import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Plus, Edit, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Global Theme Constants [cite: 111, 136, 170]
const colors = {
  primary: '#FF6B35',
  lightGray: '#F3F4F6',
  mediumGray: '#6B7280',
  darkGray: '#374151',
  danger: '#EF4444',
  white: '#FFFFFF',
  background: '#F9FAFB',
};

const mockAddresses = [
  { id: '1', type: 'Home', address: 'KG 123 St, Kiyovu, Kigali', details: 'Near Kigali City Tower', isDefault: true },
  { id: '2', type: 'Work', address: 'KN 456 Ave, Nyarugenge', details: 'Kigali Business Center, Floor 3', isDefault: false },
  { id: '3', type: 'Other', address: 'KG 789 Rd, Remera', details: 'Opposite Amahoro Stadium', isDefault: false },
];

export default function AddressManagementScreen() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const navigation = useNavigation();

  // Animation Values [cite: 42-43]
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const setAsDefault = (id) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const deleteAddress = (id) => {
    Alert.alert('Delete Address', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => setAddresses(prev => prev.filter(a => a.id !== id)), style: 'destructive' },
    ]);
  };

  const renderAddress = (item, index) => {
    const itemAnim = new Animated.Value(0);
    
    // Staggered Item Animation Logic [cite: 86-92]
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
        style={[styles.addressCard, {
          opacity: itemAnim,
          transform: [{ translateY: itemAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
        }]}
      >
        <View style={styles.cardRow}>
          <View style={styles.iconContainer}>
            <MapPin size={18} color={colors.primary} />
          </View>
          
          <View style={styles.addressInfo}>
            <View style={styles.cardHeader}>
              <View style={styles.typeRow}>
                <Text style={styles.addressType}>{item.type}</Text>
                {item.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('EditAddress', { address: item })} style={styles.iconButton}>
                  <Edit size={16} color={colors.mediumGray} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteAddress(item.id)} style={styles.iconButton}>
                  <Trash2 size={16} color={colors.danger} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.mainAddress}>{item.address}</Text>
            <Text style={styles.detailsText}>{item.details}</Text>

            {!item.isDefault && (
              <TouchableOpacity onPress={() => setAsDefault(item.id)} style={styles.setDefaultButton}>
                <Text style={styles.setDefaultText}>Set as default</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header Section [cite: 165-183] */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={colors.darkGray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery Addresses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddAddress')} style={styles.addCircle}>
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Animated.Text style={[styles.subTitle, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            Manage your delivery locations
          </Animated.Text>

          {addresses.map((address, index) => renderAddress(address, index))}

          {/* Add New Address Dashed Button [cite: 202-219] */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('AddAddress')}
              style={styles.dashedButton}
            >
              <Plus size={20} color={colors.mediumGray} />
              <Text style={styles.dashedButtonText}>Add New Address</Text>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.darkGray, flex: 1, marginLeft: 16 },
  addCircle: { backgroundColor: colors.primary, borderRadius: 20, padding: 8 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  subTitle: { textAlign: 'center', color: colors.mediumGray, marginBottom: 24, fontSize: 16 },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 2,
  },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start' },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addressInfo: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  typeRow: { flexDirection: 'row', alignItems: 'center' },
  addressType: { fontWeight: '700', color: colors.darkGray, fontSize: 16 },
  defaultBadge: { backgroundColor: 'rgba(255, 107, 53, 0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginLeft: 8 },
  defaultText: { color: colors.primary, fontSize: 10, fontWeight: 'bold' },
  actionButtons: { flexDirection: 'row' },
  iconButton: { padding: 4, marginLeft: 8 },
  mainAddress: { color: colors.darkGray, marginBottom: 4, lineHeight: 20 },
  detailsText: { color: colors.mediumGray, fontSize: 14, marginBottom: 12 },
  setDefaultButton: { marginTop: 4 },
  setDefaultText: { color: colors.primary, fontWeight: '600', fontSize: 14 },
  dashedButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  dashedButtonText: { color: colors.mediumGray, fontWeight: '600', marginLeft: 8 },
});