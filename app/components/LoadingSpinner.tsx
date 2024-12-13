export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-12 w-12 animate-spin rounded-full border-3 border-blue-500/20 border-t-blue-500 shadow-lg" />
    </div>
  );
}
