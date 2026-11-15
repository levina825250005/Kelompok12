export default function FacilityCard({ icon, name, description }) {
  return <article className="fac-card">
    <div className="fac-emoji">{icon}</div><h3>{name}</h3>
    {description && <p>{description}</p>}
  </article>;
}