import './App.css';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import './styles/styles.css';
import {MovieContext} from "./context/MovieContext";
import GlobalRouter from "./router/GlobalRouter";


function App() {

    const movies = [];
  return (
    <div className="Home">
        <MovieContext.Provider value={{movies}}>
            <Header/>
            <GlobalRouter></GlobalRouter>
            <Footer />
        </MovieContext.Provider>

    </div>
  );
}

export default App;
