import React from 'react';

const ErrorMessage = ({ message, onRetry }) => (
    <div className="alert alert-danger d-flex justify-content-between align-items-center">
        <span>⚠️ {message}</span>
        {onRetry && (
            <button className="btn btn-outline-danger btn-sm" onClick={onRetry}>
                Retry
            </button>
        )}
    </div>
);

export default ErrorMessage;