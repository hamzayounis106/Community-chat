import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => router.push('/(tabs)') }
      ]);
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset link will be sent to your email');
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
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: colors.surface }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Text style={[styles.headerTitle, { color: colors.surface }]}>Welcome Back</Text>
              <Text style={[styles.headerSubtitle, { color: colors.surface }]}>
                Sign in to continue to Chuku
              </Text>
            </View>
          </View>

          {/* Login Form */}
          <View style={[styles.formContainer, { backgroundColor: colors.surface }]}>
            <View style={styles.form}>
              <Text style={[styles.formTitle, { color: colors.primary }]}>Login</Text>
              
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
                    placeholder="Enter your password"
                    placeholderTextColor={colors.onSurface + '80'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
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

              {/* Forgot Password */}
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: colors.primary }]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text style={[styles.loginButtonText, { color: colors.surface }]}>
                    Signing in...
                  </Text>
                ) : (
                  <>
                    <Text style={[styles.loginButtonText, { color: colors.surface }]}>
                      Sign In
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color={colors.surface} />
                  </>
                )}
              </TouchableOpacity>

              {/* Social Login */}
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

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={[styles.signUpText, { color: colors.onSurface }]}>
                  Don&apos;t have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text style={[styles.signUpLink, { color: colors.primary }]}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
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
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  form: {
    flex: 1,
    justifyContent: 'space-around',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
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
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
