window.jsPDF = window.jspdf.jsPDF;
// const moviesInformation = JSON.parse(localStorage.getItem("moviesInformation"));

// function getUrlParameter(name) {
//   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
//   var results = regex.exec(location.search);
//   return results === null
//     ? ""
//     : decodeURIComponent(results[1].replace(/\+/g, " "));
// }


//checked and verified
function getBookingsForUser(username) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
  return bookings[username] || {};
}

//checked and verified
function getSeatsData(username, movieName, theatre, timing, date) {
  const userBookings = getBookingsForUser(username);
  const userMovieBookings = userBookings[movieName] || {};
  const userTheatreBookings = userMovieBookings[theatre] || {};
  const userTimingBookings = userTheatreBookings[timing] || [];
  const selectedBooking = userTimingBookings.find(
    (booking) => booking.date === date
  );
  console.log(selectedBooking);
  return selectedBooking ? selectedBooking.seats : [];
}

//checked and verified
function getTotalPrice(username, movieName, theatre, timing, date) {
  const userBookings = getBookingsForUser(username);
  const userMovieBookings = userBookings[movieName] || {};
  const userTheatreBookings = userMovieBookings[theatre] || {};
  const userTimingBookings = userTheatreBookings[timing] || [];
  const selectedBooking = userTimingBookings.find(
    (booking) => booking.date === date
  );
  console.log(selectedBooking);
  return selectedBooking ? selectedBooking.totalPrice : "";
}

//checked and verified
function redirectToHome() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  window.location.href = `../index.html?username=${username}`;
}

//checked and verified
function loadData() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username"); 
  const movieName = urlParams.get("movie");
  const theatre = urlParams.get("theatre");
  const timing = urlParams.get("timing");
  const date = urlParams.get("date");

  // const selectedMovie = moviesInformation.find(
  //   (movie) => movie.title === movieName
  // );
  
  // document.body.setAttribute("background",selectedMovie.imgSrc);
  // document.body.style.backgroundSize = "cover";
  // document.body.style.backgroundAttachment = "fixed";

  const seatsData = getSeatsData(username, movieName, theatre, timing, date);
  const totalPrice = getTotalPrice(username, movieName, theatre, timing, date);

  document.getElementById("movieName").textContent = movieName;
  document.getElementById("theatre").textContent = theatre;
  document.getElementById("timing").textContent = timing;
  document.getElementById("date").textContent = date;
  document.getElementById("totprice").textContent += totalPrice;

  const seatsSpan = document.getElementById("seats");
  seatsData.forEach((seat) => {
    const seatText = document.createElement("span");
    seatText.classList.add("seat-item");
    seatText.textContent = `${String.fromCharCode(65 + parseInt(seat.row))}${
      parseInt(seat.column) + 1
    } `;
    seatsSpan.appendChild(seatText);
  });
  generatePDF()
}

//checked and verified
function generatePDF() {
  const ticketElement = document.querySelector(".ticket");

  html2canvas(ticketElement).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );

    pdf.save("movie_ticket.pdf");
  });
}

document.addEventListener("DOMContentLoaded", () => loadData());