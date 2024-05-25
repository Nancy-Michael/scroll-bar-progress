
import './App.css';
import ScrollIndecator from './ScrollIndecator';

function App() {
  return (
    <div className="App">
      <ScrollIndecator url={'https://dummyjson.com/products?limit=100'}/>
    </div>
  );
}

export default App;
