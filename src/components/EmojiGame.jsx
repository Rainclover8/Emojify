import React, { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmojiGame() {
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [tekrarCevap, setTekrarCevap] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase.from("questions").select("*");
            if (error) {
                console.error("Sorular çekilirken hata oluştu:", error);
            } else {
                setQuestions(data);
            }
        };
        fetchQuestions();
    }, []);

    const checkAns = (e) => {
        e.preventDefault();
        if (!questions.length) return;

        const userAnswer = userInput.trim().toLowerCase();
        const correctAnswer = questions[questionNumber]?.correct_answer?.toLowerCase();

        if (userAnswer === correctAnswer) {
            toast.success("Cevap doğru!");
            setQuestionNumber((prev) => prev + 1);
            setUserInput("");
            setTekrarCevap(0);
        } else {
            toast.error("Cevap yanlış!");
            if (tekrarCevap < correctAnswer.length) {
                setTekrarCevap((prev) => prev + 1);
            }
        }
    };

    if (questions.length && questionNumber >= questions.length) {
        return <h2>Tebrikler, tüm soruları tamamladınız!</h2>;
    }

    return (
        <div>
            {questions.length > 0 ? (
                <>
                    <h2>{questions.length} Adet soru var, siz şu an {questionNumber + 1}</h2>
                    <h1 style={{backgroundColor:"white", padding:12, borderRadius:20}}>{questions[questionNumber].emoji_sequence}</h1>
                    <h3 style={{backgroundColor:"darkgray", padding:6, borderRadius:20}}>Emoji Sahibi: {questions[questionNumber].user_name}</h3>
                    <form onSubmit={checkAns}>
                        <input
                            type="text"
                            placeholder="Cevabınızı yazın..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button>Yanıtı Kontrol Et</button>
                    </form>
                    {tekrarCevap > 0 && (
                        <p>
                            Doğru cevabın harfleri:{" "}
                            {questions[questionNumber].correct_answer.slice(0, tekrarCevap)}
                        </p>
                    )}
                </>
            ) : (
                <h2>Yükleniyor...</h2>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
