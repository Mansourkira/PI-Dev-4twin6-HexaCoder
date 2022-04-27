import React, { useEffect, useState } from 'react';

export default function chatbot() {
	
	const questions = [
		{
			questionText: 'Which of the following is an example of a financial model that can be used for project evaluation ?',
			answerOptions: [
				{ answerText: 'Legal compliance', isCorrect: false },
				{ answerText: 'Public support', isCorrect: false },
				{ answerText: 'Net present value', isCorrect: true },
				{ answerText: 'Environmental impact', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];
  useEffect(() => {
 
    
    (function(d, m){
        var kommunicateSettings = 
            {"appId":"1d4a29b9a0037251fbe73ad229b113851","popupWidget":true,"automaticChatOpenOnNavigation":true,
        
  "automaticChatOpenOnNavigation":true,
             "voiceOutput":true,"voiceInput":true,"emojilibrary":true,
             "voiceName":"Microsoft David Desktop - English (United States)", // Replace Google Deutsch with the voiceName or an array of voiceNames from the below mentioned table list
             "voiceRate":0,"locShare":true


      ,  
        };
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
         kommunicateSettings.restartConversationByUser = true;
           
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
/* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */

  });


	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className='app'>
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
