'use client'

import { useState, useEffect } from 'react'
import JobCard from '@/src/components/JobCard'
import JobModal from '@/src/components/JobModal'
import { createJob, getJobs, getJob } from '@/src/lib/api'
import { PlusCircle, RefreshCw } from 'lucide-react'
import { Job } from '@/src/@types'



export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const fetchJobs = async () => {
    try {
      const fetchedJobs = await getJobs()
      if (JSON.stringify(jobs) !== JSON.stringify(fetchedJobs)) {
        setJobs(fetchedJobs)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateJob = async () => {
    try {
      await createJob()
      fetchJobs()
    } catch (error) {
      console.error("Error creating job:", error)
    }
  }

  const handleRefreshJob = async (jobId: string) => {
    try {
      const updatedJob = await getJob(jobId)
      const currentJob = jobs.find(job => job.id === jobId)
      if (JSON.stringify(currentJob) !== JSON.stringify(updatedJob)) {
        setJobs(jobs.map(job => job.id === jobId ? updatedJob : job))
        if (selectedJob?.id === jobId) {
          setSelectedJob(updatedJob)
        }
      }
    } catch (error) {
      console.error("Error refreshing job:", error)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchJobs()
    const interval = setInterval(() => {
      fetchJobs()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Job Management System</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center mb-8 space-x-4">
            <button 
              onClick={handleCreateJob} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" /> Create New Job
            </button>
            <button 
              onClick={fetchJobs} 
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-300 ease-in-out flex items-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" /> Refresh All Jobs
            </button>
          </div>
          {jobs.length === 0 ? (
            <div className="text-center bg-gray-100 rounded-lg p-8">
              <p className="text-gray-600 text-lg mb-4">No jobs available.</p>
              <p className="text-gray-500">Create a new job to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onView={() => setSelectedJob(job)}
                  onRefresh={() => handleRefreshJob(job.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onRefresh={() => handleRefreshJob(selectedJob.id)}
        />
      )}
    </div>
  )
}