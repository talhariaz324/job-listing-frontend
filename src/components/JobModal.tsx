import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/Dialog"
import { Hourglass, CheckCircle2, RotateCw, X } from 'lucide-react'
import Image from 'next/image'
import { JobModalProps } from "../@types"



export default function JobModal({ job, onClose, onRefresh }: JobModalProps) {
  const isPending = job.status === 'pending'

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] relative">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader className="pt-2 pb-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Job Details
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center ${
              isPending ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
            }`}>
              {isPending ? (
                <><Hourglass className="w-4 h-4 mr-2 animate-pulse" /> Processing Job</>
              ) : (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Job Complete</>
              )}
            </span>
            <p className="text-sm text-gray-500 font-medium">Job ID: {job.id}</p>
          </div>

          {isPending && (
            <div className="text-center py-8">
              <div className="animate-spin mb-4">
                <RotateCw className="w-12 h-12 text-indigo-600 mx-auto" />
              </div>
              <p className="text-gray-600">Please wait while we process your request...</p>
            </div>
          )}

          {job.result && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-700">Result:</p>
              <div className="flex justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <RotateCw className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
                <Image
                  src={job.result}
                  alt="Job Result"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                  onLoadingComplete={(img) => {
                    img.parentElement?.querySelector('.absolute')?.remove();
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const newSrc = `${job.result}?t=${Date.now()}`;
                    img.src = newSrc;
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <button 
            onClick={onRefresh} 
            className="flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
          >
            <RotateCw className="w-4 h-4 mr-2" /> Refresh
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}