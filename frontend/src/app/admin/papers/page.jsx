'use client';

import React, { useEffect, useState } from 'react';
import Table from '@/components/table';
import PaperFilters from '@/components/papers/PaperFilters';
import PapersTable from '@/components/papers/PapersTable';
import Pagination from '@/components/pagination';
import { getAllPapers } from '@/actions/papers';
import { toast } from 'react-hot-toast';

const PapersPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // Get columns based on exam type
  const getColumns = (examType) => {
    switch (examType) {
      case 'al':
        return ['Exam Type', 'Stream', 'Subject', 'Year', 'Medium', 'Downloads'];
      case 'ol':
        return ['Exam Type', 'Subject', 'Year', 'Medium', 'Downloads'];
      case 'scholarship':
        return ['Exam Type', 'Year', 'Medium', 'Downloads'];
      default:
        return ['Exam Type', 'Stream', 'Subject', 'Year', 'Medium', 'Downloads'];
    }
  };

  // Format paper data based on exam type
  const formatPaperData = (paper) => {
    // Base data structure with all possible fields
    const baseData = {
      examType: paper.examType,
      stream: 'N/A',
      subject: 'N/A',
      year: paper.year,
      medium: paper.medium,
      downloadCount: paper.downloadCount,
      _id: paper._id
    };

    switch (paper.examType) {
      case 'al':
        return {
          ...baseData,
          stream: paper.stream || 'N/A',
          subject: paper.subject || 'N/A'
        };
      case 'ol':
        return {
          ...baseData,
          subject: paper.subject || 'N/A'
        };
      case 'scholarship':
        return baseData;
      default:
        return baseData;
    }
  };

  const fetchPapers = async (page = 1) => {
    try {
      setLoading(true);
      // Add pagination params to filters
      const response = await getAllPapers({
        ...filters,
        page,
        limit: pagination.itemsPerPage
      });
      
      const { data, pagination: paginationData } = response.data;
      const formattedPapers = data.map(paper => formatPaperData(paper));
      
      setPapers(formattedPapers);
      setPagination(prev => ({
        ...prev,
        currentPage: page,
        totalPages: paginationData.pages,
        totalItems: paginationData.total
      }));
    } catch (error) {
      toast.error('Failed to fetch papers');
      console.error('Error fetching papers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers(pagination.currentPage);
  }, [filters, pagination.currentPage]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  // Calculate showing range
  const showingFrom = ((pagination.currentPage - 1) * pagination.itemsPerPage) + 1;
  const showingTo = Math.min(showingFrom + pagination.itemsPerPage - 1, pagination.totalItems);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // Get columns based on the selected filter exam type or default to all columns
  const columns = getColumns(filters.examType || 'al');

  // Transform the papers data to exclude _id from display but keep it for the edit link
  const tableData = papers.map(({ _id, ...displayData }) => ({
    ...displayData,
    id: _id // Keep id for the edit link but separate from displayed data
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Past Papers</h1>
      
      <PaperFilters onFilter={handleFilter} />
      
      <div className="mt-8">
        <PapersTable papers={papers} loading={loading} />
        
        {!loading && papers.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            showingFrom={showingFrom}
            showingTo={showingTo}
            totalItems={pagination.totalItems}
          />
        )}
      </div>
    </div>
  );
};

export default PapersPage;