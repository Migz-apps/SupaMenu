import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Phone, Mail } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, borderRadius, fontSize, shadow } from '../utils/styles';

export default function WelcomeScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });
  
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
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProceed = () => {
    console.log('Navigating to Search from Welcome');
    navigation.navigate('Search');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.flex}
          contentContainerStyle={{ flexGrow: 1 }}
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
            
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <Text style={styles.logoText}>SupaMenu</Text>
              <Text style={styles.welcomeText}>Welcome...</Text>
            </Animated.View>
          </View>

          {/* Form Content */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              ...styles.formContent,
            }}
          >
            <Text style={styles.instructionText}>
              Please fill in the information
            </Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <User size={20} color={colors.gray[500]} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name"
                  placeholderTextColor={colors.gray[400]}
                  value={formData.fullName}
                  onChangeText={(value) => handleInputChange('fullName', value)}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Phone size={20} color={colors.gray[500]} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Phone Number"
                  placeholderTextColor={colors.gray[400]}
                  value={formData.phoneNumber}
                  onChangeText={(value) => handleInputChange('phoneNumber', value)}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Mail size={20} color={colors.gray[500]} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Your Email"
                  placeholderTextColor={colors.gray[400]}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleProceed}
                style={styles.proceedButton}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>

              <View style={styles.orSeparator}>
                <View style={styles.orLine}></View>
                <Text style={styles.orText}>OR</Text>
                <View style={styles.orLine}></View>
              </View>

              <Text style={styles.accountText}>
                If you have a PMG account
              </Text>

              <TouchableOpacity
                onPress={handleSignIn}
                style={styles.signInButton}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.registerLink}>
              <Text style={styles.registerText}>
                Don't have a account?{' '}
              </Text>
              <TouchableOpacity onPress={handleProceed}>
                <Text style={styles.registerLinkText}>Register</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
    borderBottomLeftRadius: borderRadius[48],
    borderBottomRightRadius: borderRadius[48],
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
  logoText: {
    color: '#fff',
    fontSize: fontSize[4],
    fontWeight: 'bold',
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  welcomeText: {
    color: '#fff',
    fontSize: fontSize['2xl'],
    textAlign: 'center',
  },
  formContent: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[12],
    paddingBottom: spacing[8],
  },
  instructionText: {
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing[12],
  },
  inputContainer: {
    gap: spacing[8],
    marginBottom: spacing[12],
  },
  inputWrapper: {
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius[32],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  textInput: {
    flex: 1,
    marginLeft: spacing[3],
    color: colors.gray[800],
    fontSize: fontSize.base,
  },
  buttonContainer: {
    gap: spacing[8],
    marginBottom: spacing[12],
  },
  proceedButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius[32],
    paddingVertical: spacing[4],
    alignItems: 'center',
    ...shadow.lg,
  },
  signInButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius[32],
    paddingVertical: spacing[4],
    alignItems: 'center',
    ...shadow.lg,
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  orSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray[300],
  },
  orText: {
    paddingHorizontal: spacing[4],
    color: colors.gray[500],
    fontSize: fontSize.sm,
  },
  accountText: {
    color: colors.gray[600],
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[12],
  },
  registerText: {
    color: colors.gray[600],
    fontSize: fontSize.sm,
  },
  registerLinkText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
