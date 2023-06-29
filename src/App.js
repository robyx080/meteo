import './App.css';
import CardWeather from './component/card';
import 'bootstrap/dist/css/bootstrap.min.css';
import background from "./image/sky.png";

function App() {

  

  return (
    <div className="App" style={{ backgroundImage: `url(${background})`, backgroundSize:'cover' }}>
      <CardWeather/>
    </div>
  );
}

export default App;
