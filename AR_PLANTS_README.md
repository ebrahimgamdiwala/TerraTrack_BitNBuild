# AR Plants Feature

## Overview
The AR Plants feature allows users to place virtual 3D plant models in their real environment using WebXR augmented reality technology. Users can see the environmental benefits of each plant and visualize how greenery would look in their space.

## Features

### 🌱 Plant Models
- **Peace Lily**: NASA-approved air purifier, thrives in low light
- **Snake Plant**: Releases oxygen at night, extremely low maintenance  
- **Ficus Tree**: Removes 47.4 lbs CO2/year, filters air pollutants

### 🔍 AR Capabilities
- Real-time camera feed with AR overlay
- Surface detection and hit testing
- Interactive 3D plant placement
- Environmental benefits display
- Impact tracking (CO2 removal, oxygen production)

### 📱 Device Compatibility
- **AR Supported**: Modern Android/iOS devices with WebXR support
- **Fallback Mode**: 3D preview canvas for non-AR devices
- **Browser Requirements**: Chrome, Edge, or WebXR-compatible browsers

## Technical Implementation

### Dependencies
```json
{
  "three": "^0.x.x",
  "@react-three/fiber": "^8.x.x", 
  "@react-three/drei": "^9.x.x",
  "webxr-polyfill": "^0.x.x"
}
```

### Key Components
- `ARPlantsPage.jsx` - Main AR experience component
- `PlantModel` - Individual 3D plant renderer
- `FallbackPlant` - Simple geometry when models fail to load
- `ARController` - WebXR session and hit testing management

### 3D Models
- Models are loaded via GLTF format
- Fallback geometry created with Three.js primitives
- Automatic error handling and graceful degradation

## User Flow

1. **Plant Selection**: Choose from available plant models
2. **AR Activation**: Start WebXR AR session (if supported)
3. **Surface Detection**: Point camera to detect flat surfaces
4. **Plant Placement**: Tap detected surfaces to place plants
5. **Benefits Display**: Tap placed plants to see environmental impact
6. **Impact Tracking**: View cumulative environmental benefits

## Environmental Benefits Data

Each plant includes scientifically-backed environmental benefits:
- CO2 absorption rates (lbs/year)
- Oxygen production capacity
- Air pollutant filtering
- Humidity regulation
- Psychological benefits

## Browser Support

| Browser | WebXR AR | Fallback 3D |
|---------|----------|-------------|
| Chrome (Android) | ✅ | ✅ |  
| Samsung Internet | ✅ | ✅ |
| Edge (Android) | ✅ | ✅ |
| Safari (iOS) | ❌* | ✅ |
| Firefox | ❌ | ✅ |

*Safari requires WebXR Viewer app

## Future Enhancements

- [ ] More plant varieties and models
- [ ] Seasonal growth animations  
- [ ] Plant care reminders
- [ ] Social sharing of AR gardens
- [ ] Integration with real nursery catalogs
- [ ] Machine learning plant recognition
- [ ] Multiplayer AR gardening sessions

## Development Notes

### Model Loading
- GLTF models are loaded asynchronously
- Fallback geometry ensures app never breaks
- Models are scaled appropriately for AR space

### Performance
- Models are optimized for mobile AR
- Level-of-detail (LOD) could be added for better performance
- Texture compression recommended for production

### WebXR Security
- HTTPS required for WebXR features
- Camera permissions handled automatically
- Graceful fallback for unsupported devices