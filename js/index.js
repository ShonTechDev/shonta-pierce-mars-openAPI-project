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
// ============================================================
// Adding buttons via id's in html
const artBtn = document.querySelector("#get-art");
// const artistBtn = document.querySelector("#get-artist"); removed extra "get artist button from html, removed here in js^^
const randomBtn = document.querySelector("#get-random");

//api display from my fetch
const title = document.querySelector("#art-title");
const artist = document.querySelector("#artist-name");
const image = document.querySelector("#art-image");

//adding selector for grid rows to place recent art there
const gridRows = document.querySelectorAll(".art-flex-box div");

//additional viewing buttons
const randomMoreBtn = document.querySelector("#get-random-more");
randomMoreBtn.addEventListener("click", fetchRandomArtWork);

// ============================================================


// ======= 1st artwork Fetch art & artist =================

//fetch for Get Most Recent Art button functionality

// function fetchArtWork() { 
//     fetch('https://api.artic.edu/api/v1/artworks')
//     .then(response => response.json()) //.then sends a request, then we get access to the response / returns a promise 
//     .then(data => {
//         // console.log(data); //gets all data in normal js format
//         console.log(data.data[0].title); //datapoint 1
//         console.log(data.data[0].artist_display) //datapoint 2
//         console.log(data.data[0].image_id) //datapoint 3 //image of artwork
//         //console.logs displayed in console for me to check
//         //variables created to work with and connect to my website

//         const artwork = data.data[0]; //first artwork
//         const artTitle = artwork.title;
//         const artArtist = artwork.artist_display;
//         const imageId = artwork.image_id;


//         //artwork image url building from the image url equation

//         const imageURL = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

//         //display art on page

//         title.textContent = artTitle;
//         artist.textContent = artArtist;
//         image.src = imageURL;

//     })
//     .catch(error => {
//         console.error("Error fetching data:", error);
//     });
// }

// ======= Most Recent 3 artworks Fetch art & artist =================

        function fetchArtWork() {
            fetch('https://api.artic.edu/api/v1/artworks')
            .then(response => response.json())
            .then(data => {
                
                const artworks = data.data;

                //Populate Grid Gallery with first 3 artworks
                for (let i = 0; i < 3; i++) {
                    const artwork = artworks[i];
                    const artTitle = artwork.title;
                    const artArtist = artwork.artist_display;

                    const row = gridRows[i];
                    const rowTitle = row.querySelector("h4");
                    const rowImage = row.querySelector("img");
                    rowImage.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`; //added img element to grids
                    const rowArtist = row.querySelector("h5"); //added img elements to grid

                    rowTitle.textContent = artTitle;
                    rowArtist.textContent = artArtist;
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
        }

    // ================================================ 2nd Fetch ====================randomizer===============================

    //adding 2nd fetch hw 
    //implementing math.floor use my data.data[0] indexting to select a new piece and display it randomly as if walking through the gallery

    //random art

    function fetchRandomArtWork() {
        //second fetch / click navigation / = Art Admiration Zone
        fetch('https://api.artic.edu/api/v1/artworks')
             .then(response => response.json()) //.then sends a request, then we get access to the response / returns a promise 
             .then(data => {

                //storing vs console.log

                const artworks = data.data; //no index

                const artworksWithImages = artworks.filter(art => art.image_id); //filter out "null" images or artwork that do not have images attached (since site is "viewing" gallery)

                const randomIndex = Math.floor(Math.random() * artworks.length);

                const artwork = artworks[randomIndex]; //select random index for artwork

                const artTitle = artwork.title;
                const artArtist = artwork.artist_display;
                const imageId = artwork.image_id;

                //artwork image url building from the image url equation to display it

                const imageURL = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

                //display art gazer-art admiration zone: Art piece on page

                title.textContent = artTitle;
                artist.textContent = artArtist;
                image.src = imageURL; //displays image
              })
              .catch(error => {
                console.error("Error fetching data:", error);
            });
        }

    artBtn.addEventListener("click", fetchArtWork);
    randomBtn.addEventListener("click", fetchRandomArtWork);
    // artistBtn.addEventListener("click", fetchRandomArtWork); 
    // removed extra button on html