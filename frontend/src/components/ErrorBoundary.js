import '../styles/Error.css';

const ErrorBoundary = ({isOpen, setIsOpen, errorText}) => {

    return isOpen && (
        <div className="error-modal-wrapper">
            <div className="error-modal">
                <h2>Ошибка</h2>
                <p>{errorText}</p>
                <button onClick={() => setIsOpen(false)} className="error-modal-close">
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default ErrorBoundary;
