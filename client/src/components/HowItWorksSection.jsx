const steps = [
  {
    number: "1",
    title: "Track Your Activities",
    description: "Log your daily activities including transportation, energy usage, and consumption habits."
  },
  {
    number: "2", 
    title: "Get Analysis",
    description: "Receive detailed breakdown of your carbon footprint and environmental impact."
  },
  {
    number: "3",
    title: "Take Action", 
    description: "Follow personalized recommendations to reduce your carbon footprint."
  }
]

export default function HowItWorksSection() {
  return (
    <section className="min-h-screen py-16 px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 
                         hover:bg-white/10 hover:border-white/20 transform hover:-translate-y-2 
                         transition-all duration-300 shadow-xl text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white 
                              rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}