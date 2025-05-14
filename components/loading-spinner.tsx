"use client"

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="ai-processing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
