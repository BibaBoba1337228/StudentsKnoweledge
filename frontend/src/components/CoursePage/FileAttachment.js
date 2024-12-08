import React, {useState, useEffect} from "react";
import "../../styles/FileAttachment.css";
import trashcan from '../../assets/icons/trashcan.svg';
import {fetchWithAuth} from "../../api/fetchWithAuth";

const FileAttachment = ({initialFile, materialId, onFileChange}) => {
    const [file, setFile] = useState(initialFile);
    const [isLoading, setIsLoading] = useState(false); // состояние загрузки
    const [error, setError] = useState(null); // состояние для ошибки

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // получаем только один файл
        if (selectedFile) {
            setFile(selectedFile); // обновляем состояние с выбранным файлом
            onFileChange(selectedFile); // передаем родительскому компоненту
        }
    };


    const removeFile = async () => {
        if (!file) return;

        // Удаляем файл через API только если это тот же файл, что был изначально
        if (file != initialFile) {
            setFile(null); // просто сбрасываем файл локально
            onFileChange(null); // передаем родительскому компоненту информацию о файле
            return;
        }

        setIsLoading(true);  // начинаем процесс загрузки

        // Успешное удаление файла, обновляем состояние
        setFile(null); // сбрасываем файл локально
        onFileChange(null); // передаем родительскому компоненту информацию о файле
        setIsLoading(false); // завершение загрузки

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
                        disabled={file !== null || isLoading} // блокируем выбор нового файла, если уже есть выбранный или идет загрузка
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
                                disabled={isLoading} // блокируем кнопку удаления, если идет загрузка
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

            {error && <div className="error-message">{error}</div>} {/* отображение ошибки */}
        </div>
    );
};

export default FileAttachment;
