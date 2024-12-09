import React, {useState, useRef} from "react";
import "../../styles/FileAttachment.css";
import trashcan from '../../assets/icons/trashcan.svg';

const FileAttachment = ({initialFile, onFileChange}) => {
    const [file, setFile] = useState(initialFile);
    const [isLoading, setIsLoading] = useState(false); // состояние загрузки
    const [error, setError] = useState(null); // состояние для ошибки
    const fileInputRef = useRef(null); // реф для доступа к input

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // получаем только один файл
        if (selectedFile) {
            setFile(selectedFile); // обновляем состояние с выбранным файлом
            onFileChange(selectedFile); // передаем родительскому компоненту
        }
    };

    const removeFile = async () => {
        if (!file) return;

        setIsLoading(true); // начинаем процесс загрузки

        // Успешное удаление файла
        setFile(null); // сбрасываем файл локально
        onFileChange(null); // передаем родительскому компоненту информацию об удалении файла
        setIsLoading(false); // завершение загрузки

        // Сбрасываем значение input
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // очищаем поле для выбора файла
        }
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
                        ref={fileInputRef} // присваиваем реф
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
