const new_bookings = {
  "Advait": {
    "Article_370": {
      "Theatre C Banglore": {
        "12:00 PM": [
          {
            movieName: "Article_370",
            theatre: "Theatre C Banglore",
            timing: "12:00 PM",
            date: "2024-04-07",
            seats: [
              { row: "0", column: "4" },
              { row: "0", column: "5" },
              { row: "0", column: "6" },
            ],
            totalPrice: 2700,
          },
        ],
      },
      "Theatre C Banglore": {
        "3:00 PM": [
          {
            movieName: "Article_370",
            theatre: "Theatre C Banglore",
            timing: "3:00 PM",
            date: "2024-04-07",
            seats: [
              { row: "0", column: "0" },
              { row: "0", column: "1" },
              { row: "0", column: "2" },
              { row: "0", column: "3" },
              { row: "0", column: "4" },
            ],
            totalPrice: 3000,
          },
        ],
      },
    },
    "Animal": {
      "Theatre B Delhi": {
        "11:00 AM": [
          {
            movieName: "Animal",
            theatre: "Theatre B Delhi",
            timing: "11:00 AM",
            date: "2024-04-06",
            seats: [
              { row: "0", column: "5" },
              { row: "0", column: "6" },
              { row: "0", column: "7" },
            ],
            totalPrice: 2700,
          },
        ],
      },
    },
    "Dune_Part_2": {
      "Theatre D Kolkata": {
        "7:00 PM": [
          {
            movieName: "Dune_Part_2",
            theatre: "Theatre D Kolkata",
            timing: "7:00 PM",
            date: "2024-04-08",
            seats: [
              { row: "0", column: "0" },
              { row: "0", column: "1" },
              { row: "0", column: "5" },
              { row: "0", column: "6" },
              { row: "0", column: "11" },
              { row: "0", column: "12" },
            ],
            totalPrice: 4200,
          },
        ],
      },
    },
  },
  "Anshul": {
    "Dune_Part_2": {
      "Theatre D Kolkata": {
        "7:00 PM": [
          {
            movieName: "Dune_Part_2",
            theatre: "Theatre D Kolkata",
            timing: "7:00 PM",
            date: "2024-04-08",
            seats: [
              { row: "0", column: "5" },
              { row: "0", column: "6" },
            ],
            totalPrice: 600,
          },
        ],
      },
    },
    "Kaagaz_2": {
      "Theatre E Chennai": {
        "5:00 PM": [
          {
            movieName: "Kaagaz_2",
            theatre: "Theatre E Chennai",
            timing: "5:00 PM",
            date: "2024-04-09",
            seats: [
              { row: "0", column: "5" },
              { row: "0", column: "6" },
              { row: "0", column: "7" },
              { row: "0", column: "8" },
            ],
            totalPrice: 1200,
          },
        ],
      },
    },
  },
};

localStorage.removeItem("bookings");

// Convert the bookings object to a JSON string
const bookingsJSON = JSON.stringify(new_bookings);

// Store the JSON string in localStorage
localStorage.setItem("bookings", bookingsJSON);