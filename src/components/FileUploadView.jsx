import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle, ExternalLink } from 'lucide-react';

export default function FileUploadView() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { fileName: 'Syllabus_2026_Advanced_Calculus.pdf', fileUrl: '/uploads/sample-syllabus.pdf', size: 2450000, fileType: 'application/pdf' },
    { fileName: 'Physics_Lab_Manual_v2.docx', fileUrl: '/uploads/sample-lab-manual.docx', size: 1800000, fileType: 'application/docx' },
  ]);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('Uploading file...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('File upload failed');

      const data = await res.json();
      setUploadedFiles([data, ...uploadedFiles]);
      setUploadStatus('File uploaded successfully!');
    } catch (err) {
      setUploadStatus(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="section-header">
          <h2 className="section-title">Upload Lesson Materials & Files</h2>
        </div>

        <label className="dropzone">
          <UploadCloud size={48} style={{ color: '#818cf8', marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>Click or drag files to upload</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            Supports PDF, DOCX, Images up to 50MB
          </p>
          <input type="file" style={{ display: 'none' }} onChange={handleFileSelect} disabled={uploading} />
        </label>

        {uploadStatus && (
          <div style={{ marginTop: '1rem', color: uploadStatus.startsWith('Error') ? '#f87171' : '#34d399', fontSize: '0.9rem', fontWeight: 600 }}>
            {uploadStatus}
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div className="section-header">
          <h2 className="section-title">Recent Storage Repository Files</h2>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((file, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <File size={18} style={{ color: '#818cf8' }} />
                  <span>{file.fileName}</span>
                </td>
                <td>{file.fileType || 'Document'}</td>
                <td>{(file.size / 1024 / 1024).toFixed(2)} MB</td>
                <td>
                  <a href={file.fileUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', textDecoration: 'none' }}>
                    <ExternalLink size={14} /> Open
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
