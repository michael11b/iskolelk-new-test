import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { deletePaper } from '@/actions/papers';
import { toast } from 'react-hot-toast';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal';

const columns = [
  { header: 'Exam Type', accessor: 'examType' },
  { header: 'Stream', accessor: 'stream' },
  { header: 'Subject', accessor: 'subject' },
  { header: 'Year', accessor: 'year' },
  { header: 'Medium', accessor: 'medium' },
  { header: 'Paper Downloads', accessor: 'paperDownloads' },
  { header: 'Marking Scheme Downloads', accessor: 'markingSchemeDownloads' },
  { header: 'Actions', accessor: 'actions' },
];

export default function PapersTable({ papers, loading, onPaperDeleted }) {
  const [deletingId, setDeletingId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPaperId, setSelectedPaperId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedPaperId(id);
    setDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setSelectedPaperId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this paper?')) {
      return;
    }

    try {
      setDeletingId(id);
      await deletePaper(id);
      toast.success('Paper deleted successfully');
      onPaperDeleted();
    } catch (error) {
      toast.error(error.message || 'Failed to delete paper');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No papers found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Papers List</h2>
        <Link
          href="/admin/papers/create-paper"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Paper
        </Link>
      </div>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {papers.map((paper) => (
            <tr key={paper._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paper.examType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paper.stream || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paper.subject || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paper.year}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paper.medium}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paper.paperDownloads}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paper.markingSchemeDownloads}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/papers/update-paper/${paper._id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(paper._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        paperId={selectedPaperId}
      />
    </div>
  );
} 