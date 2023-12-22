import './App.css';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import './styles/styles.css';
import {MovieContext} from "./context/MovieContext";
import GlobalRouter from "./router/GlobalRouter";
import {useMovies} from "./hooks/useMovies";
import Menu from './components/Menu';

function App() {

    const movies = useMovies();
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
