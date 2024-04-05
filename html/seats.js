const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

renderSeats(10, 13);
const seats = document.querySelectorAll(".roww .seat:not(.occupied)");

function renderSeats(rows, columns) {
  const urlParams = new URLSearchParams(window.location.search);
  const movie = urlParams.get("movie");
  const timing = urlParams.get("timing");
  const theatre = urlParams.get("theatre");
  const date = urlParams.get("date");
  container.innerHTML = "<div class='screen'></div>";
  let seatHtml = "";
  for (let i = 0; i < rows; i++) {
    seatHtml += "<div class='roww'>";
    for (let j = 0; j < columns; j++) {
      const seatStatus = checkSeatStatus(i, j, movie, timing, theatre, date);
      const seatNum = j+1;
      seatHtml += `<div class="seat ${seatStatus}" data-row=${i} data-column=${j} >${seatNum}</div>`;
    }
    seatHtml += "</div>";
  }

  container.innerHTML += seatHtml;
}

function checkSeatStatus(row, column, movie, timings, theatreName, date) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
  for (const username in bookings) {
    for (const movieName in bookings[username]) {
      if(movieName==movie){
        for (const theatre in bookings[username][movieName]) {
          if(theatre==theatreName){
            for (const timing in bookings[username][movieName][theatre]) {
              const bookedSeats = bookings[username][movieName][theatre][
                timing
              ].flatMap((booking) => booking.seats);
              for (const seat of bookedSeats) {
                if (
                  seat.row == row &&
                  seat.column == column
                  // movieName==movie &&
                  // timing==timings &&
                  // theatre==theatreName &&
                  // bookings[username][movieName][theatre][timing][0].date==date
                ) {
                  console.log("occupied");
                  return "occupied";
                }
              }
            }
          }
        }
      }
    }
  }
  return "";
}

function updateSeatCount() {
  const selectedSeats = document.querySelectorAll(".roww .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
}

function bookTickets() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieName = urlParams.get("movie");
  const timing = urlParams.get("time"); // Change to 'timing' from 'time'
  const theatre = urlParams.get("theatre");
  const date = urlParams.get("date");
  const username = urlParams.get("name"); // Change to 'name' from 'username'
  const price = urlParams.get("price");

  const selectedSeats = document.querySelectorAll(".roww .seat.selected");
  const totalPrice = price * selectedSeats.length;

  const selectedSeatsDetails = [];

  selectedSeats.forEach((seat) => {
    const row = seat.getAttribute("data-row");
    const column = seat.getAttribute("data-column");
    selectedSeatsDetails.push({ row: row, column: column });
  });

  // Construct the booking object
  const booking = {
    movieName: movieName,
    theatre: theatre,
    timing: timing,
    date: date,
    seats: selectedSeatsDetails,
    totalPrice: totalPrice,
  };

  // Get existing bookings for the user
  let userBookings = JSON.parse(localStorage.getItem("bookings")) || {};

  // Get or initialize the user's bookings for the current movie
  let userMovieBookings = userBookings[username] || {};
  userBookings[username] = userMovieBookings;

  // Get or initialize the user's bookings for the current theatre
  let userTheatreBookings = userMovieBookings[movieName] || {};
  userMovieBookings[movieName] = userTheatreBookings;

  // Get or initialize the user's bookings for the current timing
  let userTimingBookings = userTheatreBookings[theatre] || {};
  userTheatreBookings[theatre] = userTimingBookings;

  // Add the new booking
  if (!userTimingBookings[timing]) {
    userTimingBookings[timing] = [];
  }
  userTimingBookings[timing].push(booking);

  // Update the bookings object in local storage
  localStorage.setItem("bookings", JSON.stringify(userBookings));
  const ticketURL = `ticket.html?movie=${encodeURIComponent(
    movieName
  )}&theatre=${encodeURIComponent(theatre)}&timing=${encodeURIComponent(
    timing
  )}&date=${encodeURIComponent(date)}&username=${encodeURIComponent(
    username
  )}`;
  window.location.href = ticketURL;
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSeatCount();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieName = urlParams.get("movie");
  const timing = urlParams.get("time"); // Change to 'timing' from 'time'
  const theatre = urlParams.get("theatre");
  const date = urlParams.get("date");
  const username = urlParams.get("name"); // Change to 'name' from 'username'
  const price = urlParams.get("price");

  // Get reference to the respective <p> tags in the movie details container
  const movieNameElement = document.getElementById("movieName");
  const showDateElement = document.getElementById("showDate");
  const showTimeElement = document.getElementById("showTime");
  const theatreElement = document.getElementById("theatre");

  // Set the innerHTML of the <p> tags with the respective details
  movieNameElement.innerHTML = `<strong>Movie Name:</strong> ${movieName}`;
  showDateElement.innerHTML = `<strong>Show Date:</strong> ${date}`;
  showTimeElement.innerHTML = `<strong>Show Time:</strong> ${timing}`;
  theatreElement.innerHTML = `<strong>Theatre:</strong> ${theatre}`;
});