import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Upload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/json") {
            setFile(selectedFile);
        } else {
            alert("Please select a valid JSON file.");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => setDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.name.endsWith('.json')) {
            setFile(droppedFile);
        } else {
            alert("Only JSON files are allowed.");
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const response = await fetch('/api/upload/createUpload', {
                method: 'POST',
                body: formData,
            });
            
            const result = await response.json();

            if (response.ok) {
                navigate('/saved');
            } else {
                alert("Upload failed: " + result.message);
            }
        } catch (err) {
            console.error("Upload failed", err);
            alert("Network error during upload.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card upload-card">
                <div className='auth-header'>
                    <i className="fas fa-file-import" style={{ fontSize: '2.5rem', color: '#0095f6', marginBottom: '15px' }}></i>
                    <h1>Import Your Data</h1>
                    <p>Upload your Instagram <code>saved_posts.json</code></p>
                </div>

                <form onSubmit={handleUpload} className="auth-form">
                    <div 
                        className={`drop-zone ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <input
                            id="fileInput"
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <div className="drop-zone-content">
                            <i className={`fas ${file ? 'fa-check-circle' : 'fa-cloud-upload-alt'}`}></i>
                            <span>{file ? file.name : "Drag & drop or click to browse"}</span>
                        </div>
                    </div>

                    <button className="btn-primary" type="submit" disabled={loading || !file}>
                        {loading ? (
                            <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                        ) : "Analyze JSON"}
                    </button>
                    
    
                </form>
            </div>
        </div>
    );
}