import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MCombobox from './MCombobox';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MCombobox data_options={
        [   "Option 1",
            "Option 2",
            "Option 3",
            "Option 4",
            "Option 5",
            "Option 6",
            "Option 7",
            "Option 8",
            "Option 9", ]
    } />
);
