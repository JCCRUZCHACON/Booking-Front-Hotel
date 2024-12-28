import axios from 'axios';
import { useState } from 'react';

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState();

	const getData = (url) => {
		isLoading(true)
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
