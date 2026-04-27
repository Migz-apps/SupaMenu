import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Plus, Check, Trash2, Edit } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const mockAddresses = [
  {
    id: '1',
    type: 'Home',
    address: 'KG 123 St, Kiyovu, Kigali',
    details: 'Near Kigali City Tower',
    isDefault: true,
    coordinates: { lat: -1.9441, lng: 30.0619 },
  },
  {
    id: '2',
    type: 'Work',
    address: 'KN 456 Ave, Nyarugenge',
    details: 'Kigali Business Center, Floor 3',
    isDefault: false,
    coordinates: { lat: -1.9536, lng: 30.0606 },
  },
  {
    id: '3',
    type: 'Other',
    address: 'KG 789 Rd, Remera',
    details: 'Opposite Amahoro Stadium',
    isDefault: false,
    coordinates: { lat: -1.9364, lng: 30.1302 },
  },
];

export default function AddressManagementScreen() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const navigation = useNavigation();
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const setAsDefault = (id) => {
    setAddresses(prev =>
      prev.map(address =>
        address.id === id
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      )
    );
  };

  const deleteAddress = (id) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to remove this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => setAddresses(prev => prev.filter(address => address.id !== id)),
          style: 'destructive'
        },
      ]
    );
  };

  const editAddress = (address) => {
    navigation.navigate('EditAddress', { address });
  };

  const renderAddress = ({ item, index }) => {
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
        style={{
          opacity: itemAnim,
          transform: [
            {
              translateY: itemAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
          <View className="flex-row items-start">
            <View className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
              <MapPin size={16} color="#FF6B35" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Text className="text-gray-800 font-semibold">
                    {item.type}
                  </Text>
                  {item.isDefault && (
                    <View className="bg-primary/10 px-2 py-1 rounded-full ml-2">
                      <Text className="text-primary text-xs">Default</Text>
                    </View>
                  )}
                </View>
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => editAddress(item)}
                    className="p-2 mr-2"
                  >
                    <Edit size={16} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteAddress(item.id)}
                    className="p-2"
                  >
                    <Trash2 size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <Text className="text-gray-800 mb-1">
                {item.address}
              </Text>
              <Text className="text-gray-500 text-sm">
                {item.details}
              </Text>
              
              {!item.isDefault && (
                <TouchableOpacity
                  onPress={() => setAsDefault(item.id)}
                  className="mt-3"
                >
                  <Text className="text-primary text-sm font-medium">
                    Set as default
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 pt-4 pb-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color="#374151" />
              </TouchableOpacity>
              <Text className="text-gray-800 text-xl font-semibold ml-4">
                Delivery Addresses
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddAddress')}
              className="bg-primary rounded-full p-2"
            >
              <Plus size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6 pt-6"
        >
          <Animated.Text
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="text-gray-600 text-center mb-6"
          >
            Manage your delivery locations
          </Animated.Text>

          {addresses.map((address, index) => (
            <View key={address.id}>
              {renderAddress({ item: address, index })}
            </View>
          ))}

          {/* Add Address Button */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-8"
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('AddAddress')}
              className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 flex-row items-center justify-center"
              activeOpacity={0.7}
            >
              <Plus size={20} color="#6B7280" />
              <Text className="text-gray-600 font-medium ml-2">
                Add New Address
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
