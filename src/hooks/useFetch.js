import axios from 'axios';
import { useState } from 'react';

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [response, setResponse] = useState();

	const getData = (url) => {
		axios
			.get(url)
			.then((res) => setResponse(res.data))
			.catch((err) => console.error(err))
			.finally(() => {
				setIsLoading(false);
			});
	};
	return [response, getData, isLoading];
};

export default useFetch;
