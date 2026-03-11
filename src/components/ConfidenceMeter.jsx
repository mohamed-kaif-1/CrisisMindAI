export default function ConfidenceMeter({value}) {

  return (
    <div style={{margin:"20px 0"}}>
      <h3>Crisis Confidence</h3>

      <div style={{
        background:"lightgray",
        height:"20px",
        width:"100%",
        borderRadius:"10px"
      }}>
        <div
          style={{
            width: value + "%",
            background:"red",
            height:"100%",
            borderRadius:"10px"
          }}
        />
      </div>

      <p>{value}% probability</p>
    </div>
  );
}