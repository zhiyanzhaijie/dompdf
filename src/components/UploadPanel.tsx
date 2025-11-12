import { useState } from 'react';
import { usePdf } from '../context/PdfContext';

export default function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const { setPdfData } = usePdf();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    setPdfData(blobUrl, file.name);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>PDF Viewer</h1>
        
        <div style={styles.uploadArea}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            id="file-input"
            style={styles.fileInput}
          />
          <label htmlFor="file-input" style={styles.fileLabel}>
            <div style={styles.icon}>📄</div>
            <p style={styles.text}>Select PDF file</p>
          </label>
        </div>

        {file && (
          <div style={styles.fileInfo}>
            <p style={styles.fileName}>{file.name}</p>
            <p style={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button 
          onClick={handleUpload} 
          style={{
            ...styles.button,
            ...(file ? {} : styles.buttonDisabled)
          }}
          disabled={!file}
        >
          View PDF
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#000000',
    padding: '20px',
  },
  card: {
    border: '1px solid #ffffff',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    textAlign: 'center' as const,
    color: '#ffffff',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: 'normal' as const,
  },
  uploadArea: {
    position: 'relative' as const,
    border: '2px dashed #ffffff',
    padding: '40px 20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    backgroundColor: '#000000',
  },
  fileInput: {
    display: 'none',
  },
  fileLabel: {
    cursor: 'pointer',
    display: 'block',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '10px',
  },
  text: {
    color: '#ffffff',
    fontSize: '14px',
    margin: 0,
  },
  fileInfo: {
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#1a1a1a',
    borderLeft: '4px solid #ffffff',
  },
  fileName: {
    margin: '5px 0',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold' as const,
  },
  fileSize: {
    margin: '5px 0',
    color: '#999999',
    fontSize: '12px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    fontSize: '14px',
    fontWeight: 'normal' as const,
    cursor: 'pointer',
    marginTop: '20px',
  },
  buttonDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
};
