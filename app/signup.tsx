import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignUpScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.push('/(tabs)') }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.accent]}
          style={styles.container}
        >
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={[styles.backButton, { backgroundColor: colors.surface }]}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color={colors.primary} />
              </TouchableOpacity>
              
              <View style={styles.headerContent}>
                <Text style={[styles.headerTitle, { color: colors.surface }]}>Create Account</Text>
                <Text style={[styles.headerSubtitle, { color: colors.surface }]}>
                  Join Chuku today
                </Text>
              </View>
            </View>

            {/* Sign Up Form */}
            <View style={[styles.formContainer, { backgroundColor: colors.surface }]}>
              <View style={styles.form}>
                <Text style={[styles.formTitle, { color: colors.primary }]}>Sign Up</Text>
                
                {/* Name Inputs */}
                <View style={styles.nameRow}>
                  <View style={styles.nameInput}>
                    <Text style={[styles.label, { color: colors.onSurface }]}>First Name</Text>
                    <View style={[styles.inputWrapper, { borderColor: colors.primary }]}>
                      <Ionicons name="person-outline" size={20} color={colors.primary} />
                      <TextInput
                        style={[styles.input, { color: colors.onSurface }]}
                        placeholder="First name"
                        placeholderTextColor={colors.onSurface + '80'}
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="words"
                      />
                    </View>
                  </View>

                  <View style={styles.nameInput}>
                    <Text style={[styles.label, { color: colors.onSurface }]}>Last Name</Text>
                    <View style={[styles.inputWrapper, { borderColor: colors.primary }]}>
                      <Ionicons name="person-outline" size={20} color={colors.primary} />
                      <TextInput
                        style={[styles.input, { color: colors.onSurface }]}
                        placeholder="Last name"
                        placeholderTextColor={colors.onSurface + '80'}
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="words"
                      />
                    </View>
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.onSurface }]}>Email</Text>
                  <View style={[styles.inputWrapper, { borderColor: colors.primary }]}>
                    <Ionicons name="mail-outline" size={20} color={colors.primary} />
                    <TextInput
                      style={[styles.input, { color: colors.onSurface }]}
                      placeholder="Enter your email"
                      placeholderTextColor={colors.onSurface + '80'}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.onSurface }]}>Password</Text>
                  <View style={[styles.inputWrapper, { borderColor: colors.primary }]}>
                    <Ionicons name="lock-closed-outline" size={20} color={colors.primary} />
                    <TextInput
                      style={[styles.input, { color: colors.onSurface }]}
                      placeholder="Create password"
                      placeholderTextColor={colors.onSurface + '80'}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoComplete="password-new"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons 
                        name={showPassword ? "eye-off-outline" : "eye-outline"} 
                        size={20} 
                        color={colors.primary} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.onSurface }]}>Confirm Password</Text>
                  <View style={[styles.inputWrapper, { borderColor: colors.primary }]}>
                    <Ionicons name="lock-closed-outline" size={20} color={colors.primary} />
                    <TextInput
                      style={[styles.input, { color: colors.onSurface }]}
                      placeholder="Confirm password"
                      placeholderTextColor={colors.onSurface + '80'}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoComplete="password-new"
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Ionicons 
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                        size={20} 
                        color={colors.primary} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Terms and Conditions */}
                <TouchableOpacity 
                  style={styles.termsContainer}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                >
                  <View style={[styles.checkbox, { borderColor: colors.primary }]}>
                    {acceptTerms && (
                      <Ionicons name="checkmark" size={16} color={colors.primary} />
                    )}
                  </View>
                  <Text style={[styles.termsText, { color: colors.onSurface }]}>
                    I agree to the{' '}
                    <Text style={[styles.termsLink, { color: colors.primary }]}>
                      Terms of Service
                    </Text>
                    {' '}and{' '}
                    <Text style={[styles.termsLink, { color: colors.primary }]}>
                      Privacy Policy
                    </Text>
                  </Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={[styles.signUpButton, { backgroundColor: colors.primary }]}
                  onPress={handleSignUp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Text style={[styles.signUpButtonText, { color: colors.surface }]}>
                      Creating Account...
                    </Text>
                  ) : (
                    <>
                      <Text style={[styles.signUpButtonText, { color: colors.surface }]}>
                        Create Account
                      </Text>
                      <Ionicons name="arrow-forward" size={20} color={colors.surface} />
                    </>
                  )}
                </TouchableOpacity>

                {/* Social Sign Up */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity style={[styles.socialButton, { borderColor: colors.primary }]}>
                    <Ionicons name="logo-google" size={20} color={colors.primary} />
                    <Text style={[styles.socialButtonText, { color: colors.primary }]}>Google</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.socialButton, { borderColor: colors.primary }]}>
                    <Ionicons name="logo-facebook" size={20} color={colors.primary} />
                    <Text style={[styles.socialButtonText, { color: colors.primary }]}>Facebook</Text>
                  </TouchableOpacity>
                </View>

                {/* Login Link */}
                <View style={styles.loginContainer}>
                  <Text style={[styles.loginText, { color: colors.onSurface }]}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={[styles.loginLink, { color: colors.primary }]}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
  },
  formContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: 600,
  },
  form: {
    gap: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameInput: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    fontWeight: '600',
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
    marginTop: 10,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    gap: 6,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
