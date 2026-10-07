import { Link } from "react-router-dom";

function Rooms() {

  const roomCategories = [
    {
      type: "Standard",
      acType: "AC",
      price: 2000,
      capacity: 2,
      image: "/room-standard.jpg",
      description:
        "A comfortable air-conditioned room with essential amenities for a pleasant stay."
    },
    {
      type: "Standard",
      acType: "Non-AC",
      price: 1500,
      capacity: 2,
      image: "/room-standard.jpg",
      description:
        "A simple and comfortable room offering a peaceful stay at an affordable price."
    },
    {
      type: "Deluxe",
      acType: "AC",
      price: 2500,
      capacity: 3,
      image: "/room-deluxe.jpg",
      description:
        "A spacious air-conditioned deluxe room designed for a comfortable family stay."
    },
    {
      type: "Deluxe",
      acType: "Non-AC",
      price: 2000,
      capacity: 3,
      image: "/room-deluxe.jpg",
      description:
        "A spacious deluxe room with comfortable amenities for a relaxing stay."
    },
    {
      type: "Suite",
      acType: "AC",
      price: 3000,
      capacity: 5,
      image: "/room-suite.jpg",
      description:
        "A premium air-conditioned suite offering extra space and comfort for families."
    },
    {
      type: "Suite",
      acType: "Non-AC",
      price: 2500,
      capacity: 5,
      image: "/room-suite.jpg",
      description:
        "A spacious suite designed for guests looking for extra comfort and convenience."
    }
  ];

  return (
    <div className="rooms-page">

      {/* Page Header */}
      <section className="rooms-header">

        <p className="section-label">
          SEETHA RESIDENCY
        </p>

        <h1>Our Rooms</h1>

        <p>
          Comfortable rooms designed for a peaceful and relaxing stay
          in Tiruvannamalai.
        </p>

      </section>

      {/* Room Cards */}
      <section className="rooms-container">

        {roomCategories.map((room, index) => (

          <div
            className="room-card"
            key={index}
          >

            {/* Image */}
            <div className="room-image-wrapper">

              <img
                src={room.image}
                alt={`${room.type} ${room.acType} room`}
                className="room-image"
              />

              <span className="room-badge">
                {room.acType}
              </span>

            </div>

            {/* Content */}
            <div className="room-content">

              <div className="room-title-row">

                <h2>
                  {room.type} Room
                </h2>

                <span className="capacity">
                  👥 {room.capacity}
                </span>

              </div>

              <p className="room-description">
                {room.description}
              </p>

              <div className="room-features">

                <span>🛏️ Premium Bedding</span>

                <span>📺 LG TV</span>

                <span>💧 Hot Water</span>

              </div>

              <div className="room-bottom">

                <div>

                  <span className="price">
                    ₹{room.price}
                  </span>

                  <span className="price-label">
                    / 12 Hours
                  </span>

                </div>

                <Link
                  to="/booking"
                  className="book-button"
                >
                  Book Now
                </Link>

              </div>

            </div>

          </div>

        ))}

      </section>

    </div>
  );
}

export default Rooms;