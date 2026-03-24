'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createPaperLocal } from '@/actions/papers'
import { toast } from 'react-hot-toast'
import { years, alsubjects, olsubjects } from '@/data/data'
import { isAdmin } from '@/actions/auth'

const CreatePaperPage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paperFile, setPaperFile] = useState(null)
  const [markingSchemeFile, setMarkingSchemeFile] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm()

  // Watch exam type and stream to show/hide fields
  const examType = watch('examType')
  const stream = watch('stream')

  // Reset form when exam type changes
  React.useEffect(() => {
    if (examType) {
      reset({
        examType,
        stream: '',
        subject: '',
        year: '',
        medium: '',
        paperNumber: '',
      })
    }
  }, [examType, reset])

  // Get available streams for AL
  const getAvailableStreams = () => {
    if (examType === 'AL') {
      return alsubjects.map(subject => Object.keys(subject)[0])
    }
    return []
  }

  // Get available subjects based on exam type and stream
  const getAvailableSubjects = () => {
    if (examType === 'AL' && stream) {
      const streamSubjects = alsubjects.find(subject => 
        Object.keys(subject)[0] === stream
      )
      return streamSubjects ? streamSubjects[stream] : []
    } else if (examType === 'OL') {
      return olsubjects
    } else if (examType === 'Scholarship') {
      return ['Mathematics', 'English', 'Sinhala', 'Tamil']
    }
    return []
  }

  const onSubmit = async (data) => {
    try {
      if (!isAdmin()) {
        toast.error('You do not have permission to create papers')
        return
      }

      setIsSubmitting(true)
      const loadingToast = toast.loading('Creating paper...')

      const formData = {
        ...data,
        paper: paperFile,
        markingScheme: markingSchemeFile,
      }

      await createPaperLocal(formData)
      
      toast.dismiss(loadingToast)
      toast.success('Paper created successfully!')
      router.push('/admin/papers')
    } catch (error) {
      toast.error(error.message || 'Failed to create paper')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      if (type === 'paper') {
        setPaperFile(file)
      } else {
        setMarkingSchemeFile(file)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Paper</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Exam Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Exam Type</label>
              <select
                {...register('examType', { required: 'Exam type is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Exam Type</option>
                <option value="AL">Advanced Level (A/L)</option>
                <option value="OL">Ordinary Level (O/L)</option>
                <option value="Scholarship">Scholarship</option>
              </select>
              {errors.examType && (
                <p className="mt-1 text-sm text-red-600">{errors.examType.message}</p>
              )}
            </div>

            {/* Stream (only for A/L) */}
            {examType === 'AL' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Stream</label>
                <select
                  {...register('stream', { required: 'Stream is required for A/L' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Stream</option>
                  {getAvailableStreams().map((stream) => (
                    <option key={stream} value={stream}>
                      {stream}
                    </option>
                  ))}
                </select>
                {errors.stream && (
                  <p className="mt-1 text-sm text-red-600">{errors.stream.message}</p>
                )}
              </div>
            )}

            {/* Subject (not for Scholarship) */}
            {examType !== 'Scholarship' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  {...register('subject', { required: 'Subject is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={examType === 'AL' && !stream}
                >
                  <option value="">Select Subject</option>
                  {getAvailableSubjects().map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>
            )}

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <select
                {...register('year', { required: 'Year is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year.year} value={year.year}>
                    {year.year}
                  </option>
                ))}
              </select>
              {errors.year && (
                <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
              )}
            </div>

            {/* Medium */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Medium</label>
              <select
                {...register('medium', { required: 'Medium is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Medium</option>
                <option value="Sinhala">Sinhala</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
              </select>
              {errors.medium && (
                <p className="mt-1 text-sm text-red-600">{errors.medium.message}</p>
              )}
            </div>

            {/* Paper Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Paper Number</label>
              <input
                type="number"
                {...register('paperNumber', { 
                  required: 'Paper number is required',
                  min: { value: 1, message: 'Paper number must be at least 1' }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.paperNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.paperNumber.message}</p>
              )}
            </div>

            {/* Paper File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Paper File</label>
              <input
                type="file"
                accept=".pdf,.PDF,.jpg,.JPG,.jpeg,.JPEG,.png,.PNG"
                onChange={(e) => handleFileChange(e, 'paper')}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
              {!paperFile && (
                <p className="mt-1 text-sm text-red-600">Paper file is required</p>
              )}
            </div>

            {/* Marking Scheme File Upload (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Marking Scheme File (Optional)</label>
              <input
                type="file"
                accept=".pdf,.PDF,.jpg,.JPG,.jpeg,.JPEG,.png,.PNG"
                onChange={(e) => handleFileChange(e, 'markingScheme')}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !paperFile}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Paper'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePaperPage