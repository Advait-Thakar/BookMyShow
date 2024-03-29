document.addEventListener("DOMContentLoaded", function() {
    // Fetch theater data from Flask backend
    // function fetchTheaterData() {
    //     axios.get('/theater-data')
    //         .then(response => {
    //             const theaterData = response.data;
    //             theaterData.forEach(data => {
    //                 const theaterTile = createTheaterTile(data);
    //                 document.getElementById('theatre-tile').appendChild(theaterTile);
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error fetching theater data:', error);
    //         });
    // }

    // Create theater tile element
    function createTheaterTile(data) {
        console.log('hello');
        console.log(data);
        const theaterTile = document.createElement('div');
        theaterTile.classList.add('mt-3', 'col-md-6'); // Adjusted col-md-6 class

        const card = document.createElement('div');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header', 'text-end');

        const infoButton = document.createElement('button');
        infoButton.classList.add('btn', 'btn-outline-primary', 'btn-info');
        infoButton.innerHTML = '<i class="fas fa-info-circle"></i>';
        infoButton.addEventListener('click', () => {
            // Handle click event for info button (e.g., open modal with theater details)
            displayTheaterDetails(data);
        });

        cardHeader.appendChild(infoButton);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = data.theater_name;
        title.style.textAlign= "left";

        const timingList = document.createElement('div');
        timingList.classList.add('d-flex', 'justify-content-between', 'flex-wrap');

        data.time_slots.forEach((timing, index) => {
            const timingButton = document.createElement('button');
            timingButton.classList.add('btn', 'btn-outline-primary', 'btn-timing', 'mb-2');

            timingButton.textContent = timing;
            timingButton.addEventListener('click', () => {
                // Handle click event for timing button (e.g., open seat selection window)
                alert(`Clicked on ${timing} at ${data.theater_name}`);
            });

            timingList.appendChild(timingButton);
        });

        const fav = document.createElement('btn');
        fav.classList.add('btn','btn-outline-danger','btn-favorite');
        const heart = document.createElement('i');
        heart.classList.add('far','fa-heart');
        fav.appendChild(heart);

        cardHeader.appendChild(title);
        cardHeader.appendChild(fav);
        cardBody.appendChild(timingList);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        theaterTile.appendChild(card);

        return theaterTile;
    }

    function fetchMovieShowTimings(movie_name,date) {
        axios.get(`http://127.0.0.1:5000/movie-show-timings/movie/${movie_name}/date/${date}`)
            .then(response => {
                const movieShowTimings = response.data;
                updateTheaterTiles(movieShowTimings);
            })
            .catch(error => {
                console.error('Error fetching movie show timings:', error);
            });
    }
    
    // Update theater tiles with show timings data
    function updateTheaterTiles(showTimingsData) {
        // Clear previous theater tiles
        console.log('showTimingsData:', showTimingsData);
        const theaterTileContainer = document.getElementById('theatre-tile');
        theaterTileContainer.innerHTML = '';
    
        // Create and populate the theater tiles with show timings
        showTimingsData.forEach(data => {
            const theaterTile = createTheaterTile(data);
            theaterTileContainer.appendChild(theaterTile);
        });
    }
    
    // Fetch show timings for the selected movie
    // function fetchMovieShowTimings(movieId) {
    //     axios.get(`http://127.0.0.1:5000/movie-show-timings/${movieId}`)
    //         .then(response => {
    //             const movieShowTimings = response.data;
    //             updateTheaterTiles(movieShowTimings);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching movie show timings:', error);
    //         });
    // }

    // Example: Fetch show timings for the movie with ID 1
    // fetchMovieShowTimings(1);
});
