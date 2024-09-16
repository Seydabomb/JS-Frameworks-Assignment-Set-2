import { useState, useCallback } from "react";

import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

const Quiz = () => {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;
	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
		setUserAnswers((prevUserAnswers) => {
			// Spreads all the previous answers and then adds the selected answer to the end
			return [...prevUserAnswers, selectedAnswer];
		});
	}, []);

	const handleSkipAnswer = useCallback(
		() => handleSelectAnswer(null),
		[handleSelectAnswer],
	);

	if (quizIsComplete) {
		return <Summary userAnswers={userAnswers}></Summary>;
	}

	return (
		<div id="quiz">
			<Question
				// key={} is a react feature that unmounts and remounts the element based on whatever we put inside {}.
				// That way we can recreate the timer whenever we move on to another question
				key={activeQuestionIndex}
				index={activeQuestionIndex}
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
			></Question>
		</div>
	);
};

export default Quiz;
