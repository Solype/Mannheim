import React, { useState } from 'react';

interface DialogProps {
    isOpen: boolean;
    title: string;
    url: string;
    close: () => void;
}

const Dialog: React.FC<DialogProps> = ({ url, isOpen, title, close }) => {
    if (!isOpen) return null;

    const [contentState, setContentState] = useState("");

    const handleOkClick = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: title,
                    value: contentState
                })
            });
            window.location.reload();
        } catch (error) {
            console.error('Error updating priority:', error);
        }
    };

    const onCancel = () => {
        setContentState('');
        close();
    };

    const onChangeContent = (value: string) => {
        setContentState(value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-black border border-white p-4 rounded">
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <textarea
                    value={contentState}
                    onChange={(e) => onChangeContent(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-black"
                />
                <div className="flex justify-between w-full">
                    <button onClick={handleOkClick} className="px-4 py-2 bg-blue-500 text-white rounded">OK</button>
                    <button onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
