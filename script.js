// ================= LOGIN VALIDATION =================
function validateLogin() {
  const email = document.getElementById("email").value;
  const error = document.getElementById("error");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    error.innerText = "Please enter a valid email address";
    return;
  }

  error.innerText = "";
  location.href = "home.html";
}

// ================= HOTEL DATA =================
const hotels = [
  {
    id: 1,
    name: "The Leela Palace",
    city: "Bangalore",
    price: 5200,
    rating: 4.8,
    amenities: ["wifi", "pool"],
    images: [
      "facadenight.jpg"
    ]
  },
  {
    id: 2,
    name: "Taj Fort Aguada Resort",
    city: "Goa",
    price: 4800,
    rating: 4.7,
    amenities: ["wifi", "pool"],
    images: [
      "753922799.jpg",
      
    ]
  },
  {
    id: 3,
    name: "Himalayan Heights",
    city: "Manali",
    price: 2900,
    rating: 4.4,
    amenities: ["parking"],
    images: [
      "653410734.jpg"
    ]
  },
  {
    id: 4,
    name: "Royal Heritage Haveli",
    city: "Jaipur",
    price: 4300,
    rating: 4.6,
    amenities: ["wifi", "parking"],
    images: [
      "s1654x900.jpg"
    ]
  },
  {
    id: 5,
    name: "Bloom Rooms",
    city: "Delhi",
    price: 2400,
    rating: 4.2,
    amenities: ["wifi"],
    images: [
      "bloom.jpg"
    ]
  },
  {
    id: 6,
    name: "Snow Valley Resort",
    city: "Shimla",
    price: 3300,
    rating: 4.5,
    amenities: ["wifi", "parking"],
    images: [
      "resort.jpg"
    ]
  },
  {
    id: 7,
    name: "Backwater Retreat",
    city: "Kerala",
    price: 3700,
    rating: 4.6,
    amenities: ["pool"],
    images: [
      "kerala.jpg"
    ]
  },
  {
    id: 8,
    name: "Lake Palace View Inn",
    city: "Udaipur",
    price: 4100,
    rating: 4.7,
    amenities: ["wifi"],
    images: [
      "udaipur.jpg"
    ]
  },
  {
    id: 9,
    name: "Mountain Breeze Lodge",
    city: "Mussoorie",
    price: 2700,
    rating: 4.3,
    amenities: ["parking"],
    images: [
      "mussoorie.jpg"
    ]
  },
  {
    id: 10,
    name: "Sea View Suites",
    city: "Mumbai",
    price: 5500,
    rating: 4.8,
    amenities: ["wifi", "pool"],
    images: [
      "mumbai.jpg"
    ]
  }
];

// ================= GLOBAL VARIABLES =================
let currentImages = [];
let currentIndex = 0;
let selectedHotel = null;

// ================= HOME PAGE =================
function checkLogin() {
  showHotels(hotels);
}

function showHotels(list) {
  const hotelList = document.getElementById("hotelList");

  if (!hotelList) return;

  hotelList.innerHTML = "";

  list.forEach(hotel => {
    hotelList.innerHTML += `
      <div class="hotel-card">
        <img src="${hotel.images[0]}" class="hotel-image">

        <div class="hotel-content">
          <h3>${hotel.name}</h3>
          <p>${hotel.city}</p>
          <p>₹${hotel.price} | ⭐ ${hotel.rating}</p>

          <button onclick="viewDetails(${hotel.id})">
            View Details
          </button>
        </div>
      </div>
    `;
  });
}

// ================= FILTER & SORT =================
function applyAllFilters() {
  const city = document.getElementById("searchCity").value.toLowerCase();
  const amenity = document.getElementById("amenityFilter").value;
  const sort = document.getElementById("sortSelect").value;

  let filtered = hotels.filter(hotel => {
    const cityMatch =
      !city || hotel.city.toLowerCase().includes(city);

    const amenityMatch =
      !amenity || hotel.amenities.includes(amenity);

    return cityMatch && amenityMatch;
  });

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  showHotels(filtered);
}

// ================= DETAILS PAGE =================
function viewDetails(id) {
  location.href = `details.html?id=${id}`;
}

function loadDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  selectedHotel = hotels.find(hotel => hotel.id == id);

  if (!selectedHotel) return;

  document.getElementById("hotelName").innerText =
    selectedHotel.name;

  document.getElementById("hotelInfo").innerText =
    `${selectedHotel.city} | ₹${selectedHotel.price} | ⭐ ${selectedHotel.rating}`;

  currentImages = selectedHotel.images;
  currentIndex = 0;

  document.getElementById("carousel").src =
    currentImages[0];
}

// ================= IMAGE CAROUSEL =================
function nextImage() {
  currentIndex =
    (currentIndex + 1) % currentImages.length;

  document.getElementById("carousel").src =
    currentImages[currentIndex];
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentImages.length) %
    currentImages.length;

  document.getElementById("carousel").src =
    currentImages[currentIndex];
}

// ================= BOOKING =================
function bookNow() {
  let bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.push(selectedHotel);

  localStorage.setItem(
    "bookings",
    JSON.stringify(bookings)
  );

  alert("Booking saved!");
}

// ================= FAVORITES =================
function toggleFav() {
  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.push(selectedHotel);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  alert("Added to favorites!");
}

// ================= PROFILE PAGE =================
function loadProfile() {
  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const bookingDiv = document.getElementById("bookings");
  const favDiv = document.getElementById("favorites");

  bookingDiv.innerHTML = bookings.length
    ? bookings
        .map(hotel => `🏨 ${hotel.name} - ${hotel.city}`)
        .join("<br>")
    : "No bookings yet";

  favDiv.innerHTML = favorites.length
    ? favorites
        .map(hotel => `❤️ ${hotel.name} - ${hotel.city}`)
        .join("<br>")
    : "No favorites yet";
}
