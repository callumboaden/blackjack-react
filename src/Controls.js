import React from 'react';
import './Controls.css';

function Controls(props) {
    return (
        <div className="Controls">
            <h4>Controls</h4>
            <button className="Controls-hit">Hit</button>
            <button className="Controls-stand">Stand</button>
            <button className="Controls-double">Double</button>
            <button className="Controls-double">Split</button>
        </div>
    )
}

export default Controls
