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
import { ArrowLeft, CreditCard, Plus, Check, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const mockPaymentMethods = [
  {
    id: '1',
    type: 'Credit Card',
    brand: 'Visa',
    last4: '1234',
    expiry: '12/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Credit Card',
    brand: 'Mastercard',
    last4: '5678',
    expiry: '09/24',
    isDefault: false,
  },
  {
    id: '3',
    type: 'Mobile Money',
    provider: 'MTN',
    number: '+250 788 123 456',
    isDefault: false,
  },
  {
    id: '4',
    type: 'Mobile Money',
    provider: 'Airtel',
    number: '+250 738 987 654',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [selectedMethod, setSelectedMethod] = useState('1');
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
    setPaymentMethods(prev =>
      prev.map(method =>
        method.id === id
          ? { ...method, isDefault: true }
          : { ...method, isDefault: false }
      )
    );
  };

  const deletePaymentMethod = (id) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => setPaymentMethods(prev => prev.filter(method => method.id !== id)),
          style: 'destructive'
        },
      ]
    );
  };

  const renderPaymentMethod = ({ item, index }) => {
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
          <View className="flex-row items-center">
            <View className="w-12 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <CreditCard size={16} color="#6B7280" />
            </View>
            <View className="flex-1">
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
              <Text className="text-gray-500 text-sm mt-1">
                {item.brand && `${item.brand} •••• ${item.last4}`}
                {item.provider && `${item.provider} • ${item.number}`}
              </Text>
              {item.expiry && (
                <Text className="text-gray-400 text-xs mt-1">
                  Expires {item.expiry}
                </Text>
              )}
            </View>
            
            <View className="flex-row items-center">
              {!item.isDefault && (
                <TouchableOpacity
                  onPress={() => setAsDefault(item.id)}
                  className="mr-3"
                >
                  <Text className="text-primary text-sm font-medium">
                    Set Default
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => deletePaymentMethod(item.id)}
                className="p-2"
              >
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>
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
                Payment Methods
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPaymentMethod')}
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
            Manage your payment methods
          </Animated.Text>

          {paymentMethods.map((method, index) => (
            <View key={method.id}>
              {renderPaymentMethod({ item: method, index })}
            </View>
          ))}

          {/* Add Payment Method Button */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-8"
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPaymentMethod')}
              className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 flex-row items-center justify-center"
              activeOpacity={0.7}
            >
              <Plus size={20} color="#6B7280" />
              <Text className="text-gray-600 font-medium ml-2">
                Add Payment Method
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
