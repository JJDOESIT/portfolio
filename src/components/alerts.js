import "../styles/alerts.css";

export default function Alerts(props) {
  return (
    <div
      className="alert-container"
      style={{
        display: props.display,
        backgroundColor: props.bgColor,
        border: props.border,
      }}
    >
      <div>
        <p style={{ color: props.fontColor }}>{props.text}</p>
      </div>
      <div>
        <input
          type="button"
          value="X"
          onClick={() => {
            props.setAlertData((prev) => {
              return { ...prev, display: "None" };
            });
          }}
        ></input>
      </div>
    </div>
  );
}
