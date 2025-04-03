import "./App.css";
import CountDown from "./components/count-down/CountDown";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <section>
      <div>
        <Menu />
      </div>
      <br />
      <div>
        <CountDown />
      </div>
    </section>
  );
}

export default App;
