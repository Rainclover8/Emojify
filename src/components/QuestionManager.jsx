

import React, { useState, useEffect } from "react";
import { supabase } from "../client/supabaseClient";
import { toast } from "react-toastify";

export default function QuestionManager() {
    const [questions, setQuestions] = useState([]);
    const [newEmojiSequence, setNewEmojiSequence] = useState("");
    const [newCorrectAnswer, setNewCorrectAnswer] = useState("");
    const [newName, setNewName] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase.from("questions").select("*");
            if (error) {
                console.error("Sorular çekilirken hata oluştu:", error);
            } else {
                if (Array.isArray(data)) {
                    setQuestions(data);
                } else {
                    console.error("Beklenen veri formatı alınamadı:", data);
                    toast.error("Sorular alınırken beklenmedik bir hata oluştu.");
                }
            }
        };
        fetchQuestions();
    }, []);

    const addQuestion = async (e) => {
        e.preventDefault();

        console.log("Veri ekleniyor:", {
            emoji_sequence: newEmojiSequence,
            correct_answer: newCorrectAnswer,
            user_name: newName,
        });

        const { data, error } = await supabase
            .from("questions")
            .insert([{
                emoji_sequence: newEmojiSequence,
                correct_answer: newCorrectAnswer,
                user_name: newName,
            }]);

        if (error) {
            console.error("Soru eklenirken hata oluştu:", error);
            toast.error("Soru eklenirken hata oluştu: " + error.message);
        } else if (!data || !Array.isArray(data)) {
            console.error("Beklenmeyen veri formatı:", data);
            toast.error("Soru eklenirken beklenmedik bir hata oluştu.");

        } else {
            console.log("Soru başarıyla eklendi:", data);
            setQuestions((prev) => [...prev, ...data]);
            setNewEmojiSequence("");
            setNewCorrectAnswer("");
            setNewName("");
            toast.success("Soru başarıyla eklendi!");
        }

    };



    return (
        <div>
            <h1>Soruları Yönet</h1>
            <form onSubmit={addQuestion}>
                <input
                    type="text"
                    placeholder="Adınızı Giriniz.."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Emoji dizisini girin"
                    value={newEmojiSequence}
                    onChange={(e) => setNewEmojiSequence(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Doğru cevabı girin"
                    value={newCorrectAnswer}
                    onChange={(e) => setNewCorrectAnswer(e.target.value)}
                />
                <button type="submit">Soru Ekle</button>
            </form>
            <h2>Mevcut Sorular:</h2>
            <ul>
                {questions.length > 0 ? (
                    questions.map((q) => (
                        <li key={q.id}>
                            {q.emoji_sequence} - {q.correct_answer} (Sahibi: {q.name || "Belirtilmemiş"})
                        </li>
                    ))
                ) : (
                    <p>Henüz soru eklenmemiş.</p>
                )}
            </ul>
        </div>
    );
}
