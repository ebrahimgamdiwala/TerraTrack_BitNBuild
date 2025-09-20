import { Outlet } from 'react-router-dom'
import VanillaGlobeScene from '../components/VanillaGlobeScene'
import Navbar from '../components/Navbar'

export default function AppLayout() {
  return (
    <div className="relative min-h-screen">
      {/* Globe background - persistent across all routes */}
      <VanillaGlobeScene />
      
      {/* Navbar - persistent across all routes */}
      <Navbar />
      
      {/* Page content with smooth transitions */}
      <div className="relative">
        <div className="transition-opacity duration-300 ease-in-out">
          <Outlet />
        </div>
      </div>
    </div>
  )
}