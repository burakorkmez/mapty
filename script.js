'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

if (navigator.geolocation)
	navigator.geolocation.getCurrentPosition(
		(position) => {
			const { latitude } = position.coords;
			const { longitude } = position.coords;
			console.log(
				`https://www.google.com/maps/@${latitude},${longitude},8.25z`
			);
			const coords = [latitude, longitude];

			map = L.map('map').setView(coords, 13);

			L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);

			// handle click on map
			map.on('click', (mapE) => {
				mapEvent = mapE;
				form.classList.remove('hidden');
				inputDistance.focus();
			});
		},
		() => alert('Could not get your position!')
	);

form.addEventListener('submit', (e) => {
	e.preventDefault();
	// clear input fields;
	inputDistance.value =
		inputCadence.value =
		inputDuration.value =
		inputElevation.value =
			'';
	// display marker
	const { lat, lng } = mapEvent.latlng;
	L.marker([lat, lng])
		.addTo(map)
		.bindPopup(
			L.popup({
				maxWidth: 250,
				minWidth: 100,
				autoClose: false,
				closeOnClick: false,
				className: 'running-popup',
			})
		)
		.setPopupContent('Workout here')
		.openPopup();
});

inputType.addEventListener('change', () => {
	inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
	inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
