/* Requirements:
create a website
-html
-css
-js
-minimum 2 data points (ex. artist + art type)
-2 different endpoints:
    - https://api.artic.edu/api/v1/artworks
    - https://api.artic.edu/api/v1/artists - my second endpoint  to add
*/

// Adding buttons via id's in html
const artBtn = document.querySelector("#get-art");
const artBtnMore = document.querySelector("#get-more-art");
const randomBtn = document.querySelector("#get-random");

//footer
const footer = document.createElement("footer");
const year = new Date().getFullYear();
footer.textContent = `© ${year} Shonta Pierce`;
document.body.append(footer);

//api display from my fetch
const title = document.querySelector("#art-title");
const artist = document.querySelector("#artist-name");
const image = document.querySelector("#art-image");
//adding selector for grid rows to place recent art there
const gridRows = document.querySelectorAll(".art-flex-box div");
//additional viewing buttons
// const randomMoreBtn = document.querySelector("#get-random-more"); //revision-removed extra buttons
// randomMoreBtn.addEventListener("click", fetchRandomArtWork); //revision-removed extra buttons

//2nd endpoint selectors for artists
const artistBtn = document.querySelector("#get-artist");
const artistInfo = document.querySelector("#artist-info");

//artist image display
const artistImage = document.querySelector("#artist-image");


// ====== 1st 3 artworks as updated in API == Fetch art & artist =======

        function fetchArtWork() {
            fetch('https://api.artic.edu/api/v1/artworks?page=' + Math.floor(Math.random()*50) + '&limit=100')
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

// ======== 2nd Fetch======randomizer===============

//implementing math.floor use my data.data[0] indexting to select a new piece and display it randomly as if walking through the gallery

//'https://api.artic.edu/api/v1/artworks' original api for 1-12 artworks on 1st page

    function fetchRandomArtWork() {
        //second fetch / click navigation / = Art Admiration Zone
        fetch('https://api.artic.edu/api/v1/artworks?page=' + Math.floor(Math.random()*50) + '&limit=100')
             .then(response => response.json()) //.then sends a request, then we get access to the response / returns a promise 
             .then(data => {

                //storing vs console.log

                const artworks = data.data; //no index

                const artworksWithImages = artworks.filter(art => art.image_id); //filter out "null" images or artwork that do not have images attached (since site is "viewing" gallery)

                const randomIndex = Math.floor(Math.random() * artworksWithImages.length); //uses my filtered array to remove artwork without imgs

                const artwork = artworksWithImages[randomIndex]; //select random index for artwork

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

// ================= Artist Spotlight ===============

function fetchArtist() {
    fetch('https://api.artic.edu/api/v1/artists')
        .then(response => response.json())
        .then(data => {
            
            const artists = data.data;
            
            const randomIndex = Math.floor(Math.random() * artists.length);
            const artist = artists[randomIndex];
    
            const artistName = artist.title;
            const nationality = artist.nationality;

            artistInfo.textContent = artistName + " - " + nationality; //concatenated to display desired info

            //adding artist image URL 
            const imageId = artist.image_id;

            // if (imageId !== null) {
            //     artistImage.src = `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`;
            // } else {
            //     artistImage.src = ""; //if none
            // }

        })
        .catch(error => {
            console.error("Error fetching artist:", error);
        });
}


    //connecting the buttons to the endpoints
    artBtn.addEventListener("click", fetchArtWork);
    randomBtn.addEventListener("click", fetchRandomArtWork);
    // artistBtn.addEventListener("click", fetchArtist); //revision-removed search artist button
    artBtnMore.addEventListener("click", fetchArtWork);

    //main section play buttons

    document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("background-video");
    const playBtn = document.getElementById("play-btn");
    const pauseBtn = document.getElementById("pause-btn");

    playBtn.addEventListener("click", function() {
        video.play();
    });

    pauseBtn.addEventListener("click", function() {
        video.pause();
    });
});


