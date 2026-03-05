/* Requirements:
create a website
-html
-css
-js
-minimum 2 data points (ex. artist + art type)
-2 different endpoints:
    - https://api.artic.edu/api/v1/artworks
    - https://api.artic.edu/api/v1/artists
*/

// fetch('https://api.artic.edu/api/v1/artworks')
//     .then(response => response.json()) //.then sends a request, then we get access to the response / returns a promise 
//     .then(data => {
//         console.log(data); //gets actual data in normal js format
//     })
//     .catch(error => {
//         console.error("Error fetching data:", error);
//     });

// ^ prints the ENTIRE RESPONSE object to the call; 1st step to ensure I can bring in and inspect the full response


fetch('https://api.artic.edu/api/v1/artworks')
    .then(response => response.json()) //.then sends a request, then we get access to the response / returns a promise 
    .then(data => {
        // console.log(data); //gets all data in normal js format
        console.log(data.data[0].title); //datapoint 1
        console.log(data.data[0].artist_display) //datapoint 2
        console.log(data.data[0].image_id) //datapoint 3 //image of artwork
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

    //self-note: for my project next steps, place 2 or more points within a variable to work with it easier (for example to change, or add data points) to choose & vary what I want to display

    //project note = choose 3rd datapoint, image ID; Found API Documentation to display image, so I'm thinking I would create an equation/concatenate it into the url formula given

    //project goals = display title, artist, and image of artwork on page
    //advanced wishlist = allow the user to search a parameter and receive this info based on their preference 