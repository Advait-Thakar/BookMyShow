document.addEventListener("DOMContentLoaded", function() {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = new Date();

    // Select the calendar buttons container
    const calendarButtonsContainer = document.getElementById('calendar-buttons');
    let movieName = '';
    let formattedDate = null;

    // Loop through 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dayOfWeek = daysOfWeek[date.getDay()];
        const month = date.toLocaleString('default', { month: 'short' });
        const dayOfMonth = date.getDate();

        // Create a new button element
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-primary', 'btn-date', 'col-md', 'me-1','calender-btn'); // Added classes for Bootstrap grid and spacing
        button.textContent = `${dayOfWeek} \n ${dayOfMonth} \n ${month} \n`;

        // Attach click event listener to fetch movie show timings
        button.addEventListener('click', function() {
            formattedDate = formatDate(date); // Format date as YYYY-MM-DD
            addDateParameterToUrl(formattedDate); // Add date parameter to URL
        
            // Get the full URL of the page
            const url = window.location.href;
        
            // Split the URL by '?' to get the part after the '?'
            const parts = url.split('?');
        
            // Initialize a variable to store the movie name
            // let movieName = '';
        
            // Check if there are query parameters
            if (parts.length > 1) {
                // Split the query parameters by '&' to get key-value pairs
                const queryParams = parts[1].split('&');
        
                // Loop through each key-value pair
                for (const param of queryParams) {
                    // Split the key-value pair by '='
                    const [key, value] = param.split('=');
        
                    // Check if the key is 'movie'
                    if (key === 'movie') {
                        // Decode the URI component to handle special characters
                        movieName = decodeURIComponent(value);
                        break; // Exit the loop once the movie name is found
                    }
                }
            }
        
            // Check if a movie name is found
            if (movieName) {
                fetchMovieShowTimings(movieName, formattedDate); // Fetch movie show timings
            } else {
                console.error('Movie name not found in URL.');
            }
        });

        // Append the button to the container
        calendarButtonsContainer.appendChild(button);
    }
    
    // Function to format date as YYYY-MM-DD
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // Function to add date parameter to URL
    function addDateParameterToUrl(date) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('date', date);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    }

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
        title.textContent = data.theatre_name;
        title.style.textAlign= "left";

        const timingList = document.createElement('div');
        timingList.classList.add('d-flex', 'justify-content-between', 'flex-wrap');

        data.time_slots.forEach((timing, index) => {
            const timingButton = document.createElement('button');
            timingButton.classList.add('btn', 'btn-outline-primary', 'btn-timing', 'mb-2');

            timingButton.textContent = timing;
            timingButton.addEventListener('click', () => {
                // Handle click event for timing button (e.g., open seat selection window)
                const urlParams = new URLSearchParams();
                urlParams.append('name', 'Advait');
                urlParams.append('movie', movieName);
                urlParams.append('date', formattedDate);
                urlParams.append('time', timing);
                urlParams.append('theatre', data.theatre_name);
                urlParams.append('price', 350.00);
                const seatsUrl = `seats.html?${urlParams.toString()}`;
                window.location.href = seatsUrl;
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

    // Example: Fetch show timings for the movie with ID 1
    // fetchMovieShowTimings(1);
});
