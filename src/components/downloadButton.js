import "../styles/downloadButton.css";
import "../styles/keyframes.css";
import downloadFile from "../functions/downloadPdf";

export default function DownloadButton(props) {
  return (
    <div className="download-button-container">
      <input
        type="button"
        value={props.buttonTitle}
        onClick={() => {
          downloadFile(props.fileName, props.filePath);
        }}
      ></input>
      <p className="download-button-top">Filename : {props.fileName}</p>
      <p className="download-button-bottom">Size: {props.fileSize}</p>
    </div>
  );
}
