/*
Assignment 1
Write a function sumAsync that takes two numbers as arguments and uses a callback to return their sum after
a delay of 1 second.
*/

function sumAsync(a, b, callback) {
    setTimeout(() => {
        const sum = a + b;
        callback(sum);
    }, 1000);
}

// Example usage:
sumAsync(5, 10, (result) => {
    console.log("The sum is:", result); // output : The sum is: 15
});






/*
Assignment 2
Create a function getData that returns a Promise. The Promise should resolve after 2 seconds with a message
"Data fetched successfully."
*/

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched successfully.");
        }, 2000);
    });
}
getData().then((message) => {
    console.log(message);
});
// output: Data fetched successfully.





/*
Assignment 3
Write an asynchronous function fetchData that uses the Fetch API to retrieve data from a given URL and returns
the parsed JSON response.
API to be used - https://jsonplaceholder.typicode.com/todos/1
*/

async function fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
fetchData().then(data => {
    console.log(data);
});
// // output: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }







/*
Assignment 4
Write an asynchronous function fetchData that uses the Fetch API to retrieve data from a 
given URL (https://jsonplaceholder.typicode.com/todos/1) and returns the parsed JSON response. 
*/

async function fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error if needed
    }
}

fetchData().then(data => {
    console.log(data);
}).catch(error => {
    console.error('Failed to fetch data:', error);
});

// // output: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }






/*
Assignment 5
Implement a function multiplyWithCallback that takes an array of numbers and a callback function. The
function should multiply each element of the array by 2 and pass the result to the callback.
*/

function multiplyWithCallback(numbers, callback) {
    const results = numbers.map(num => num * 2);
    callback(results);
}
const numbersArray = [1, 2, 3, 4, 5];
multiplyWithCallback(numbersArray, (result) => {
    console.log("Multiplied results:", result);
});

// // output: Multiplied results: [ 2, 4, 6, 8, 10 ]






/*
Assignment 6
Create a function fetchUserDataAndPosts that takes a user ID and fetches the user details and their posts
using separate API calls. Use promise chaining to ensure the posts are retrieved only after the user details are
fetched. Return an object with user details and posts.
API to be used-
For user: https://jsonplaceholder.typicode.com/users/${userId}
For post: https://jsonplaceholder.typicode.com/posts?userId=${userId}
*/

async function fetchUserDataAndPosts(userId) {
    const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    
    try {
        // Fetch user details
        const userResponse = await fetch(userUrl);
        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();

        // Fetch user posts
        const postsResponse = await fetch(postsUrl);
        if (!postsResponse.ok) {
            throw new Error('Failed to fetch user posts');
        }
        const userPosts = await postsResponse.json();

        // Return an object with user details and posts
        return {
            user: userData,
            posts: userPosts
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

fetchUserDataAndPosts(1)
    .then(data => {
        console.log('User Data:', data.user);
        console.log('User Posts:', data.posts);
    })
    .catch(error => {
        console.error('Failed to fetch user data and posts:', error);
    });





/*
Assignment 7
Write a function fetchMultipleData that takes an array of URLs and uses Promise.all() to fetch data from all the
URLs concurrently. Return an array of responses.
API to be used
Change todo id for each API call-  https://jsonplaceholder.typicode.com/todos/1
*/

async function fetchMultipleData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        
        // Check if all responses are OK
        const data = await Promise.all(responses.map(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.url}`);
            }
            return response.json();
        }));

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
];

fetchMultipleData(urls)
    .then(data => {
        console.log('Fetched data:', data);
    })
    .catch(error => {
        console.error('Failed to fetch multiple data:', error);
    });

// output:
// Fetched data: [
//     { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
//     {
//       userId: 1,
//       id: 2,
//       title: 'quis ut nam facilis et officia qui',
//       completed: false
//     },
//     { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false }
//   ]





/*
Assignment 8
Create a function racePromises that takes an array of promises and returns the result of the first promise that
resolves or rejects. Use Promise.race() to implement this.
*/
function racePromises(promises) {
    return Promise.race(promises)
        .then(result => {
            return { status: 'resolved', value: result };
        })
        .catch(error => {
            return { status: 'rejected', reason: error };
        });
}
const promise1 = new Promise((resolve) => setTimeout(() => resolve('First promise resolved'), 1000));
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject('Second promise rejected'), 500));
const promise3 = new Promise((resolve) => setTimeout(() => resolve('Third promise resolved'), 1500));

racePromises([promise1, promise2, promise3])
    .then(result => {
        console.log('Result:', result);
    });


// output :
Result: { status: 'rejected', reason: 'Second promise rejected' }





//  +++++++++++++++++++++++++++++++++++++++++++++++++++