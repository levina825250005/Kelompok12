export default function PromoCard({ promo }) {
  return <article className="promo-card">
    <img src={promo.image} alt={promo.title} loading="lazy" />
    <div className="promo-body"><span className="tag">{promo.date}</span>
      <h3>{promo.title}</h3><p>{promo.description}</p>
    </div>
  </article>;
}