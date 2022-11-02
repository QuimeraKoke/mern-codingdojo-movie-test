import {
    BrowserRouter as Router, Navigate,
    Route, Routes,
} from "react-router-dom";

import './App.css';
import LoginPage from "./pages/login";
import MovieIndexPage from "./pages/movies";
import CreateMoviePage from "./pages/movies/create";
import MovieReviewPage from "./pages/reviews/movie_review";
import CreateReviewPage from "./pages/reviews/create"
import {ProtectedRoute} from "./components/auth/ProtectedRoute";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage/>}/>
                <Route path="/movies/" element={
                    <ProtectedRoute>
                        <MovieIndexPage/>
                    </ ProtectedRoute>
                }
                />
                <Route path="/movies/create/" element={<ProtectedRoute> <CreateMoviePage/> </ ProtectedRoute>}/>
                <Route path="/movies/:id/reviews/" element={<ProtectedRoute> <MovieReviewPage/> </ ProtectedRoute>}/>
                <Route path="/movies/:id/reviews/create"
                       element={<ProtectedRoute> <CreateReviewPage/> </ ProtectedRoute>}/>
            </Routes>
        </Router>

    );
}

export default App;
