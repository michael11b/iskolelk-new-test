'use client';

import { getAccessibleFileUrl } from '@/utils/fileUrlHandler';
import { toast } from 'react-hot-toast';

export default function InteractiveScholarshipViewer({ paper, year }) {
  const openPdfInNewTab = (url) => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Viewing PDF</title>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; }
            iframe { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          <iframe src="${url}#toolbar=0" title="PDF Viewer"></iframe>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const downloadFile = async (url, filename) => {
    try {
      // For S3 URLs, we'll use a direct link approach
      if (url.startsWith('http')) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.target = '_blank'; // Open in new tab for S3 URLs
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // For local files, use the fetch approach
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={() => openPdfInNewTab(getAccessibleFileUrl(paper.fileUrl))}
          disabled={!paper.fileUrl}
          className={`px-4 py-2 rounded-md transition-colors text-center ${
            paper.fileUrl 
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          title={paper.fileUrl ? 'View Paper' : 'File will be available soon'}
        >
          View Paper
        </button>
        <button
          onClick={() => downloadFile(
            getAccessibleFileUrl(paper.fileUrl),
            `Grade_5_Scholarship_${year}_${paper.medium}_Paper.pdf`
          )}
          disabled={!paper.fileUrl}
          className={`px-4 py-2 rounded-md transition-colors text-center ${
            paper.fileUrl 
              ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          title={paper.fileUrl ? 'Download Paper' : 'File will be available soon'}
        >
          Download Paper
        </button>
      </div>
      {paper.markingScheme && (
        <div className="flex gap-2">
          <button
            onClick={() => openPdfInNewTab(getAccessibleFileUrl(paper.markingScheme.fileUrl))}
            disabled={!paper.markingScheme.fileUrl}
            className={`px-4 py-2 rounded-md transition-colors text-center ${
              paper.markingScheme.fileUrl 
                ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
            title={paper.markingScheme.fileUrl ? 'View Marking Scheme' : 'Marking scheme will be available soon'}
          >
            View Marking Scheme
          </button>
          <button
            onClick={() => downloadFile(
              getAccessibleFileUrl(paper.markingScheme.fileUrl),
              `Grade_5_Scholarship_${year}_${paper.medium}_Marking_Scheme.pdf`
            )}
            disabled={!paper.markingScheme.fileUrl}
            className={`px-4 py-2 rounded-md transition-colors text-center ${
              paper.markingScheme.fileUrl 
                ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
            title={paper.markingScheme.fileUrl ? 'Download Marking Scheme' : 'Marking scheme will be available soon'}
          >
            Download Marking Scheme
          </button>
        </div>
      )}
    </div>
  );
}
