
import axios from 'axios'
// base url to make requests to the movie database 
 const API=axios.create({
    baseURL:`https://api.themoviedb.org/3`
})

export default API