import { Hourglass, CheckCircle2, ArrowRight, RotateCw } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/Card'
import { JobCardProps } from '../@types'

export default function JobCard({ job, onView, onRefresh }: JobCardProps) {
  const isPending = job.status === 'pending'

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-l-4 border-l-transparent hover:border-l-indigo-500">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Job {job.id}</h2>
           
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${
            isPending ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
          }`}>
            {isPending ? (
              <><Hourglass className="w-4 h-4 mr-1 animate-pulse" /> Pending</>
            ) : (
              <><CheckCircle2 className="w-4 h-4 mr-1" /> Resolved</>
            )}
          </span>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div 
              className={`h-2.5 rounded-full ${isPending ? 'bg-amber-400' : 'bg-teal-500'}`}
              style={{ width: isPending ? '50%' : '100%' }}
            ></div>
          </div>
          <p className="text-right text-xs text-gray-500">
            {isPending ? 'In Progress' : 'Completed'}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
        <button 
          onClick={onView} 
          
          className="text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 flex items-center transition-colors duration-300"
        >
          View Details <ArrowRight className="w-4 h-4 ml-2" />
        </button>
        <button
          onClick={onRefresh} 
          
          className="text-gray-600 hover:bg-gray-100 flex items-center transition-colors duration-300"
        >
          <RotateCw className="w-4 h-4 mr-2" /> Refresh
        </button>
      </CardFooter>
    </Card>
  )
}