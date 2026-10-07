import { useEffect, useState } from "react";
import axios from "axios";

function AdminRooms() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleAvailability = (room) => {

  axios
    .put(`http://localhost:8080/api/rooms/${room.id}`, {
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      acType: room.acType,
      price: room.price,
      capacity: room.capacity,
      available: !room.available,
      image: room.image
    })
    .then(() => {
      loadRooms();
    })
    .catch((error) => {
      console.error("Error updating room:", error);
    });

};


  const loadRooms = () => {
  axios
    .get("http://localhost:8080/api/rooms")
    .then((response) => {
      setRooms(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching rooms:", error);
      setLoading(false);
    });
};
  


  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="admin-page">

      <div className="admin-header">

        <p className="section-label">
          SEETHA RESIDENCY
        </p>

        <h1>Room Management</h1>

        <p>
          Manage hotel rooms and room availability.
        </p>
        

      </div>

      <div className="admin-bookings">

        <h2>All Rooms</h2>

        {loading ? (

          <p>Loading rooms...</p>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Room</th>
                  <th>Type</th>
                  <th>AC Type</th>
                  <th>Capacity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {rooms.map((room) => (

                  <tr key={room.id}>

                    <td>{room.roomNumber}</td>

                    <td>{room.roomType}</td>

                    <td>{room.acType}</td>

                    <td>{room.capacity}</td>

                    <td>
                      ₹{Number(room.price).toLocaleString("en-IN")}
                    </td>

                    <td>
  <span className="admin-status">
    {room.available ? "AVAILABLE" : "UNAVAILABLE"}
  </span>
</td>

<td>
  <button
    className="room-toggle-btn"
    onClick={() => toggleAvailability(room)}
  >
    {room.available ? "Disable" : "Enable"}
  </button>
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

export default AdminRooms;