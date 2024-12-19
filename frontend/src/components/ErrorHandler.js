import React from "react";
import {fetchWithAuth} from "../api/fetchWithAuth";


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
        zIndex: 999,
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


export class ErrorHandler {
    constructor(setError) {
        this.setError = setError || null;
    }

    setErrorCallback(setError) {
        this.setError = setError;
    }

    handleError(error) {
        if (this.setError) {
            let errorMessage = "Неизвестная ошибка";

            if (error instanceof Response) {
                error.json().then((errorDetails) => {
                    if (errorDetails.errors) {
                        const modelErrors = Object.values(errorDetails.errors).flat().join("\n");
                        errorMessage = `Ошибка валидации:\n${modelErrors}`;
                    } else if (Array.isArray(errorDetails)) {
                        const identityErrors = errorDetails.map((e) => e.description).join("\n");
                        errorMessage = `Ошибка запроса:\n${identityErrors}`;
                    } else {
                        errorMessage = `Ошибка: ${JSON.stringify(errorDetails)}`;
                    }

                    this.setError(errorMessage);
                }).catch(() => {
                    this.setError(`Неизвестная ошибка с кодом ${error.status}`);
                });
            } else if (error instanceof Error) {
                errorMessage = `Системная ошибка: ${error.message}`;
                this.setError(errorMessage);
            } else {
                this.setError(`Неизвестный тип ошибки: ${JSON.stringify(error)}`);
            }
        } else {
            console.error("setError не определено, ошибка не будет установлена.");
        }
    }
}

export async function fetchWithErrorHandling(url, options, callback = null, errorHandler = null) {
    try {
        const response = await fetchWithAuth(url, options);
        if (response.ok) {
            const data = await response.json();
            if (callback) {
                callback(data);
            } else {
                return data;
            }
        } else {
            if (errorHandler) {
                errorHandler.handleError(response);
            } else {
                console.error("Error response:", response);
            }
        }
    } catch (error) {
        if (errorHandler) {
            errorHandler.handleError(error);
        } else {
            console.error("Network error:", error);
        }
    }
}


