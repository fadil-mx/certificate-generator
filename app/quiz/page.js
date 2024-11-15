"use client";
import React, { useState, useEffect } from 'react';
import { tradingQuiz } from '../data';

const QuizPage = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [checked, setChecked] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correct: 0,
        wrong: 0,
    });
    const [timer, setTimer] = useState(5); // Timer starts with 10 seconds per question

    const { questions } = tradingQuiz;
    const { question, answers, correctAnswer } = questions[activeQuestion];


    const totalScore = questions.length * 5; // 5 points per question
    const overallPercentage = (result.score / totalScore) * 100;



    // Set up the timer effect
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        // If the timer runs out, automatically go to the next question
        if (timer === 0) {
            handleNextQuestion();
        }

        // Clean up the interval on component unmount or question change
        return () => clearInterval(countdown);
    }, [timer, activeQuestion]);

    const checkAnswer = (selectedAnswer, index) => {
        setChecked(true);
        setSelectedIndex(index);
        if (selectedAnswer === correctAnswer) {
            setSelectedAnswer("true");
            setResult((prev) => ({
                ...prev,
                score: prev.score + 5,
                correct: prev.correct + 1,
            }));
        } else {
            setSelectedAnswer("false");
            setResult((prev) => ({
                ...prev,
                wrong: prev.wrong + 1,
            }));
        }
    };

    const handleNextQuestion = () => {
        setSelectedIndex(null);
        setChecked(false);
        setTimer(10); // Reset timer for the next question

        if (activeQuestion < questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold">Quiz Page</h1>
            <div>
                <h2 className="text-2xl">
                    Question: {activeQuestion + 1} <span>/{questions.length}</span>
                </h2>
                <p>Time Remaining: {timer} seconds</p>
            </div>
            {!showResult ? (
                <div className="h-auto w-[40%] bg-white p-8 rounded-md">
                    <h3 className="text-black text-4xl font-bold mb-5">{question}</h3>
                    {answers.map((answer, index) => (
                        <li
                            key={index}
                            onClick={() => checkAnswer(answer, index)}
                            className={`text-black list-none text-[20px] border-[2px] border-gray-300 p-2 mb-5 rounded-md cursor-pointer ${selectedIndex === index ? "bg-blue-500" : "hover:bg-slate-200"}`}
                        >
                            <span>{answer}</span>
                        </li>
                    ))}
                    {checked ? (
                        <button onClick={handleNextQuestion} className='bg-blue-500 text-black w-full rounded-full p-3'>
                            {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
                        </button>
                    ) : (
                        <button disabled className="w-full p-3 rounded-full bg-gray-300 cursor-not-allowed">Next</button>
                    )}
                </div>
            ) : (
                <div className='h-auto w-[40%] bg-white p-8 rounded-md'>
                    <h3 className="text-black text-4xl font-bold mb-5">Result</h3>
                    <h3 className="text-black text-5xl font-bold mb-5">Overall: <span className='text-orange-600'> {overallPercentage.toFixed(2)}% </span></h3>
                    <p className="text-black text-[18px] font-bold mb-5">total qustion: <span >{questions.length}</span></p>
                    <p className="text-black text-[18px] font-bold mb-5">total score: <span>{result.score}</span></p>
                    <p className="text-black text-[18px] font-bold mb-5">correct answer: <span>{result.correct}</span></p>
                    <p className="text-black text-[18px] font-bold mb-5">wrong answer: <span>{result.wrong}</span></p>
                    <button className='text-black bg-orange-600 p-2 rounded-lg' onClick={() => window.location.reload()}>restart</button>

                </div>
            )}
        </div>
    );
};

export default QuizPage;






