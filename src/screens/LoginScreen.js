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
import { Mail, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, borderRadius, fontSize, shadow } from '../utils/styles';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleSignIn = () => {
    console.log('Navigating to Search');
    navigation.navigate('Search');
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
    navigation.navigate('Search');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login');
    navigation.navigate('Search');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  const handleRegister = () => {
    navigation.navigate('Welcome');
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
              <Text style={styles.subtitleText}>Sign in to continue</Text>
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
            {/* Input Fields */}
            <View style={styles.inputContainer}>
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

              <View style={styles.inputWrapper}>
                <Lock size={20} color={colors.gray[500]} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor={colors.gray[400]}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSignIn}
              style={styles.signInButton}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* OR Separator */}
            <View style={styles.orSeparator}>
              <View style={styles.orLine}></View>
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine}></View>
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                onPress={handleGoogleLogin}
                style={styles.googleButton}
                activeOpacity={0.8}
              >
                <View style={styles.iconPlaceholder}>
                  <Text style={styles.iconText}>G</Text>
                </View>
                <Text style={styles.googleButtonText}>Login with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleFacebookLogin}
                style={styles.facebookButton}
                activeOpacity={0.8}
              >
                <View style={styles.iconPlaceholder}>
                  <Text style={styles.iconText}>f</Text>
                </View>
                <Text style={styles.facebookButtonText}>Login with facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Links */}
            <View style={styles.linksContainer}>
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                  Don't have a account?{' '}
                </Text>
                <TouchableOpacity onPress={handleRegister}>
                  <Text style={styles.registerLinkText}>Register</Text>
                </TouchableOpacity>
              </View>
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
  subtitleText: {
    color: '#fff',
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: spacing[2],
  },
  formContent: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[12],
    paddingBottom: spacing[8],
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
  signInButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius[32],
    paddingVertical: spacing[4],
    alignItems: 'center',
    marginBottom: spacing[12],
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
  socialContainer: {
    gap: spacing[8],
    marginBottom: spacing[12],
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius[32],
    paddingVertical: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  iconPlaceholder: {
    width: spacing[5],
    height: spacing[5],
    borderRadius: borderRadius[8],
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  iconText: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.gray[700],
  },
  googleButtonText: {
    color: colors.gray[700],
    fontSize: fontSize.base,
    fontWeight: '500',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderRadius: borderRadius[32],
    paddingVertical: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  facebookButtonText: {
    color: '#fff',
    fontSize: fontSize.base,
    fontWeight: '500',
  },
  linksContainer: {
    gap: spacing[8],
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
