import {useLocation} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameReport = () => {
  const location = useLocation()
  const {questions, selectedOptions} = location.state || {}

  if (
    !questions ||
    !selectedOptions ||
    !Array.isArray(questions) ||
    !Array.isArray(selectedOptions)
  ) {
    return <div>No data available. Please start a new quiz.</div>
  }

  const totalQuestions = questions.length
  const answeredQuestions = selectedOptions.filter(Boolean).length
  const unattempted = totalQuestions - answeredQuestions
  const correctAnswers = selectedOptions.filter(
    (option, index) =>
      option &&
      questions[index].options.find(opt => opt.text === option).is_correct ===
        'true',
  ).length
  const incorrectAnswers = answeredQuestions - correctAnswers

  const renderOptions = question => {
    switch (question.options_type) {
      case 'DEFAULT':
      case 'SINGLE_SELECT':
        return (
          <ul className="report-options-list report-default-options">
            {question.options.map(option => (
              <li key={option.id} className="report-option-item">
                {option.text}
                {option.is_correct === 'true' && (
                  <img
                    className="report-correct-icon"
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                    alt="correct"
                  />
                )}
              </li>
            ))}
          </ul>
        )
      case 'IMAGE':
        return (
          <ul className="report-options-list report-image-options">
            {question.options.map(option => (
              <li key={option.id} className="report-option-item">
                <img
                  src={option.image_url}
                  alt={option.text}
                  className="report-option-image"
                />
                {option.is_correct === 'true' && (
                  <img
                    className="report-correct-icon"
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                    alt="correct"
                  />
                )}
              </li>
            ))}
          </ul>
        )
      default:
        return <p>Unsupported question type</p>
    }
  }

  return (
    <>
      <Header />
      <div className="game-report-container">
        <div className="report-summary">
          <h2>Quiz Summary</h2>
          <p>Total Questions: {totalQuestions}</p>
          <p>Answered: {answeredQuestions}</p>
          <p>Correct: {correctAnswers}</p>
          <p>Incorrect: {incorrectAnswers}</p>
          <p>Unattempted: {unattempted}</p>
        </div>
        {unattempted > 0 && (
          <div className="unattempted-questions">
            <h2>Unattempted Questions</h2>
            <div className="questions-scroll-container">
              <ul className="report-questions-list">
                {questions.map((question, index) => {
                  if (!selectedOptions[index]) {
                    return (
                      <li key={question.id} className="report-question-item">
                        <p className="report-question-text">
                          {question.question_text}
                        </p>
                        {renderOptions(question)}
                      </li>
                    )
                  }
                  return null
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GameReport
