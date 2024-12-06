import React, {useState} from "react";

// Компонент модалки для отображения ошибки
export const ErrorModal = ({errorMessage, onClose}) => (
    <div className="modal-overlay" style={styles.overlay}>
        <div className="modal" style={styles.modal}>
            <div className="modal-content">
                <h2>Ошибка</h2>
                <p style={styles.error}>{errorMessage}</p>
                <button style={styles.button} onClick={onClose}>Закрыть</button>
            </div>
        </div>
    </div>
);

const styles = {
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999, // чтобы окно было поверх контента
    },
    modal: {
        maxWidth: '500px',
        width: '100%',
    },
    modalContent: {
        textAlign: 'center',
    },

    button: {
        all: 'unset',
        borderRadius: "15px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: "10px 20px",
        fontFamily: "IgraSans",
    },

    error: {
        fontFamily: "IgraSans",
    }
};


// Класс обработчика ошибок
export class ErrorHandler {
    constructor(setError) {
        this.setError = setError || null; // Передаем setError через конструктор
    }

    // Метод для установки ошибки
    setErrorCallback(setError) {
        this.setError = setError;
    }

    // Обработчик ошибки
    handleError(error) {
        if (this.setError) {
            let errorMessage = "Неизвестная ошибка"; // Начальное сообщение об ошибке

            console.error(error);
            // Проверяем, является ли ошибка объектом Response
            if (error) {
                error.json().then((errorDetails) => {
                    if (errorDetails.errors) {
                        // Ошибки валидации
                        const modelErrors = Object.values(errorDetails.errors).flat().join("\n");
                        errorMessage = `Ошибка валидации:\n${modelErrors}`;
                        console.log(errorMessage);
                    } else if (Array.isArray(errorDetails)) {
                        // Ошибка запроса
                        const identityErrors = errorDetails.map((e) => e.description).join("\n");
                        errorMessage = `Ошибка запроса:\n${identityErrors}`;
                    } else {
                        errorMessage = `Ошибка: ${JSON.stringify(errorDetails)}`;
                    }


                    // Устанавливаем ошибку в состояние
                    this.setError(errorMessage);
                }).catch(() => {
                    // Если не удается распарсить JSON, обрабатываем как обычную ошибку
                    this.setError(`Неизвестная ошибка с кодом ${error.status}`);
                });
            } else {
                // Обработка ошибок на уровне сети или JavaScript ошибок
                errorMessage = `Системная ошибка: ${error.message}`;
                this.setError(errorMessage);
            }


        } else {
            console.error("setError не определено, ошибка не будет установлена.");
        }
    }
}

// Функция для универсальной обработки ошибок
export async function fetchWithErrorHandling(url, options, callback, errorHandler) {
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            callback(data); // Обработка успешного ответа
        } else {

            errorHandler.handleError(response); // Обработка ошибки ответа
        }
    } catch (error) {

        errorHandler.handleError(error); // Обработка ошибки сети
    }
}

