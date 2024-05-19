import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateBookScreen = ({ navigation }: { navigation: any }) => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [unitsToUpdate, setUnitsToUpdate] = useState('');

  const handleUpdateBook = async () => {
    // Validation: Check if all fields are filled
    if (!bookId || !title || !category || !unitsToUpdate) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Fetch existing books data from AsyncStorage
      const existingBooksDataString = await AsyncStorage.getItem('booksData');
      let existingBooksData = existingBooksDataString ? JSON.parse(existingBooksDataString) : [];

      // Find the index of the book with the provided bookId
      const index = existingBooksData.findIndex((book: any) => book.id === bookId);

      // If the book with the provided ID is not found
      if (index === -1) {
        Alert.alert('Error', 'Book not found');
        return;
      }

      // Update the book with the provided information
      existingBooksData[index].title = title;
      existingBooksData[index].category = category;
      existingBooksData[index].available += parseInt(unitsToUpdate);

      // Save the updated books data to AsyncStorage
      await AsyncStorage.setItem('booksData', JSON.stringify(existingBooksData));

      // Show a success message
      Alert.alert('Success', 'Book updated successfully');

      // Navigate back to the admin dashboard or any other desired screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating book:', error);
      Alert.alert('Error', 'An error occurred while updating the book');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Book ID"
        value={bookId}
        onChangeText={text => setBookId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={text => setCategory(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Units to Update"
        value={unitsToUpdate}
        onChangeText={text => setUnitsToUpdate(text)}
        keyboardType="numeric"
      />
      <Button title="Update Book" onPress={handleUpdateBook} />
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

export default UpdateBookScreen;
