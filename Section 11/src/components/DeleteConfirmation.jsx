import { useEffect, useState } from "react";

import ProgressBar from "./Progressbar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
	useEffect(() => {
		console.log("Timer is set");
		const timer = setTimeout(() => {
			onConfirm();
		}, TIMER);

		return () => {
			console.log("Cleaning up the timer");
			// stops the timer when the modal is removed from the DOM
			clearTimeout(timer);
		};
	}, [onConfirm]);

	return (
		<div id="delete-confirmation">
			<h2>Are you sure?</h2>
			<p>Do you really want to remove this place?</p>
			<div id="confirmation-actions">
				<button onClick={onCancel} className="button-text">
					No
				</button>
				<button onClick={onConfirm} className="button">
					Yes
				</button>
			</div>
			<ProgressBar timer={TIMER}></ProgressBar>
		</div>
	);
}
