import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Home from './pages/home';

function App() {
  const SERVER_URL = 'http://localhost:3000/api/jobs/get-all-jobs';

  useEffect(() => {
    axios.post(SERVER_URL, {
      page: '',
      perPage: '50',
      sortBy: 'id',
      sortDirection: 'DESC'
    })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [])

  return (
    <Home />
  );
}

export default App;
