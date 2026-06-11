export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-12 h-12 border-4 border-lumi-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 font-medium animate-pulse">Učitavanje...</p>
    </div>
  )
}
