function Loading() {
  return (
    <div
      className="flex justify-center items-center h-screen loading-spinner"
      data-testid="loading-box"
    >
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
        data-testid="loading"
      />
    </div>
  );
}

export default Loading;