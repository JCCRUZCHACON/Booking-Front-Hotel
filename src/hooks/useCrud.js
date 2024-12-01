import axios from 'axios';
import { useState } from 'react';
import getConfigToken from '../services/getConfigToken';

const useCrud = () => {
	const [response, setResponse] = useState();
						//withToken: parametro true o false
	const getData = (url, withToken) => {
		axios
			.get(url, withToken ? getConfigToken() : {})
			.then((res) => setResponse(res.data))
			.catch((err) => {
				console.error(err);
				//401 no autorizado o 403 el token expiro
				if (err?.response.status === 401 || err?.response.status === 403) {
					localStorage.removeItem('token');
					localStorage.removeItem('userLogged');
				}
			});
	};

	const postData = (url, data, withToken) => {
		axios
			.post(url, data, withToken ? getConfigToken() : {})
			.then((res) => {
				setResponse(response ? [...response, res.data] : [res.data]);
			})
			.catch((err) => {
				console.error(err);
				//401 no autorizado o 403 el token expiro
				if (err?.response.status === 401 || err?.response.status === 403) {
					localStorage.removeItem('token');
					localStorage.removeItem('userLogged');
				}
			});
	};

	const deleteData = (url, id, withToken) => {
		axios
			.delete(url, withToken ? getConfigToken() : {})
			.then((res) => {
				console.log(res.data);
				//eliminacion por descarte con filter
				setResponse(response.filter((item) => item.id !== id));
			})
			.catch((err) => {
				console.error(err);

				if (err?.response.status === 401 || err?.response.status === 403) {
					localStorage.removeItem('token');
					localStorage.removeItem('userLogged');
				}
			});
	};

	const updateData = () => {
		
	};

	return [response, getData, postData, deleteData, updateData];
};

export default useCrud;
