import File from "./components/File";
import data from "./components/fileExplorer.json";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <File {...data} />
    </div>
  );
}
