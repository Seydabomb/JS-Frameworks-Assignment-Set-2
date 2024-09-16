import { useState, useEffect } from "react";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
	const [remainingTime, setRemainingTime] = useState(timeout);

	// Only executes if timeout and onTimeout changes
	useEffect(() => {
		console.log("SETTING TIMEOUT");
		const timer = setTimeout(onTimeout, timeout);

		return () => {
			clearTimeout(timer);
		};
	}, [timeout, onTimeout]);

	useEffect(() => {
		console.log("SETTING INTERVAL");
		const interval = setInterval(() => {
			setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<progress id="question-time" max={timeout} value={remainingTime} className={mode} />
	);
};

export default QuestionTimer;
