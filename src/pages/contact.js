import "../styles/contact.css";
import "../styles/keyframes.css";
import Alerts from "../components/alerts";
import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";

export default function Contact() {
  const [borderCount, setBorderCount] = useState(1);
  const [alertData, setAlertData] = useState({
    text: "",
    display: "None",
    bgColor: "",
    border: "",
    fontColor: "",
  });
  const form = useRef();

  //Increases or decreases the border gradient percent
  useEffect(() => {
    var direction = true;
    const borderDelay = 100;

    setInterval(() => {
      setBorderCount((prev) => {
        if (prev >= 100) {
          direction = false;
        } else if (prev <= 1) {
          direction = true;
        }
        if (direction === true) {
          return prev + 1;
        } else {
          return prev - 1;
        }
      });
    }, borderDelay);
  }, []);

  //Everytime the borderCount is changed, change the border gradient
  useEffect(() => {
    let borderList = document.querySelectorAll(
      ".contact-form-container > div:not(:last-child) > input, .contact-form-container > div > textarea"
    );

    for (let node = 0; node < borderList.length; node++) {
      var percent;
      if (node % 2 === 0) {
        percent = borderCount;
      } else {
        percent = 100 - borderCount;
      }
      borderList[node].style.backgroundImage =
        "linear-gradient(rgb(36,36,36), rgb(36,36,36)), linear-gradient(45deg, rgb(192, 164, 42), rgb(64, 64, 64)" +
        percent +
        "%)";
    }
  }, [borderCount]);

  //Check if the input fields are valid
  function inputValid() {
    return (
      form.current.from_name.value !== "" &&
      form.current.from_email.value !== "" &&
      form.current.message.value !== ""
    );
  }

  //Clear the input form
  function clearForm() {
    form.current.from_name.value = "";
    form.current.from_email.value = "";
    form.current.message.value = "";
  }

  //Send email using emailJS
  function sendEmail() {
    if (!inputValid()) {
      setAlertData({
        text: "Error: Fill Out All Fields",
        display: "flex",
        bgColor: "#f8d7da",
        border: "1px solid #f5c6cb",
        fontColor: "#721c24",
      });
    } else {
      emailjs
        .sendForm(
          "service_395s3z8",
          "template_tdktk83",
          form.current,
          "-FGaeAsoroUeurrGI"
        )
        .then(
          (result) => {
            setAlertData({
              text: "Message Sent",
              display: "flex",
              bgColor: "#d4edda",
              border: "1px solid #c3e6cb",
              fontColor: "#155724",
            });
            clearForm();
          },
          (error) => {
            setAlertData({
              text: "Error: Email Not Sent",
              display: "flex",
              bgColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              fontColor: "#721c24",
            });
          }
        );
    }
  }

  return (
    <div className="contact-container">
      <div className="contact-title-container">
        <p>Send me a message!</p>
        <p>Fill out your information and I'll be in touch.</p>
      </div>
      <form ref={form} className="contact-form-container">
        <div>
          <input
            type="text"
            maxLength="50"
            name="from_name"
            placeholder="Name"
          ></input>
        </div>
        <div>
          <input
            type="text"
            maxLength="50"
            name="from_email"
            placeholder="Email or Phone Number"
          ></input>
        </div>
        <div>
          <textarea
            placeholder="Message"
            name="message"
            maxLength="1000"
          ></textarea>
        </div>
        <Alerts
          text={alertData.text}
          display={alertData.display}
          border={alertData.border}
          fontColor={alertData.fontColor}
          bgColor={alertData.bgColor}
          setAlertData={setAlertData}
        ></Alerts>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              sendEmail();
            }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
