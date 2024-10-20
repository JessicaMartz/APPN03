// Datos de los hoteles predefinidos (quemados)
const hotels = [
  {
    id: 1,
    name: "Hotel Madrid Plaza",
    city: "madrid",
    rating: 4,
    price: 100,
  },
  {
    id: 2,
    name: "Hotel Barcelona Beach",
    city: "barcelona",
    rating: 5,
    price: 150,
  },
  {
    id: 3,
    name: "Hotel Sevilla Centro",
    city: "seville",
    rating: 3,
    price: 75,
  },
  {
    id: 4,
    name: "Hotel Madrid Sur",
    city: "madrid",
    rating: 3,
    price: 90,
  },
  {
    id: 5,
    name: "Hotel Barcelona City",
    city: "barcelona",
    rating: 4,
    price: 120,
  },
  {
    id: 6,
    name: "Hotel Sevilla Golf",
    city: "seville",
    rating: 4,
    price: 110,
  },
];

// Reservas predefinidas (quemadas)
const reservations = [
  {
    hotelId: 1,
    nights: 3,
    totalPrice: 300,
    customerName: "Juan Pérez",
  },
  {
    hotelId: 2,
    nights: 5,
    totalPrice: 750,
    customerName: "María García",
  },
  {
    hotelId: 3,
    nights: 2,
    totalPrice: 150,
    customerName: "Pedro Sánchez",
  },
];

// Variable para almacenar el hotel seleccionado
let selectedHotel = null;

// Función para buscar los hoteles por ciudad
function searchHotels() {
  const cityInput = document.getElementById("cityInput").value;
  const hotelList = document.getElementById("hotels");
  hotelList.innerHTML = ""; // Limpiar lista de hoteles antes de cada búsqueda

  if (cityInput === "") {
    alert("Por favor, selecciona una ciudad.");
    return;
  }

  const filteredHotels = hotels.filter(hotel => hotel.city === cityInput);

  if (filteredHotels.length === 0) {
    hotelList.innerHTML = "<li class='list-group-item'>No se encontraron hoteles en esta ciudad.</li>";
  } else {
    filteredHotels.forEach(hotel => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `
        <strong>${hotel.name}</strong><br>
        <em>Rating: ${hotel.rating} estrellas</em><br>
        <em>Precio por noche: $${hotel.price}</em>
        <button class="btn btn-success btn-sm float-right" onclick="selectHotel(${hotel.id})">Seleccionar</button>
      `;
      hotelList.appendChild(li);
    });

    document.getElementById("hotelList").style.display = "block";
  }
}

// Función para seleccionar un hotel
function selectHotel(hotelId) {
  selectedHotel = hotels.find(hotel => hotel.id === hotelId);
  if (selectedHotel) {
    const hotelDetails = `
      <h5>Hotel Seleccionado: ${selectedHotel.name}</h5>
      <p><strong>Rating:</strong> ${selectedHotel.rating} estrellas</p>
      <p><strong>Precio por noche:</strong> $${selectedHotel.price}</p>
    `;
    document.getElementById("reservationSection").style.display = "block";
    document.getElementById("reservationDetails").innerHTML = hotelDetails;
  }
}

// Función para hacer la reserva
function makeReservation() {
  if (!selectedHotel) {
    alert("Por favor, selecciona un hotel primero.");
    return;
  }

  const nights = document.getElementById("nightsInput").value;
  const reservationStatus = document.getElementById("reservationStatus");

  if (nights < 1 || nights > 30) {
    reservationStatus.classList.add("error");
    reservationStatus.classList.remove("success");
    reservationStatus.innerText = "Por favor, ingresa un número de noches válido (1-30).";
    return;
  }

  const totalPrice = selectedHotel.price * nights;
  const customerName = "Cliente Anónimo"; // En una aplicación real, aquí se pediría el nombre del cliente

  // Guardamos la reserva en la lista de reservas predefinidas (quemadas)
  reservations.push({
    hotelId: selectedHotel.id,
    nights: nights,
    totalPrice: totalPrice,
    customerName: customerName,
  });

  reservationStatus.classList.add("success");
  reservationStatus.classList.remove("error");
  reservationStatus.innerText = `Reserva exitosa! Total a pagar: $${totalPrice} por ${nights} noches en ${selectedHotel.name}.`;

  // Resetear los campos después de hacer la reserva
  document.getElementById("reservationForm").reset();
  selectedHotel = null;
}