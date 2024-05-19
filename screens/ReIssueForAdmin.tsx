import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReissueBookScreen = () => {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReissueBook = async () => {
    try {
      // Retrieve issued books from AsyncStorage
      const issuedBooks = await AsyncStorage.getItem('issuedBooks');
      if (!issuedBooks) {
        setErrorMessage('No books have been issued.');
        return;
      }
      const updatedBooks = JSON.parse(issuedBooks);

      // Find the book to reissue
      const bookIndex = updatedBooks.findIndex((book: { bookId: string; userId: string; }) => book.bookId === bookId && book.userId === userId);
      if (bookIndex === -1) {
        setErrorMessage('Book not found or not issued to this user.');
        return;
      }

      // Get the return date of the book
      const returnDate = new Date(updatedBooks[bookIndex].issueDate);
      returnDate.setDate(returnDate.getDate() + 7); // Assuming return date is 7 days from issue date

      // Check if the current date is close to the return date
      const currentDate = new Date();
      const daysUntilReturn = Math.floor((returnDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntilReturn > 3) {
        setErrorMessage('Cannot reissue the book. Return date is not approaching.');
        return;
      }

      // Update return date to current date
      updatedBooks[bookIndex].issueDate = new Date().toISOString();

      // Save updated issued books back to AsyncStorage
      await AsyncStorage.setItem('issuedBooks', JSON.stringify(updatedBooks));

      // Show success message
      setSuccessMessage('Book reissued successfully');

      // Clear input fields
      setBookId('');
      setUserId('');
    } catch (error) {
      console.error('Error reissuing book:', error);
      setErrorMessage('An error occurred while reissuing the book.');
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
        placeholder="User ID"
        value={userId}
        onChangeText={text => setUserId(text)}
      />
      <Button title="Reissue Book" onPress={handleReissueBook} />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
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
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
});

export default ReissueBookScreen;
