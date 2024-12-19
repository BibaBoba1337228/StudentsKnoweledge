import React, {useState} from "react";
import "../../styles/FileAttachment.css";
import trashcan from '../../assets/icons/trashcan.svg';


const FileAttachment = ({initialFile, materialId, onFileChange}) => {
    const [file, setFile] = useState(initialFile);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            onFileChange(selectedFile);
        }
    };


    const removeFile = async () => {
        if (!file) return;


        if (file != initialFile) {
            setFile(null);
            onFileChange(null);
            return;
        }

        setIsLoading(true);


        setFile(null);
        onFileChange(null);
        setIsLoading(false);
    };


    return (
        <div className="file-attachment-container">
            <div className="file-input-container">
                <label className="file-label">
                    Выбрать файл...
                    <input
                        type="file"
                        accept="*"
                        onChange={handleFileChange}
                        className="file-input"
                        disabled={file !== null || isLoading}
                    />
                </label>
            </div>

            <div className="file-list-container">
                {file ? (
                    <ul className="file-list">
                        <li className="file-list-item">
                            <span className="file-name">{file.name}</span>
                            <button
                                onClick={removeFile}
                                className="file-remove-button"
                                disabled={isLoading}
                            >
                                <img src={trashcan} alt="trashcan"/>
                            </button>
                        </li>
                    </ul>
                ) : (
                    <div className="no-file-selected">
                        <span>Файл не выбран</span>
                    </div>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default FileAttachment;
