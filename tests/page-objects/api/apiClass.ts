import axios from 'axios';
import { Utilities } from '../utilities';

const utility = new Utilities()

export class APIClass {

    async createUser() {

        const details = await utility.readAPIDetails();
        // Define the API URL
        const apiUrl = details.createNewUser.apiUrl
        // Define the username and password parameters
        const username = details.createNewUser.username + await utility.enterRandomNumber(4)
        const password = details.createNewUser.password

        // Create an object with the parameters
        const requestBody = {
            userName: username,
            password: password,
        };
        try {
            // Make the POST request using Axios
            const response = await axios.post(apiUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
            });

            // Log the API response data
            console.log('API Response:', response.data);
            const createdUser = {
                "username": response.data.username,
                "password": password,
                "userID": response.data.userID
            }
            details.createdUser = createdUser
            console.log("createdUser user details: ", details.createdUser)
            await utility.writeJSONToFile('api.json', details)
        } catch (error) {
            // Log any errors
            console.error('API Error:', error);
        }
    }

    async generateToken() {

        const details = await utility.readAPIDetails();
        // Define the API URL
        const apiUrl = details.generateToken.apiUrl
        // Define the username and password parameters
        const username = details.createdUser.username
        const password = details.createdUser.password
        // Create an object with the parameters
        const requestBody = {
            userName: username,
            password: password,
        };
        try {
            // Make the POST request using Axios
            const response = await axios.post(apiUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
            });
            // Log the API response data
            console.log('API Response:', response.data);
            const generatedToken = {
                "token": response.data.token,
            }
            details.generatedToken = generatedToken
            console.log("Generated token details: ", details.generatedToken)
            await utility.writeJSONToFile('api.json', details)
        } catch (error) {
            // Log any errors
            console.error('API Error:', error);
        }
    }

    async getBooks(){

        const details = await utility.readAPIDetails();
        // Define the API URL
        const apiUrl = details.books.apiUrl
        try {
            // Make the POST request using Axios
            const response = await axios.get(apiUrl,{
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
            });
            // Log the API response data
            const data = response.data
            // console.log('API Response:', data);
            // Access ISBN values
            const bookIsbn = data.books.map(book => ({
                isbn: book.isbn
              }));
            // console.log(bookIsbn);

            details.availableBooks = bookIsbn
            console.log("Available Books details: ", details)    
            await utility.writeJSONToFile('api.json', details)
        } catch (error) {
            // Log any errors
            console.error('API Error:', error);
        }

    }

    async addBooksAgainstUser(){
        const details = await utility.readAPIDetails();
        // Define the API URL
        const apiUrl = details.addBooks.apiUrl
        // Define the username and password parameters
        const userID = details.createdUser.userID
        const allBooks = details.availableBooks
        const token = details.generatedToken.token

        console.log(allBooks);
        // Create an object with the parameters
        const requestBody = {
            userId: userID,
            collectionOfIsbns: allBooks,
        };
        try {
            // Make the POST request using Axios
            const response = await axios.post(apiUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Log the API response data
            console.log('API Response:', response.data);
       
        } catch (error) {
            // Log any errors
            console.error('API Error:', error);
        }
    }

    async removeBookagainstUser(){
        const details = await utility.readAPIDetails();
        // Define the API URL
        const apiUrl = details.deleteBook.apiUrl
        // Define the username and password parameters
        const userID = details.createdUser.userID
    
        const ISBN = details.availableBooks.shift()?.isbn;

        console.log('You are going to delete the Book ISBN #:',ISBN)

        const token = details.generatedToken.token

        // Create an object with the parameters
        const requestBody = {
            isbn: ISBN,
            userId: userID,
        };
        try {
            const response = await axios.delete(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                data: requestBody, // Send the request body as 'data'
                timeout: 10000, // Adjust the timeout as needed
            });
    
            console.log('DELETE API Response:', response.data);
        } catch (error) {
            console.error('DELETE API Error:', error.message);
        }
        console.log('Going to remove deleted book ISBN from api.json file')    
        await utility.writeJSONToFile('api.json', details)
    }
}