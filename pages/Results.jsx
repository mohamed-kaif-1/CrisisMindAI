import ConfidenceMeter from "../components/ConfidenceMeter";
import ActionList from "../components/ActionList";

export default function Results(){
  return (
    <div>
      <h1>Analysis Results</h1>

      <ConfidenceMeter value={78} />

      <ActionList />
    </div>
  );
}