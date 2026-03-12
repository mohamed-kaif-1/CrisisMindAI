import SignalCard from "./SignalCard";

export default function EvidencePanel() {

  const signals = [
    {title:"Suspicious Login Attempt", severity:"High"},
    {title:"Multiple Failed Passwords", severity:"Medium"},
    {title:"Unusual Network Activity", severity:"Low"}
  ];

  return (
    <div>
      <h2>Detected Signals</h2>

      {signals.map((s,i)=>(
        <SignalCard
          key={i}
          title={s.title}
          severity={s.severity}
        />
      ))}

    </div>
  );
}