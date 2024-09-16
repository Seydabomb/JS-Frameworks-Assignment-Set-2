import { useRef } from "react";

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
	const shuffledAnswers = useRef();

	if (!shuffledAnswers.current) {
		// Creating a copy of our answers array
		shuffledAnswers.current = [...answers];
		// Now sorting that copy
		// Positive value remains the same, negative number switches. Thus, with the random function, it will randomly create a positive or negative number. Hence, a random shuffle.
		shuffledAnswers.current.sort(() => Math.random() - 0.5);
	}

	return (
		<ul id="answers">
			{shuffledAnswers.current.map((answer) => {
				const isSelected = selectedAnswer === answer;
				let cssClass = "";

				if (answerState === "answered" && isSelected) {
					cssClass = "selected";
				}

				if ((answerState === "correct" || answerState === "wrong") && isSelected) {
					cssClass = answerState;
				}

				return (
					<li key={answer} className="answer">
						<button
							onClick={() => onSelect(answer)}
							className={cssClass}
							disabled={answerState !== ""}
						>
							{answer}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default Answers;
