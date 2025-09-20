export default function AlertsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 
                        hover:bg-white/15 transition-all duration-300 ease-out">
          <h1 className="text-4xl font-bold text-white mb-4">Alerts</h1>
          <p className="text-white/70 mb-6">Monitor environmental alerts and notifications</p>
          <div className="text-green-300">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 17h5l-5 5v-5zM9.663 17H4l5-5v5zM7.5 12L12 7.5 16.5 12M12 18.5L7.5 14l4.5 4.5L16.5 14 12 18.5z" />
            </svg>
            <p className="text-white/60">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}