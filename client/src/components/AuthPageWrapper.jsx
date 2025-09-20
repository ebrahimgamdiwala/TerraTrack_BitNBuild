export default function AuthPageWrapper({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 md:py-8">
      {/* Responsive padding: more on mobile, less on desktop */}
      <div className="w-full max-w-md mx-auto relative z-20">
        {/* z-20 ensures auth forms appear above globe but below navbar */}
        {children}
      </div>
    </div>
  )
}