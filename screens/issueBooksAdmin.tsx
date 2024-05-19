import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Book {
    id: string;
    title: string;
    category: string;
    available: number;
    total: number;
  }


const IssueBookScreen = () => {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const booksData = await AsyncStorage.getItem('booksData');
        if (booksData) {
          setBooks(JSON.parse(booksData));
        }
      } catch (error) {
        console.error('Error fetching books data:', error);
      }
    };

    fetchBooksData();
  }, []);

  const clearIssuedBooks = async () => {
    try {
      await AsyncStorage.removeItem('issuedBooks');
      setSuccessMessage('Issued books cleared successfully');
    } catch (error) {
      console.error('Error clearing issued books:', error);
    }
  };

  const handleIssueBook = async () => {
    try {
      // Find the selected book from the booksData array
      const selectedBookIndex = books.findIndex(book => book.id === bookId);

      if (selectedBookIndex === -1) {
        console.error('Selected book not found.');
        return;
      }

      const selectedBook = books[selectedBookIndex];

      // Check if book is available
      if (selectedBook.available <= 0) {
        console.error('Book is not available.');
        return;
      }

      

      // Implement logic to issue the selected book to the user with userId
      console.log('Issuing book...');
      console.log('Book ID:', bookId);
      console.log('Title:', selectedBook.title);
      console.log('Category:', selectedBook.category);
      console.log('User ID:', userId);
      console.log('available0',selectedBook.available)

      // For demonstration, save issued book to AsyncStorage
      const issuedBooks = await AsyncStorage.getItem('issuedBooks');
      let updatedBooks = issuedBooks ? JSON.parse(issuedBooks) : [];
      updatedBooks.push({ 
        bookId, 
        title: selectedBook.title,
        category: selectedBook.category,
        userId, 
        available:selectedBook.available,
        issueDate: "2024-04-21T23:53:55.667Z" 
      });
      console.log('updated',updatedBooks)
      await AsyncStorage.setItem('issuedBooks', JSON.stringify(updatedBooks));

      // For demonstration, show success message
      setSuccessMessage('Book issued successfully');

      // Reset input fields after issuing the book
      setBookId('');
      setUserId('');
    } catch (error) {
      console.error('Error issuing book:', error);
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
      <Button title="Issue Book" onPress={handleIssueBook} />
      {/* <Button title="Clear Issued Books" onPress={clearIssuedBooks} /> */}
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
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
});

export default IssueBookScreen;
