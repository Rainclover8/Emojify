import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Emoji() {
    const [userInput, setUserInput] = useState("");
    const [questionNumber, setQuestionNumber] = useState(0);
    const [tekrarCevap, setTekrarCevap] = useState(0);

    const questions = [
        { emojiSequence: "🎸,🔥,💔", correctAnswer: "Her Şeyi Yak", id: 0 },
        { emojiSequence: "🌧️,🖤,🎶", correctAnswer: "Güle Güle", id: 1 },
        { emojiSequence: "🚗,💔,🎶,😢", correctAnswer: "Boşver", id: 2 }
    ];

    const checkAns = (e) => {
        e.preventDefault();

        const userAnswer = userInput.trim().toLowerCase();
        const correctAnswer = questions[questionNumber].correctAnswer.toLowerCase();

        if (userAnswer === correctAnswer) {
            toast.success("Cevap doğru!");
            setQuestionNumber(questionNumber + 1);
            setUserInput("");
            setTekrarCevap(0);
        } else {
            toast.error("Cevap yanlış!");
            if (tekrarCevap < correctAnswer.length) {
                setTekrarCevap((prev) => prev + 1);
            }
        }
    };

    const inputHandler = (e) => {
        setUserInput(e.target.value);
    };

    if (questionNumber >= questions.length) {
        return (
            <div>
                <h2>Tebrikler, tüm soruları tamamladınız!</h2>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        );
    }

    return (
        <div className="main_section">
            <h1>Soru: {questions[questionNumber].emojiSequence}</h1>
            <form onSubmit={checkAns}>
                <input type="text" value={userInput} onChange={inputHandler} />
                <button>Yanıtı Kontrol Et</button>
            </form>
            <div>
                {tekrarCevap > 0 && (
                    <h1>
                        Doğru cevabın harfleri:{" "}
                        {questions[questionNumber].correctAnswer.slice(0, tekrarCevap)}
                    </h1>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
