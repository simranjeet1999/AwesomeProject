// LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const existingUsers = await AsyncStorage.getItem('users');
        if (existingUsers) {
          setUsers(JSON.parse(existingUsers));
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSignIn = () => {
    // Find the user with the provided email
    const user = users.find(user => user.email === email);

    if (user) {
      // Check if the password matches
      if (user.password === password) {
        // Login successful
        console.log('Login successful');
        // Reset fields and error state
        setEmail('');
        setPassword('');
        setError('');
        // Navigate to the appropriate dashboard based on user type
        console.log('usertype',user.userType)
        if (user.userType === 'admin') {
            
          navigation.navigate('AdminDashboard', { userType: 'admin' }); // Pass user type as a parameter
        } else {
          navigation.navigate('Dashboard', { userType: 'user' }); // Pass user type as a parameter
        }
      } else {
        // Incorrect password
        setError('Incorrect password');
      }
    } else {
      // User not found
      setError('User not found');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookwise App</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupLink}>New User? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff', // Dark blue background
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White text color
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#fff', // White border
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff', // White text color
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  signupLink: {
    fontSize: 16,
    color: '#fff', // White text color
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
