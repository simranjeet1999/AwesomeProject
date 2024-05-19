import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    // For demonstration, navigate back to the login screen
    navigation.navigate('Login');
  };
  const handleSearchBooks = () => {
    navigation.navigate('BookSearch');
  };
  const handleReissueBooks = () => {
    navigation.navigate('ReissueBook'); // Navigate to ReissueBookScreen
  };
  // Function to navigate to the "See My Books" screen
  const handleSeeMyBooks = () => {
    navigation.navigate('MyBooks');
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity style={styles.option} onPress={handleSearchBooks}>
        <Text style={styles.optionText}>Search Books</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleReissueBooks}>
        <Text style={styles.optionText}>ReIssue Books</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleSeeMyBooks}>
        <Text style={styles.optionText}>See My Books</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: 200,
    height: 100,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DashboardScreen;
