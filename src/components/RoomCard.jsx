
import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <article className="card room-card h-100" id={room.id}>
      <img
        src={room.image}
        alt={room.name}
        className="card-img-top"
        loading="lazy"
      />

      <div className="card-body">
        <h3 className="card-title">{room.name}</h3>

        <p className="card-text">{room.summary}</p>

        <span className="price">{room.priceLabel}</span>

        <ul className="list-group list-group-flush">
          {room.facilities.map((item) => (
            <li className="list-group-item" key={item}>
              {item}
            </li>
          ))}
        </ul>

        <Link
          to="/promo#booking"
          className="btn btn-primary room-booking-btn"
        >
          Booking
        </Link>
      </div>
    </article>
  );
}
