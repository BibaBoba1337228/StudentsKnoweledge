import React, {useState} from "react";
import "../../styles/FileAttachment.css";
import trashcan from '../../assets/icons/trashcan.svg'

const FileAttachment = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFile = (fileToRemove) => {
        setFiles(files.filter((file) => file !== fileToRemove));
    };

    return (
        <div className="file-attachment-container">
            <div className="file-input-container">
                <label className="file-label">
                    Выбрать файл...
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="file-input"
                    />
                </label>
            </div>
            <div className="file-list-container">
                <ul className="file-list">
                    {files.map((file, index) => (
                        <li key={index} className="file-list-item">
                            <span className="file-name">{file.name}</span>
                            <button
                                onClick={() => removeFile(file)}
                                className="file-remove-button"
                            >
                                <img src={trashcan} alt="trashcan"/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FileAttachment;
