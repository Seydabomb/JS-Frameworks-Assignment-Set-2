import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// Runs once when the overall app starts
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
	AVAILABLE_PLACES.find((place) => place.id === id),
);

function App() {
	const selectedPlace = useRef();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

	// This will be executed by react after every component execution because of useEffect()
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const sortedPlaces = sortPlacesByDistance(
				AVAILABLE_PLACES,
				position.coords.latitude,
				position.coords.longitude,
			);

			setAvailablePlaces(sortedPlaces);
		});
	}, []);

	function handleStartRemovePlace(id) {
		setModalIsOpen(true);
		selectedPlace.current = id;
	}

	function handleStopRemovePlace() {
		setModalIsOpen(false);
	}

	function handleSelectPlace(id) {
		setPickedPlaces((prevPickedPlaces) => {
			if (prevPickedPlaces.some((place) => place.id === id)) {
				return prevPickedPlaces;
			}
			const place = AVAILABLE_PLACES.find((place) => place.id === id);
			return [place, ...prevPickedPlaces];
		});

		const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
		if (storedIds.indexOf(id) === -1) {
			localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]));
		}

		// LocalStorage is from the browser, now we are storing the selectedPlaces variable with the array turned into string. The id is the newest id we are adding to storage with the other already stored ids after.
		localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]));
	}

	function handleRemovePlace() {
		setPickedPlaces((prevPickedPlaces) =>
			prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
		);
		setModalIsOpen(false);

		const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
		localStorage.setItem(
			"selectedPlaces",
			JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)),
		);
	}

	return (
		<>
			<Modal open={modalIsOpen} onClose={handleStopRemove}>
				<DeleteConfirmation
					onCancel={handleStopRemovePlace}
					onConfirm={handleRemovePlace}
				/>
			</Modal>

			<header>
				<img src={logoImg} alt="Stylized globe" />
				<h1>PlacePicker</h1>
				<p>
					Create your personal collection of places you would like to visit or you have
					visited.
				</p>
			</header>
			<main>
				<Places
					title="I'd like to visit ..."
					fallbackText={"Select the places you would like to visit below."}
					places={pickedPlaces}
					onSelectPlace={handleStartRemovePlace}
				/>
				<Places
					title="Available Places"
					places={availablePlaces}
					fallbackText="Sorting places by distance..."
					onSelectPlace={handleSelectPlace}
				/>
			</main>
		</>
	);
}

export default App;
