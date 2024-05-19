import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const AdminDashboardScreen = ({ navigation }: { navigation: any }) => {
  const handleSearchBooks = () => {
    navigation.navigate('BookSearch');
  };

  const handleIssueBooks = () => {
    navigation.navigate('IssueBook');
  };
  const handleReturnBooks = () => {
    navigation.navigate('ReturnBook'); // Navigate to ReturnBookScreen
  };
  const handleReissueBooks = () => {
    navigation.navigate('ReissueBook'); // Navigate to ReissueBookScreen
  };
  const handleAddBooks = () => {
    navigation.navigate('AddBook'); // Navigate to AddBookScreen
  };
  const handleRemoveBooks = () => {
    navigation.navigate('RemoveBook'); // Navigate to RemoveBookScreen
  };
  const handleUpdateBooks = () => {
    navigation.navigate('UpdateBook'); // Navigate to UpdateBookScreen
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.option} onPress={handleSearchBooks}>
        <Text style={styles.optionText}>Search Books</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}  onPress={handleAddBooks}>
        <Text style={styles.optionText}>Add Books</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}  onPress={handleRemoveBooks}>
        <Text style={styles.optionText}>Remove Books</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}  onPress={handleUpdateBooks}>
        <Text style={styles.optionText}>Update Books</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleIssueBooks}>
        <Text style={styles.optionText}>Issue Books to User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleReissueBooks}>
        <Text style={styles.optionText}>ReIssue Books to User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleReturnBooks}>
        <Text style={styles.optionText}>Return Books</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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

export default AdminDashboardScreen;
