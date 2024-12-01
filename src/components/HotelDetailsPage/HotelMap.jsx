import { Marker, Map } from 'pigeon-maps';

const HotelMap = ({ lat, lon }) => {
	return (
		//+ es para pasar de string a number
		<Map center={[+lat, +lon]} width={450} height={300}>
			<Marker width={30} anchor={[+lat, +lon]} color="#ea4959" />
		</Map>
	);
};

export default HotelMap;
