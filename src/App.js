import Slider from "./Slider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github slider{" "}
        </a>
      </header>
      <body>
        <Slider />
      </body>
    </div>
  );
}

export default App;
