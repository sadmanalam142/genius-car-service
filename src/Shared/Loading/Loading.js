import React from 'react';

const Loading = () => {
    return (
        <div className = 'd-flex justify-content-center'>
            <div style={{ height: '300px' }} class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;