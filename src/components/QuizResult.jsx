import React from 'react'

function QuizResult(props) {
  return (
    <>
    <div className='show-score'>
    <div>
    <img height={"200px"} src='https://wallpapers.com/images/hd/close-up-of-happy-smile-icon-7f1rlnzpaj3dpof3.jpg' alt='hello'/>
    </div>
    <div>
        Your Score:{props.score}<br/>
        Total Score:{props.totalScore}
    </div>
    </div>
    <button id="next-button" onClick={props.tryAgain}>Try Again</button>
    </>
  )
}

export default QuizResult