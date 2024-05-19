import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RemoveBookScreen = ({ navigation }: { navigation: any }) => {
  const [bookIdToRemove, setBookIdToRemove] = useState('');

  const handleRemoveBook = async () => {
    // Check if bookIdToRemove is not empty
    if (!bookIdToRemove) {
      Alert.alert('Error', 'Please enter the Book ID to remove');
      return;
    }

    try {
      // Fetch existing books data from AsyncStorage
      const existingBooksDataString = await AsyncStorage.getItem('booksData');
      let existingBooksData = existingBooksDataString ? JSON.parse(existingBooksDataString) : [];

      // Find the index of the book to remove
      const bookIndexToRemove = existingBooksData.findIndex((book: { id: string }) => book.id === bookIdToRemove);

      // Check if the book exists
      if (bookIndexToRemove === -1) {
        Alert.alert('Error', 'Book not found');
        return;
      }

      // Remove the book from the existing books data
      existingBooksData.splice(bookIndexToRemove, 1);

      // Save the updated books data to AsyncStorage
      await AsyncStorage.setItem('booksData', JSON.stringify(existingBooksData));
      console.log('Book removed successfully');

      // Clear the input field
      setBookIdToRemove('');
      Alert.alert('Success', 'Book removed successfully');
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Book ID to Remove"
        value={bookIdToRemove}
        onChangeText={text => setBookIdToRemove(text)}
      />
      <Button title="Remove Book" onPress={handleRemoveBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RemoveBookScreen;
