import "./message.css"


export default function Message(props) {
    const {own}=props;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageTopText">Hey bro Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore tenetur, architecto laboriosam animi quia voluptas aut molestiae porro rem perferendis quam excepturi aperiam ut eos, praesentium non nobis. Dicta a animi possimus qui modi?</p>
      </div>
      <div className="messageBottom">
        4 min ago
      </div>
    </div>
  )
}
