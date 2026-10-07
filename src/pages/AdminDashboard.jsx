import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const filteredBookings = bookings.filter((booking) => {

  const search = searchTerm.toLowerCase();

  const matchesSearch =
    booking.guestName?.toLowerCase().includes(search) ||
    booking.phone?.toLowerCase().includes(search) ||
    booking.roomNumber?.toLowerCase().includes(search);

  const matchesStatus =
    statusFilter === "ALL" ||
    booking.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const navigate = useNavigate();



  const loadBookings = () => {
    axios
      .get("http://localhost:8080/api/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };
  const loadRooms = () => {
  axios
    .get("http://localhost:8080/api/rooms")
    .then((response) => {
      setRooms(response.data);
    })
    .catch((error) => {
      console.error("Error fetching rooms:", error);
    });
};

  useEffect(() => {
  const isAdmin = localStorage.getItem("adminLoggedIn");

  if (isAdmin !== "true") {
    navigate("/admin-login");
    return;
  }

  loadBookings();
  loadRooms();
}, [navigate]);
  const updateStatus = (id, status) => {
    axios
      .put(
        `http://localhost:8080/api/bookings/${id}/status?status=${status}`
      )
      .then(() => {
        loadBookings();
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
      });
  };

  const pendingCount = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "CANCELLED"
  ).length;
  const availableRoomsCount = rooms.filter(
  (room) => room.available === true
).length;

const unavailableRoomsCount = rooms.filter(
  (room) => room.available === false
).length;

const totalRevenue = bookings
  .filter((booking) => booking.status === "CONFIRMED")
  .reduce(
    (total, booking) => total + Number(booking.price || 0),
    0
  );

  const handleLogout = () => {
  localStorage.removeItem("adminLoggedIn");
  navigate("/admin-login");
};

  return (
    <div className="admin-page">

      <div className="admin-header">
        <p className="section-label">
          SEETHA RESIDENCY
        </p>

        <h1>Admin Dashboard</h1>
        

        <p>
          Manage hotel bookings and reservations.
        </p>
        <button
  className="admin-logout-btn"
  onClick={handleLogout}
>
  Logout
</button>
      </div>

      {/* Statistics */}

      <div className="admin-stats">

        <div className="admin-stat">
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="admin-stat">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="admin-stat">
          <span>Confirmed</span>
          <strong>{confirmedCount}</strong>
        </div>

        <div className="admin-stat">
          <span>Cancelled</span>
          <strong>{cancelledCount}</strong>
        </div>

        <div className="admin-stat">
  <span>Available Rooms</span>
  <strong>{availableRoomsCount}</strong>
</div>

<div className="admin-stat">
  <span>Unavailable Rooms</span>
  <strong>{unavailableRoomsCount}</strong>
</div>

<div className="admin-stat">
  <span>Total Revenue</span>
  <strong>
    ₹{totalRevenue.toLocaleString("en-IN")}
  </strong>
</div>

      </div>

      {/* Bookings */}

      <div className="admin-bookings">

        <h2>All Bookings</h2>
        <div className="admin-filters">

  <input
    type="text"
    placeholder="Search by name, phone or room..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="ALL">All Status</option>
    <option value="PENDING">Pending</option>
    <option value="CONFIRMED">Confirmed</option>
    <option value="CANCELLED">Cancelled</option>
  </select>

</div>

        {selectedBooking && (
  <div className="booking-modal-overlay">

    <div className="booking-modal">

      <button
        className="booking-modal-close"
        onClick={() => setSelectedBooking(null)}
      >
        ×
      </button>

      <p className="section-label">
        SEETHA RESIDENCY
      </p>

      <h2>Booking Details</h2>

      <div className="booking-modal-details">

        <p>
          <strong>Booking ID</strong>
          <span>#{selectedBooking.id}</span>
        </p>

        <p>
          <strong>Guest Name</strong>
          <span>{selectedBooking.guestName}</span>
        </p>

        <p>
          <strong>Phone</strong>
          <span>{selectedBooking.phone}</span>
        </p>

        <p>
          <strong>Email</strong>
          <span>{selectedBooking.email || "-"}</span>
        </p>

        <p>
          <strong>Room</strong>
          <span>
            {selectedBooking.roomNumber} - {selectedBooking.roomType}
          </span>
        </p>

        <p>
          <strong>Guests</strong>
          <span>{selectedBooking.guests}</span>
        </p>

        <p>
          <strong>Check-in</strong>
          <span>
            {new Date(selectedBooking.checkIn).toLocaleString("en-IN")}
          </span>
        </p>

        <p>
          <strong>Checkout</strong>
          <span>
            {new Date(selectedBooking.checkout).toLocaleString("en-IN")}
          </span>
        </p>

        <p>
          <strong>Price</strong>
          <span>
            ₹{Number(selectedBooking.price).toLocaleString("en-IN")}
          </span>
        </p>

        <p>
          <strong>Status</strong>
          <span>{selectedBooking.status}</span>
        </p>

      </div>

      <button
        className="booking-modal-close-btn"
        onClick={() => setSelectedBooking(null)}
      >
        Close
      </button>

    </div>

  </div>
)}

        {bookings.length === 0 ? (

          <p>No bookings available.</p>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Guest</th>
                  <th>Phone</th>
                  <th>Room</th>
                  <th>Guests</th>
                  <th>Check-in</th>
                  <th>Checkout</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredBookings.map((booking) => (

                  <tr key={booking.id}>

                    <td>#{booking.id}</td>

                    <td>{booking.guestName}</td>

                    <td>{booking.phone}</td>

                    <td>
  {booking.roomNumber} - {booking.roomType}
</td>

                    <td>{booking.guests}</td>

                    <td>
                      {new Date(
                        booking.checkIn
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {new Date(
                        booking.checkout
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>
                      ₹{booking.price}
                    </td>

                    <td>
                      <span className="admin-status">
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      <button
  className="view-booking-btn"
  onClick={() => setSelectedBooking(booking)}
>
  View
</button>

                      <div className="admin-actions">

                        {booking.status === "PENDING" && (
  <button
    className="confirm-btn"
    onClick={() =>
      updateStatus(
        booking.id,
        "CONFIRMED"
      )
    }
  >
    Confirm
  </button>
)}

                        {booking.status !== "CANCELLED" && (
                          <button
                            className="cancel-btn"
                            onClick={() =>
                              updateStatus(
                                booking.id,
                                "CANCELLED"
                              )
                            }
                          >
                            Cancel
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;