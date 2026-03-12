import { useState } from "react";

export default function UploadBox() {
  const [file, setFile] = useState(null);

  return (
    <div style={{border:"2px dashed gray", padding:"20px", textAlign:"center"}}>
      <h3>Upload Evidence</h3>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      {file && <p>Uploaded: {file.name}</p>}

      <button style={{marginTop:"10px"}}>
        Analyze
      </button>
    </div>
  );
}