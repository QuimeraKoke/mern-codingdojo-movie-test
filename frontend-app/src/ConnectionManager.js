import axios from 'axios';

export default class ConnectionManager {

    baseRequest = axios.create({
        baseURL: `http://localhost:3030/`
    });

    token = () => localStorage.getItem("token");

    login = async (email, password) => {
        try {
            let response = await this.baseRequest.post('login/', {email, password});

            if (response.status !== 200)
                return null;

            if (response.data.token){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }

            return response.data;
        } catch (e) {
            return null;
        }

    }

    register = async ({firstName, lastName, email, password}) => {
        try {
            let response = await this.baseRequest.post('register/', {firstName, lastName, email, password});
            if (response.status !== 200)
                return null;
            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    getMovies = async () => {
        let response = await this.baseRequest.get('movies/', {
            headers: {
                'Authorization': `Basic ${this.token()}`
            }});

        if (response.status !== 200)
            return null;
        return response.data;
    }

    getMovie = async (movieId) => {
        let response = await this.baseRequest.get(`movies/${movieId}/`, {
            headers: {
                'Authorization': `Basic ${this.token()}`
            }});

        if (response.status !== 200)
            return null;
        return response.data;

    }

    createMovie = async (title, rating, review) => {
        let response = await this.baseRequest.post(`movies/`,{title, rating, review},  {
            headers: {
                'Authorization': `Basic ${this.token()}`
            }});

        if (response.status !== 200)
            return null;
        return response.data;

    }

    deleteMovie = async (movieId) => {
        let response = await this.baseRequest.delete(`movies/${movieId}/`, {
            headers: {
                'Authorization': `Basic ${this.token()}`
            }});

        if (response.status !== 200)
            return null;
        return response.data;

    }

    createReview = async (movieId, rating, review) => {
        let response = await this.baseRequest.post(`movies/${movieId}/reviews/`,{rating, review},  {
            headers: {
                'Authorization': `Basic ${this.token()}`
            }});

        if (response.status !== 200)
            return null;
        return response.data;
    }

    deleteReview = async (movieId, reviewId) => {
        let response = await this.baseRequest.delete(`movies/${movieId}/reviews/${reviewId}`,  {
            headers: {
                'Authorization': `Basic ${this.token()}`
            }});

        if (response.status !== 200)
            return null;
        return response.data;
    }
}