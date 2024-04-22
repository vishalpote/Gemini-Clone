import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        try {
            setResultData("");
            setLoading(true);
            setShowResult(true);
            let response;
            if (prompt !== undefined) {
                response = await run(prompt);
                setRecentPrompt(prompt);
            } else {
                setPrevPrompt((prev) => [...prev, input]);
                setRecentPrompt(input);
                response = await run(input);
            }
            let resArray = response.split("**");
            let newRes = ""; // Initialize newRes as an empty string
            for (let i = 0; i < resArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newRes += resArray[i];
                } else {
                    newRes += "<b>" + resArray[i] + "</b>";
                }
            }
            let newLine = newRes.split("*").join("<br/>");
            let newResArray = newLine.split(" ");
            for (let i = 0; i < newResArray.length; i++) {
                const nextword = newResArray[i];
                delayPara(i, nextword + " ");
            }
            setLoading(false);
            setInput(""); // Move setInput inside the try block
        } catch (error) {
            console.error("Error:", error);
            setLoading(false); // Ensure setLoading is set to false in case of error
        }
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
