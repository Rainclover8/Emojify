import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Emoji() {
    const [userInput, setUserInput] = useState("");
    const [questionNumber, setQuestionNumber] = useState(0);

    const questions = [
        { emojiSequence: "🎸,🔥,💔", correctAnswer: "Her Şeyi Yak", id: 0 },
        { emojiSequence: "🌧️,🖤,🎶", correctAnswer: "Güle Güle", id: 1 },
        { emojiSequence: "🚗,💔,🎶,😢", correctAnswer: "Boşver", id: 2 },
        { emojiSequence: "🔥,💃,🎧,🎤", correctAnswer: "Yaralı", id: 3 },
        { emojiSequence: "🏙️,💨,🎤,🌟", correctAnswer: "Ses Etme", id: 4 },
        { emojiSequence: "💫,🎶,🌙,🎤", correctAnswer: "Sonsuza Kadar", id: 5 },
        { emojiSequence: "☔,😢,💔,🎤", correctAnswer: "Anlatamıyorum", id: 6 },
        { emojiSequence: "🎸,🖤,💔,🎤", correctAnswer: "Bir Sonraki Hayatımda Gel", id: 7 },
        { emojiSequence: "⚡,🔥,🎤,🎧", correctAnswer: "Kötü Bir Yatırım", id: 8 },
        { emojiSequence: "🌪️,💥,🎤,🎶", correctAnswer: "Neredesin?", id: 9 },
        { emojiSequence: "🌙,🚗,🎤,💭", correctAnswer: "Beni Kendine Sakla", id: 10 },
        { emojiSequence: "🔥,🖤,🎶,💃", correctAnswer: "Bu Sabah", id: 11 },
        { emojiSequence: "🚶‍♂️,💨,💔,🎧", correctAnswer: "Benimle Her Şey Mümkün", id: 12 },
        { emojiSequence: "💔,🎤,🎶,🎧", correctAnswer: "Beni Affet", id: 13 },
        { emojiSequence: "🎶,🌪️,🔥,🎤", correctAnswer: "Kıskanmak", id: 14 },
        { emojiSequence: "🎶,🎸,💔,🖤", correctAnswer: "Belki Alışman Lazım", id: 15 },
        { emojiSequence: "💔,🎶,🌧️,🔥", correctAnswer: "Kimdir O", id: 16 },
        { emojiSequence: "🖤,🚗,🎤,🎶", correctAnswer: "Yağmurlar", id: 17 },
        { emojiSequence: "🎤,🎧,⚡,🎸", correctAnswer: "Sahip", id: 18 },
        { emojiSequence: "🎶,🌪️,💔,🔥", correctAnswer: "Rüzgar", id: 19 },
        { emojiSequence: "🎤,🔥,🌙,🎶", correctAnswer: "İnsanın Olmaz", id: 20 },
        { emojiSequence: "💔,🎸,🌧️,🎶", correctAnswer: "Kelimeler", id: 21 },
        { emojiSequence: "🔥,🎧,🌧️,🎤", correctAnswer: "İstanbul", id: 22 },
        { emojiSequence: "🎶,🎧,💃,🎸", correctAnswer: "Adını Bilenler", id: 23 },
        { emojiSequence: "🎤,🌙,🔥,🎶", correctAnswer: "Söz Ver", id: 24 },
        { emojiSequence: "🎶,🎧,🔥,💫", correctAnswer: "Gecenin Sonuna Yolculuk", id: 25 }
    ];

    const checkAns = (e) => {
        e.preventDefault();

        const userAnswer = userInput.trim().toLowerCase();
        const correctAnswer = questions[questionNumber].correctAnswer.toLowerCase();

        if (userAnswer === correctAnswer) {
            toast.success("Cevap doğru!");
            setQuestionNumber(questionNumber + 1);
            setUserInput("");
        } else {
            toast.error("Cevap yanlış!");
        }
    };

    const inputHandler = (e) => {
        setUserInput(e.target.value);
    };

    if (questionNumber >= questions.length) {
        return (
            <div>
                <h2>Tebrikler, tüm soruları tamamladınız!</h2>
                <ToastContainer />
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
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
