import { usePdf } from '../context/PdfContext';
import UploadPanel from '../components/UploadPanel';
import ViewPanel from '../components/ViewPanel';

export default function Home() {
  const { pdfUrl } = usePdf();

  return pdfUrl ? <ViewPanel /> : <UploadPanel />;
}
