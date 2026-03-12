export default function SignalCard({title, severity}) {

  const color =
    severity === "High"
      ? "red"
      : severity === "Medium"
      ? "orange"
      : "green";

  return (
    <div style={{
      border:"1px solid gray",
      padding:"15px",
      margin:"10px",
      borderRadius:"10px"
    }}>
      <h3>{title}</h3>

      <p style={{color}}>
        Severity: {severity}
      </p>
    </div>
  );
}