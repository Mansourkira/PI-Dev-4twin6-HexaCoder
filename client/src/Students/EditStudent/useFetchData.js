import { useState, useEffect} from 'react'
import axios from 'axios';
function useFetchData(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
          axios.get(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(`Error: ${err}`));
    }, [url]);

    return { data };
}

export default useFetchData