import React, { useState } from "react";
import questions from "../questions";
import Scores from "./Scores";
import BuzzerPanel from "./BuzzerPanel";

import "../GameBoard.css";
import { db } from "../firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";

export default function GameBoard() {
  const [categories, setCategories] = useState(questions());
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [questionTime, setQuestionTime] = useState(null);

  function close() {
    setModalVisible(false);
    setAnswerVisible(false);
  }

  async function handleQuestionClick(categoryIndex, questionIndex) {
    setCurrentCategoryIndex(categoryIndex);
    setCurrentQuestionIndex(questionIndex);
    const question = categories[categoryIndex].questions[questionIndex];
    setCurrentQuestion(question);
    setModalVisible(true);
    setQuestionTime(new Date());

    await setDoc(doc(db, "question", "question"), {
      timestamp: serverTimestamp(),
      question: question,
    });
  }

  const handleAnswerClick = () => {
    const updatedCategories = [...categories];
    updatedCategories[currentCategoryIndex].questions[
      currentQuestionIndex
    ].answered = true;
    setCategories(updatedCategories);
    setAnswerVisible(true);
  };

  return (
    <div className="game-board">
      <h1 className="title">Bio Jeopardy!</h1>
      <div className="game-board-header">
        {/* Render the categories */}
        {categories.map((category) => (
          <div key={category.title} className="game-board-category">
            {category.title}
          </div>
        ))}
      </div>
      <div className="game-board-body">
        {/* Render the question values */}
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="game-board-column">
            {category.questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className={`game-board-cell + ${
                  question.answered ? "answered" : ""
                }`}
                onClick={() =>
                  handleQuestionClick(categoryIndex, questionIndex)
                }
              >
                {question.value}
              </div>
            ))}
          </div>
        ))}
        {/* Render modal */}
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h3>{currentQuestion.question}</h3>
              <p className="score">{currentQuestion.value + " points"}</p>
              <BuzzerPanel questionTime={questionTime} />
              {!answerVisible && (
                <div className="buttons">
                  <button className="closeButton" onClick={close}>
                    Close
                  </button>
                  <button className="greenButton" onClick={handleAnswerClick}>
                    Show Answer
                  </button>
                </div>
              )}
              {answerVisible && (
                <div>
                  <hr></hr>
                  <p className="answer">{currentQuestion.answer}</p>
                  <button className="closeButton" onClick={close}>
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Scores currentPoints={currentQuestion ? currentQuestion.value : 100} />
    </div>
  );
}
