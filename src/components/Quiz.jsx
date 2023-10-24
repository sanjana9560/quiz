import React, { useEffect, useState } from 'react'
import { QuizData } from '../Data/quizData'
import QuizResult from './QuizResult';
import "./quiz.css"
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const[nextQ,setNextQ]=useState(false);
  const [notAnswer,setNotAnswer]=useState(0)
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [count,setCount]=useState(0)
  const [show,setShow]=useState(false)
  const [update,setUpdate]=useState(false)
  const [allTime,setAllTime]=useState([])

  // useEffect(()=>{
  //   if(nextQ){
  //   setClickedOption(0);
  //   setNotAnswer(notAnswer+1)
  //   // setNextQ(false)
  //   // changeQuestion()
  //   }
    
    
  // },[nextQ])

function timer(seconds, cb) {
  
  var remaningTime = seconds;
  setAllTime([...allTime,window.setTimeout(function() {
    if(!remaningTime){
    cb();
    }
    console.log(remaningTime);
    if (remaningTime > 0) {
      setCount(9-(remaningTime-1))
      timer(remaningTime - 1, cb); 
    }
  }, 1000)])
  
}

// var callback = function() {
//   console.log('callback');
// };




//   var timeOut=setInterval(()=>{
//     if(count>9){
//       setNextQ(true)
//       close()
//     }
//     else{
//   setCount(count+1)}
// },1000);
// const close=()=>{
//       clearTimeout(timeOut);

// }

const timeUpdate=()=>{
  setShow(true)
}
  useEffect(()=>{
    timer(10, timeUpdate);
    // if(count==10){
    //   setShow(true)

    //   // setCount(0) 
    // setNextQ(false)
    // // setClickedOption(0);
    

    // }
  },[])

  const changeQuestion = (e) => {
    e.preventDefault();
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      allTime.map(el=>{
      clearTimeout(el);
      })
      setCount(0)
      setShow(false)
      setUpdate(false)
    setClickedOption(0);
    timer(10, timeUpdate);




      
    } else {
      setShow(false)

      setShowResult(true)
    }
  }
  const updateScore = () => {
    console.log(clickedOption === QuizData[currentQuestion].answer,update,"09909090909090");
    if (clickedOption === QuizData[currentQuestion].answer && update) {
      setScore(score + 1);
    }
  }

  
  
  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  }
  
  return (
    <div>
      <p className="heading-txt">Quiz APP</p>
      <div className="container">
        {showResult ? (
          <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
        ) : (
          <>

            <div>
              <img height={"150px"} src={QuizData[currentQuestion].img} alt="pic not found" />
            </div>

            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">{QuizData[currentQuestion].question}</span>
              <span style={{border:"1px black solid", padding:"30px",marginLeft:"20px",borderRadius:"60%",fontWeight:"bolder",fontSize:"140%",backgroundColor:"GrayText"}}>{count}</span>
            </div>
            <div className="option-container">
              {QuizData[currentQuestion].options.map((option, i) => {
                return (
                  <button
                    // className="option-btn"
                    disabled={update}
                    className={`option-btn ${ (QuizData[currentQuestion]["answer"]==i+1&&clickedOption)||(show &&QuizData[currentQuestion]["answer"]==i+1)? "checked" : null
                      }`} style={clickedOption==i+1 && QuizData[currentQuestion]["answer"]!==clickedOption?{background:"red"}:{}}
                    key={i}
                    onClick={() =>{ setClickedOption(i + 1);setUpdate(true)}}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
          </>)}
      </div>
    </div>
  )
}

export default Quiz