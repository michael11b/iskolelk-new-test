import React from 'react';
import { useForm } from 'react-hook-form';
import { olFilters, alFilters } from '@/data/dataNew';

const PaperFilters = ({ onFilter }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      examType: 'AL'
    }
  });

  const examType = watch('examType');
  const stream = watch('stream');

  // Get available streams for AL
  const getAvailableStreams = () => {
    if (examType === 'AL') {
      const streams = new Set()
      alFilters.streams.forEach(stream => {
        if (stream.stream) {
          streams.add(stream.stream)
        }
      })
      return Array.from(streams).sort()
    }
    return []
  };

  // Get available subjects based on exam type and stream
  const getAvailableSubjects = () => {
    if (examType === 'AL' && stream) {
      const subjects = []
      alFilters.streams.forEach(streamData => {
        if (streamData.stream === stream && streamData.subject) {
          subjects.push(streamData.subject)
        }
      })
      return subjects.sort()
    } else if (examType === 'OL') {
      const subjects = []
      olFilters.streams.forEach(stream => {
        if (stream.subject) {
          subjects.add(stream.subject)
        }
      })
      return Array.from(subjects).sort()
    }
    return []
  };

  const onSubmit = (data) => {
    // Remove empty values and undefined fields
    const filters = Object.entries(data).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    onFilter(filters);
  };

  const handleReset = () => {
    reset({
      examType: 'AL',
      stream: '',
      subject: '',
      medium: '',
      year: ''
    });
    onFilter({});
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Exam Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Type
            </label>
            <select
              {...register('examType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="AL">Advanced Level (A/L)</option>
              <option value="OL">Ordinary Level (O/L)</option>
              <option value="Scholarship">Scholarship</option>
            </select>
          </div>

          {/* Stream (only for AL) */}
          {examType === 'AL' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stream
              </label>
              <select
                {...register('stream')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All Streams</option>
                {getAvailableStreams().map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              {...register('subject')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={examType === 'AL' && !stream}
            >
              <option value="">All Subjects</option>
              {getAvailableSubjects().map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              {...register('year')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Years</option>
              {/* Generate years dynamically */}
              {(() => {
                const allYears = new Set()
                olFilters.streams.forEach(stream => {
                  if (stream.years && Array.isArray(stream.years)) {
                    stream.years.forEach(year => allYears.add(year))
                  }
                })
                alFilters.streams.forEach(stream => {
                  if (stream.years && Array.isArray(stream.years)) {
                    stream.years.forEach(year => allYears.add(year))
                  }
                })
                return Array.from(allYears).sort((a, b) => b - a).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))
              })()}
            </select>
          </div>

          {/* Medium */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medium
            </label>
            <select
              {...register('medium')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Mediums</option>
              <option value="sinhala">Sinhala</option>
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
            </select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaperFilters; 