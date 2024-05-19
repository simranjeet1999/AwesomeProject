import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBookScreen = ({ navigation }: { navigation: any }) => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState('');
  const [total, setTotal] = useState('');

  const handleAddBook = async () => {
    // Validation: Check if all fields are filled
    if (!bookId || !title || !category || !available || !total) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Create a new book object
    const newBook = {
      id: bookId,
      title: title,
      category: category,
      available: parseInt(available), // Convert to number
      total: parseInt(total), // Convert to number
    };

    try {
      // Fetch existing books data from AsyncStorage
      const existingBooksDataString = await AsyncStorage.getItem('booksData');
      let existingBooksData = existingBooksDataString ? JSON.parse(existingBooksDataString) : [];

      // Append the new book to the existing books data
      existingBooksData.push(newBook);

      // Save the updated books data to AsyncStorage
      await AsyncStorage.setItem('booksData', JSON.stringify(existingBooksData));
      console.log('Book added successfully:', newBook);

      // Show success alert
      Alert.alert('Success', 'Book added successfully');
    } catch (error) {
      console.error('Error saving book to AsyncStorage:', error);
      // Show error alert
      Alert.alert('Error', 'Failed to add book');
    }

    // Navigate back to the admin dashboard or any other desired screen
    navigation.goBack(); // Assuming the admin dashboard is the previous screen
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
        placeholder="Available"
        value={available}
        onChangeText={text => setAvailable(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Total"
        value={total}
        onChangeText={text => setTotal(text)}
        keyboardType="numeric"
      />
      <Button title="Add Book" onPress={handleAddBook} />
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

export default AddBookScreen;
