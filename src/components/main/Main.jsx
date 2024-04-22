import { useContext } from "react";
import { assets } from "../../assets/assets";
import "../main/main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    loading,
    showResult,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini </p>
          <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello, Vishal</span>
                </p>
                <p>How Can I Help Today</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>Create a few tips on how I can grow my YouTube Channel</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                  <p>Create a 12-week study plan for learning a new language</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                  <p>I’m writing an out-of-office message and need your help</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                  <p>I'm doing a road trip to the U.S. Southwest in November</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <>
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>

                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {
                        loading 
                        ? <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                </div>
            </div>
            </>
          )}

          <div className="main-bottom">
            <div className="serch-box">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter a propmt here..!!"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {
                    input
                    ? 
                    <img src={assets.send_icon} alt="" onClick={() => onSent()} />
                    :
                    null
                }
              </div>
            </div>
            <p className="bottom-info">gemini may display wrong info</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
