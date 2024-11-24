export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-[1000]">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
}
