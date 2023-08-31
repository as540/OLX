import "./messanger.css";
import Navbar from "../Component/Navbar";
import Message from "../Component/Messages/Message";

export default function Messanger() {
    return (
        <div>
            <Navbar />
            <div className="messangerContainer">
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="Write something...">

                            </textarea>
                            <button className="chatSubmitButton" >
                                Send
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
