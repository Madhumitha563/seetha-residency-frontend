import { useEffect, useState } from "react";
import axios from "axios";
const formatDateTime = (dateTime) => {
  if (!dateTime) return "";

  const date = new Date(dateTime);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};

function Booking() {
  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    email: "",
    roomType: "",
    roomNumber: "",
    guests: 1,
    checkIn: "",
    checkout: "",
    price: ""
  });

  const [message, setMessage] = useState("");
  const [unavailableRooms, setUnavailableRooms] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [hotelRooms, setHotelRooms] = useState([]);
  

  const rooms = [
  { number: "G1", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G2", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G3", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G4", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G5", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G6", type: "Suite", ac: "Non-AC", price: 2500, capacity: 5 },
  { number: "G7", type: "Suite", ac: "Non-AC", price: 2500, capacity: 5 },
  { number: "G8", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G9", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G10", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G11", type: "Standard", ac: "Non-AC", price: 1500, capacity: 2 },
  { number: "G12", type: "Deluxe", ac: "Non-AC", price: 2000, capacity: 3 },

  { number: "F1", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F2", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F3", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F4", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F5", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F6", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F7", type: "Suite", ac: "AC", price: 3000, capacity: 5 },
  { number: "F8", type: "Suite", ac: "AC", price: 3000, capacity: 5 },
  { number: "F9", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F10", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F11", type: "Standard", ac: "AC", price: 2000, capacity: 2 },
  { number: "F12", type: "Deluxe", ac: "AC", price: 2500, capacity: 3 },
  { number: "F13", type: "Deluxe", ac: "AC", price: 2500, capacity: 3 }
];
  useEffect(() => {
  axios
    .get("http://localhost:8080/api/rooms")
    .then((response) => {
      console.log("Hotel rooms from backend:", response.data);
      setHotelRooms(response.data);
    })
    .catch((error) => {
      console.error("Error fetching hotel rooms:", error);
    });
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCheckout = (value) => {
  if (!value) {
    setFormData((prev) => ({
      ...prev,
      checkIn: "",
      checkout: ""
    }));
    
    return;
  }

  // datetime-local gives local time.
  // Add exactly 12 hours without converting to UTC.
  const [datePart, timePart] = value.split("T");

  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const checkInDate = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes
  );

  checkInDate.setHours(checkInDate.getHours() + 12);

  const pad = (number) => String(number).padStart(2, "0");

  const checkoutValue =
    `${checkInDate.getFullYear()}-` +
    `${pad(checkInDate.getMonth() + 1)}-` +
    `${pad(checkInDate.getDate())}T` +
    `${pad(checkInDate.getHours())}:` +
    `${pad(checkInDate.getMinutes())}`;

  setFormData((prev) => ({
    ...prev,
    checkIn: value,
    checkout: checkoutValue
  }));
};
const checkRoomAvailability = async (checkIn, checkout) => {
  if (!checkIn || !checkout) {
    setUnavailableRooms([]);
    return;
  }

  try {
    const response = await axios.get(
      "http://localhost:8080/api/bookings/available",
      {
        params: {
          checkIn: checkIn,
          checkout: checkout
        }
      }
    );

    setUnavailableRooms(response.data);

    // If currently selected room is unavailable,
    // clear the selected room.
    if (response.data.includes(formData.roomNumber)) {
      setFormData((prev) => ({
        ...prev,
        roomNumber: "",
        price: ""
      }));
    }

  } catch (error) {
    console.error("Availability check error:", error);
  }
};
useEffect(() => {
  if (formData.checkIn && formData.checkout) {
    checkRoomAvailability(
      formData.checkIn,
      formData.checkout
    );
  } else {
    setUnavailableRooms([]);
  }
}, [formData.checkIn, formData.checkout]);

  const handleRoomChange = (e) => {
  const roomNumber = e.target.value;

  const selectedRoom = rooms.find(
    (room) => room.number === roomNumber
  );

  if (!selectedRoom) {
    return;
  }

  setFormData((prev) => ({
    ...prev,
    roomNumber: selectedRoom.number,
    roomType: selectedRoom.type,
    price: selectedRoom.price,
    guests: Math.min(
      Number(prev.guests),
      selectedRoom.capacity
    )
  }));
};
  const getRoomCapacity = (roomType) => {
  if (roomType === "Standard") return 2;
  if (roomType === "Deluxe") return 3;
  if (roomType === "Suite") return 5;

  return 0;
};
 const handleSubmit = async (e) => {
  e.preventDefault();

  setMessage("");
  setBookingDetails(null);

  // -----------------------------
  // 1. Check-in date/time
  // -----------------------------

  if (!formData.checkIn) {
    setMessage("Please select a check-in date and time.");
    return;
  }

  const selectedCheckIn = new Date(formData.checkIn);
  const now = new Date();

  if (selectedCheckIn <= now) {
    setMessage("Please select a future check-in date and time.");
    return;
  }

  // -----------------------------
  // 2. Check room type
  // -----------------------------

  if (!formData.roomType) {
    setMessage("Please select a room type.");
    return;
  }

  // -----------------------------
  // 3. Check room number
  // -----------------------------

  if (!formData.roomNumber) {
    setMessage("Please select a room number.");
    return;
  }

  // -----------------------------
  // 4. Check guest capacity
  // -----------------------------

  const capacity = getRoomCapacity(formData.roomType);

  if (Number(formData.guests) > capacity) {
    setMessage(
      `${formData.roomType} room can accommodate maximum ${capacity} guests.`
    );
    return;
  }

  if (Number(formData.guests) < 1) {
    setMessage("Number of guests must be at least 1.");
    return;
  }

  // -----------------------------
  // 5. Check selected room
  // -----------------------------

  const selectedRoom = rooms.find(
    (room) => room.number === formData.roomNumber
  );

  if (!selectedRoom) {
    setMessage("Please select a valid room.");
    return;
  }

  // -----------------------------
  // 6. Check room type match
  // -----------------------------

  if (selectedRoom.type !== formData.roomType) {
    setMessage(
      "Selected room does not match the selected room type."
    );
    return;
  }

  // -----------------------------
  // 7. Submit booking
  // -----------------------------

  try {

    const bookingData = {
      guestName: formData.guestName,
      phone: formData.phone,
      email: formData.email,
      roomType: formData.roomType,
      roomNumber: formData.roomNumber,
      guests: Number(formData.guests),
      checkIn: formData.checkIn,
      checkout: formData.checkout,
      price: Number(formData.price),
      status: "PENDING"
    };

    const response = await axios.post(
      "http://localhost:8080/api/bookings",
      bookingData
    );

    console.log("Booking created:", response.data);

    setBookingDetails(response.data);

    setMessage(
      "Booking submitted successfully! Your booking is pending confirmation."
    );

    setFormData({
      guestName: "",
      phone: "",
      email: "",
      roomType: "",
      roomNumber: "",
      guests: 1,
      checkIn: "",
      checkout: "",
      price: ""
    });

  } catch (error) {

    console.error("Booking error:", error);

    if (error.response?.data?.detail) {
      setMessage(error.response.data.detail);
    } else if (error.response?.data?.message) {
      setMessage(error.response.data.message);
    } else {
      setMessage(
        "Unable to create booking. Please try again."
      );
    }
  }
};

  return (
    <div className="booking-page">

      <div className="booking-header">

        <p className="section-label">
          SEETHA RESIDENCY
        </p>

        <h1>Book Your Stay</h1>

        <p>
          Choose your check-in time and enjoy a comfortable 12-hour stay.
        </p>

      </div>

      <div className="booking-container">

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          <h2>Guest Details</h2>

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />

            </div>

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />

            </div>

          </div>

          <h2>Stay Details</h2>

          <div className="form-row">

            <div className="form-group">

              <label>Check-in Date & Time</label>

              <input
                type="datetime-local"
                value={formData.checkIn}
                onChange={(e) =>
                  calculateCheckout(e.target.value)
                }
                required
              />

            </div>

            <div className="form-group">

              <label>Checkout</label>

              <input
                type="datetime-local"
                value={formData.checkout}
                readOnly
              />

            </div>

          </div>

          <div className="form-row">

            <div className="form-group">

  <label>Room Type</label>

  <select
    name="roomType"
    value={formData.roomType}
    onChange={(e) => {
      const selectedType = e.target.value;

      setFormData((prev) => ({
        ...prev,
        roomType: selectedType,
        roomNumber: "",
        price: ""
      }));
    }}
    required
  >
    <option value="">
      Select Room Type
    </option>

    <option value="Standard">
      Standard
    </option>

    <option value="Deluxe">
      Deluxe
    </option>

    <option value="Suite">
      Suite
    </option>

  </select>

</div>
            <div className="form-group">

  <label>Room Number</label>

  <select
    name="roomNumber"
    value={formData.roomNumber}
    onChange={handleRoomChange}
    required
    disabled={!formData.roomType}
  >

    <option value="">
      Select Room Number
    </option>

    {rooms
  .filter((room) => {
    const backendRoom = hotelRooms.find(
      (item) => item.roomNumber === room.number
    );

    return (
      room.type === formData.roomType &&
      backendRoom?.available === true &&
      !unavailableRooms.includes(room.number)
    );
  })
  .map((room) => (
    <option
      key={room.number}
      value={room.number}
    >
      {room.number} - {room.ac}
    </option>
  ))}

  </select>

</div>

            <div className="form-group">

              <label>Number of Guests</label>

              <input
  type="number"
  name="guests"
  value={formData.guests}
  onChange={handleChange}
  min="1"
  max={
    formData.roomType.startsWith("Standard")
      ? 2
      : formData.roomType.startsWith("Deluxe")
      ? 3
      : formData.roomType.startsWith("Suite")
      ? 5
      : 1
  }
  required
/>

            </div>

          </div>

          {formData.price && (
            <div className="booking-price">

              <span>Total Price</span>

              <strong>
                ₹{formData.price}
              </strong>

              <small>
                / 12 Hours
              </small>

            </div>
          )}

          <button
            type="submit"
            className="confirm-booking"
          >
            Confirm Booking
          </button>

          {bookingDetails ? (
  <div className="booking-confirmation">

    <h2>🎉 Booking Submitted Successfully!</h2>

    <p>Your booking is pending confirmation.</p>

    <div className="confirmation-details">

      <p>
        <strong>Booking ID:</strong>{" "}
        #{bookingDetails.id}
      </p>

      <p>
        <strong>Guest Name:</strong>{" "}
        {bookingDetails.guestName}
      </p>

      <p>
        <strong>Room:</strong>{" "}
        {bookingDetails.roomNumber}
      </p>

      <p>
        <strong>Room Type:</strong>{" "}
        {bookingDetails.roomType}
      </p>

      <p>
        <strong>Guests:</strong>{" "}
        {bookingDetails.guests}
      </p>

      <p>
        <strong>Check-in:</strong>{" "}
        {formatDateTime(bookingDetails.checkIn)}
      </p>

      <p>
        <strong>Checkout:</strong>{" "}
        {formatDateTime(bookingDetails.checkout)}
      </p>

      <p>
        <strong>Amount:</strong>{" "}
        ₹{Number(bookingDetails.price).toLocaleString("en-IN")}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {bookingDetails.status}
      </p>

    </div>

  </div>
) : (
  message && (
    <p className="booking-message">
      {message}
    </p>
  )
)}

        </form>

      </div>

    </div>
  );
}

export default Booking;