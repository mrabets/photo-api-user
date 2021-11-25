import logo from './logo.svg';
import './App.css';
import PhotoList from './PhotoList/PhotoList'

function App() {
  return (
    <div className="App">     
      <header className="App-header">
        <h1>Photo site</h1> 
        <hr />
        <PhotoList /> 
      </header>
    </div>
  );
}

export default App;
