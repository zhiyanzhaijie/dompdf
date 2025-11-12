import { useState } from 'react';
import { usePdf } from '../context/PdfContext';

export default function ViewPanel() {
  const { pdfUrl, clearPdfData } = usePdf();
  const [showConfirm, setShowConfirm] = useState(false);

  const viewerUrl = `${window.location.origin}/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`;

  const handleConfirmClose = () => {
    clearPdfData();
    setShowConfirm(false);
  };

  return (
    <div style={styles.container}>
      {/* Breathing light indicator */}
      <div
        style={styles.breathingLight}
        onClick={() => setShowConfirm(true)}
        title="Close PDF"
      />

      {/* Confirmation dialog */}
      {showConfirm && (
        <div style={styles.overlay} onClick={() => setShowConfirm(false)}>
          <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <p style={styles.dialogText}>Remove this PDF?</p>
            <div style={styles.dialogButtons}>
              <button style={styles.buttonCancel} onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button style={styles.buttonConfirm} onClick={handleConfirmClose}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <iframe
        src={viewerUrl}
        style={styles.iframe}
        title="PDF Viewer"
      />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative' as const,
    height: '100vh',
    backgroundColor: '#000000',
  },
  breathingLight: {
    position: 'fixed' as const,
    top: '10px',
    left: '40px',
    width: '12px',
    height: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1000,
    animation: 'breathing 2s ease-in-out infinite',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  dialog: {
    backgroundColor: '#ffffff',
    border: '2px solid #000000',
    padding: '30px',
    minWidth: '300px',
    textAlign: 'center' as const,
  },
  dialogText: {
    margin: '0 0 20px 0',
    fontSize: '16px',
    color: '#000000',
  },
  dialogButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  buttonCancel: {
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '1px solid #000000',
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonConfirm: {
    padding: '10px 20px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: '1px solid #000000',
    cursor: 'pointer',
    fontSize: '14px',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: '#525659',
  },
};
