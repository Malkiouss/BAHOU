
import './App.css';
import NavBar from './navbar/NavBar';
import Hero from './hero/Hero';
import SecondSec from './seconsec/SecondSec';
import CardSec from './cardsec/CardSec';
import ThirdSec from './thitdsec/ThirdSec';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <SecondSec />
      <CardSec />
      <ThirdSec />
      <h1>Welcome to the BAHOU Application</h1>
    </div>
  );
}

export default App;
