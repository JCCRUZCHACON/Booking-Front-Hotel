import { useForm } from 'react-hook-form';
import './styles/FilterByPrice.css';

const FilterByPrice = ({
	setPriceFiltered,
	handleFilterClose,
	setNameFiltered,
}) => {
	const { handleSubmit, register, reset } = useForm();

	const submit = (data) => {
		const from = +data.from;
		const to = +data.to;
		setPriceFiltered({
			from: data.from ? from : 0,
			to: data.to ? to : Infinity,
		});
		reset({
			from: '',
			to: '',
		});
		setNameFiltered('');
		handleFilterClose();
	};

	return (
		<article className="filterprice grid-container">
			<h4 className="filterprice__title">Price</h4>
			<form
				className="filterprice__form grid-container"
				onSubmit={handleSubmit(submit)}
			>
				<label className="filterprice__form-field grid-container">
					<span className="filterprice__form-label">From:</span>
					<input
						className="filterprice__form-input"
						{...register('from')}
						min={0}
						type="number"
					/>
				</label>
				<label className="filterprice__form-field grid-container">
					<span className="filterprice__form-label">To:</span>
					<input
						className="filterprice__form-input"
						{...register('to')}
						min={0}
						type="number"
					/>
				</label>
				<button className="filterprice__form-btn">Search</button>
			</form>
		</article>
	);
};

export default FilterByPrice;
