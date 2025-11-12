/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface PdfContextType {
  pdfUrl: string;
  fileName: string;
  setPdfData: (url: string, name: string) => void;
  clearPdfData: () => void;
}

const PdfContext = createContext<PdfContextType | undefined>(undefined);

const DB_NAME = 'pdf-viewer-db';
const STORE_NAME = 'pdfs';
const PDF_KEY = 'current-pdf';

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Save PDF to IndexedDB (always replaces the single stored PDF)
const savePdfToDB = async (blob: Blob, fileName: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    // Use put with fixed key - automatically replaces existing data
    const request = store.put({ blob, fileName }, PDF_KEY);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Load PDF from IndexedDB
const loadPdfFromDB = async (): Promise<{ blob: Blob; fileName: string } | null> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(PDF_KEY);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        resolve(request.result || null);
      };
    });
  } catch (error) {
    console.error('Failed to load PDF from DB:', error);
    return null;
  }
};

// Delete PDF from IndexedDB
const deletePdfFromDB = async (): Promise<void> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(PDF_KEY);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to delete PDF from DB:', error);
  }
};

export function PdfProvider({ children }: { children: ReactNode }) {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  // Load from IndexedDB on mount
  useEffect(() => {
    loadPdfFromDB().then((data) => {
      if (data) {
        const url = URL.createObjectURL(data.blob);
        setPdfUrl(url);
        setFileName(data.fileName);
      }
    }).catch((error) => {
      console.error('Failed to restore PDF:', error);
    });
  }, []);

  const setPdfData = async (url: string, name: string) => {
    setPdfUrl(url);
    setFileName(name);

    // Save to IndexedDB (automatically replaces any existing PDF)
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      await savePdfToDB(blob, name);
    } catch (error) {
      console.error('Failed to save PDF:', error);
    }
  };

  const clearPdfData = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPdfUrl('');
    setFileName('');
    deletePdfFromDB();
  };

  return (
    <PdfContext.Provider value={{ pdfUrl, fileName, setPdfData, clearPdfData }}>
      {children}
    </PdfContext.Provider>
  );
}

export function usePdf() {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error('usePdf must be used within PdfProvider');
  }
  return context;
}
