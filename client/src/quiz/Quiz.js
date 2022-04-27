import React, { useEffect, useState } from 'react';
import './index.css';
import { useHistory } from "react-router-dom";

import axios from "axios";
export default function Chatbot() {
	
	const questions = [
		{
			questionText: 'Which of the following is an example of a financial model that can be used for project evaluation ?',
			answerOptions: [
				
				{ answerText: 'Public support', isCorrect: false },
				{ answerText: 'Net present value', isCorrect: true },
				{ answerText: 'Environmental impact', isCorrect: false },
			],
		},
		{
			questionText: 'innovation et la valeur ajoutée?',
			answerOptions: [
				{ answerText: 'not inclus', isCorrect: false },
				{ answerText: 'inclus', isCorrect: true },
				{ answerText: 'i dont now', isCorrect: false },
				
			],
		},
		{
			questionText: 'La consistance du projet?',
			answerOptions: [
				{ answerText: 'important', isCorrect: true },
				{ answerText: 'no', isCorrect: false },
				{ answerText: 'i dont now ', isCorrect: false },
				
			],
		},
		{
			questionText: 'un scénario complet?',
			answerOptions: [
				
				{ answerText: 'globally', isCorrect: false },
				{ answerText: 'non', isCorrect: false },
				{ answerText: 'oui', isCorrect: true },
			],
		},
	];
 

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	  const [Answers ,SetAnswers] = useState([]);
 let history = useHistory();
	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
			 setTimeout(()=> {history.push("/teacher")}, 1000);

  }


    
  
		}
	


  useEffect(() => {

   axios.get("http://localhost:8095/api/answerOptions")
  .then((data) =>{SetAnswers(data.data.answerOptions)
   console.log("answers",data.data.answerOptions) }
  )
  .catch((err) => console.log(`Error: ${err}`));

  }, []);



	return (
		<div className='apps'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
