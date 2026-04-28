import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, MapPin, CreditCard, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const colors = {
  primary: '#FF6B35',
  danger: '#EF4444',
  white: '#FFFFFF',
  background: '#F9FAFB',
  gray: {
    100: '#F3F4F6',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    800: '#1F2937',
  },
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  
  // Animation Values [cite: 16-17]
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const menuItems = [
    { id: 'personal', title: 'Personal Information', subtitle: 'Update your personal details', icon: User, onPress: () => navigation.navigate('EditProfile') },
    { id: 'addresses', title: 'Delivery Addresses', subtitle: 'Manage your delivery locations', icon: MapPin, onPress: () => navigation.navigate('AddressManagement') },
    { id: 'payment', title: 'Payment Methods', subtitle: 'Add or remove payment methods', icon: CreditCard, onPress: () => navigation.navigate('PaymentMethods') },
    { id: 'settings', title: 'Settings', subtitle: 'App preferences and notifications', icon: Settings, onPress: () => navigation.navigate('Settings') },
    { id: 'help', title: 'Help & Support', subtitle: 'Get help with the app', icon: HelpCircle, onPress: () => navigation.navigate('Help') },
    { id: 'logout', title: 'Log Out', subtitle: 'Sign out of your account', icon: LogOut, onPress: () => handleLogout(), isDestructive: true },
  ];

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const renderMenuItem = (item, index) => {
    const itemAnim = new Animated.Value(0);
    const Icon = item.icon;

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
        style={{
          opacity: itemAnim,
          transform: [{ translateY: itemAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
        }}
      >
        <TouchableOpacity
          onPress={item.onPress}
          style={[styles.menuItem, item.isDestructive && styles.destructiveBorder]}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemContent}>
            <View style={[styles.iconWrapper, item.isDestructive ? styles.bgDestructiveLight : styles.bgGrayLight]}>
              <Icon size={20} color={item.isDestructive ? colors.danger : colors.gray[500]} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={[styles.menuTitle, item.isDestructive ? styles.textDestructive : styles.textDark]}>
                {item.title}
              </Text>
              <Text style={[styles.menuSubtitle, item.isDestructive ? styles.textDestructiveLight : styles.textGray]}>
                {item.subtitle}
              </Text>
            </View>
            <ChevronRight size={20} color={item.isDestructive ? colors.danger : colors.gray[400]} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
          <Animated.View style={[styles.profileCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: 'https://picsum.photos/seed/avatar/100/100' }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@example.com</Text>
              <Text style={styles.userPhone}>+250 788 123 456</Text>
            </View>
          </Animated.View>

          <View style={styles.menuSection}>
            <Animated.Text style={[styles.sectionLabel, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              Account Settings
            </Animated.Text>
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </View>
        </ScrollView>
        <BottomTabNavigator activeTab="profile" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  safeArea: { flex: 1 },
  flex1: { flex: 1 },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowOpacity: 0.1,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.gray[800], marginLeft: 16 },
  profileCard: {
    backgroundColor: colors.white,
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 20,
    padding: 24,
    elevation: 2,
    shadowOpacity: 0.05,
    alignItems: 'center',
  },
  profileHeader: { alignItems: 'center' },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 16 },
  userName: { fontSize: 20, fontWeight: '700', color: colors.gray[800] },
  userEmail: { fontSize: 14, color: colors.gray[500], marginTop: 4 },
  userPhone: { fontSize: 12, color: colors.gray[400], marginTop: 8 },
  menuSection: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 },
  sectionLabel: { textAlign: 'center', color: colors.gray[600], marginBottom: 24, fontSize: 14 },
  menuItem: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[100],
    elevation: 1,
  },
  destructiveBorder: { borderColor: 'rgba(239, 68, 68, 0.2)' },
  menuItemContent: { flexDirection: 'row', alignItems: 'center' },
  iconWrapper: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  bgGrayLight: { backgroundColor: colors.gray[100] },
  bgDestructiveLight: { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
  menuTextContainer: { flex: 1, marginLeft: 16 },
  menuTitle: { fontWeight: '600', fontSize: 16 },
  menuSubtitle: { fontSize: 13, marginTop: 4 },
  textDark: { color: colors.gray[800] },
  textGray: { color: colors.gray[500] },
  textDestructive: { color: colors.danger },
  textDestructiveLight: { color: 'rgba(239, 68, 68, 0.6)' },
});