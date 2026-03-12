export default function ActionList() {

  const actions = [
    "Lock suspicious accounts",
    "Investigate source IP",
    "Enable two-factor authentication",
    "Alert security team"
  ];

  return (
    <div>
      <h3>Recommended Actions</h3>

      <ul>
        {actions.map((a,i)=>(
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}