import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bookings")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  }, []);

  const customers = Object.values(
    bookings.reduce((acc, booking) => {

      const phone = booking.phone;

      if (!acc[phone]) {
        acc[phone] = {
          name: booking.guestName,
          phone: booking.phone,
          email: booking.email,
          totalBookings: 0,
          confirmedBookings: 0,
          cancelledBookings: 0,
          totalSpent: 0
        };
      }

      acc[phone].totalBookings += 1;

      if (booking.status === "CONFIRMED") {
        acc[phone].confirmedBookings += 1;
        acc[phone].totalSpent += Number(booking.price || 0);
      }

      if (booking.status === "CANCELLED") {
        acc[phone].cancelledBookings += 1;
      }

      return acc;

    }, {})
  );
  const filteredCustomers = customers.filter((customer) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    customer.name?.toLowerCase().includes(search) ||
    customer.phone?.toLowerCase().includes(search) ||
    customer.email?.toLowerCase().includes(search);

  let matchesStatus = true;

  if (statusFilter === "CONFIRMED") {
    matchesStatus = customer.confirmedBookings > 0;
  }

  if (statusFilter === "CANCELLED") {
    matchesStatus = customer.cancelledBookings > 0;
  }

  return matchesSearch && matchesStatus;
});
const totalCustomers = customers.length;

const confirmedCustomers = customers.filter(
  (customer) => customer.confirmedBookings > 0
).length;

const cancelledCustomers = customers.filter(
  (customer) => customer.cancelledBookings > 0
).length;

const totalCustomerRevenue = customers.reduce(
  (total, customer) => total + customer.totalSpent,
  0
);

  return (
    <div className="admin-page">

      <div className="admin-header">

        <p className="section-label">
          SEETHA RESIDENCY
        </p>

        <h1>Customer Management</h1>

        <p>
          View and manage hotel customers.
        </p>

      </div>

      <div className="admin-bookings">
        <div className="admin-stats">

  <div className="admin-stat">
    <span>Total Customers</span>
    <strong>{totalCustomers}</strong>
  </div>

  <div className="admin-stat">
    <span>Confirmed Customers</span>
    <strong>{confirmedCustomers}</strong>
  </div>

  <div className="admin-stat">
    <span>Cancelled Customers</span>
    <strong>{cancelledCustomers}</strong>
  </div>

  <div className="admin-stat">
    <span>Total Revenue</span>
    <strong>
      ₹{totalCustomerRevenue.toLocaleString("en-IN")}
    </strong>
  </div>

</div>

        <h2>All Customers</h2>
        <div className="admin-filters">

  <input
    type="text"
    placeholder="Search by name, phone or email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="ALL">All Customers</option>
    <option value="CONFIRMED">Confirmed</option>
    <option value="CANCELLED">Cancelled</option>
  </select>

</div>

        {loading ? (

          <p>Loading customers...</p>

        ) : customers.length === 0 ? (

          <p>No customers available.</p>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Total Bookings</th>
                  <th>Confirmed</th>
                  <th>Cancelled</th>
                  <th>Total Spent</th>
                </tr>
              </thead>

              <tbody>

                {filteredCustomers.map((customer) => (

                  <tr key={customer.phone}>

                    <td>{customer.name}</td>

                    <td>{customer.phone}</td>

                    <td>{customer.email || "-"}</td>

                    <td>{customer.totalBookings}</td>

                    <td>{customer.confirmedBookings}</td>

                    <td>{customer.cancelledBookings}</td>

                    <td>
                      ₹{customer.totalSpent.toLocaleString("en-IN")}
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

export default Customers;
