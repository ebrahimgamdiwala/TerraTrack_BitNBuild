# Environmental Changes Viewer

This web application allows you to visualize environmental changes over time using satellite imagery. You can click anywhere on the map or draw an area to analyze various environmental metrics like vegetation health, water bodies, and urban expansion.

## Features

- Interactive map interface with point-and-click analysis
- Multiple analysis types:
  - Vegetation Health (NDVI)
  - Water Bodies (NDWI)
  - Urban Expansion
- Time series visualization of environmental changes
- Customizable date range (2018-2023)
- Area selection for regional analysis
- Responsive design that works on desktop and mobile devices

## How to Use

1. **Open the Application**
   - Open `index.html` in a modern web browser (Chrome, Firefox, Edge, or Safari)

2. **Select Analysis Parameters**
   - Choose a start and end year for your analysis
   - Select the type of analysis (Vegetation, Water Bodies, or Urban Expansion)

3. **Analyze a Location**
   - **Point Analysis**: Simply click anywhere on the map to analyze that specific point
   - **Area Analysis**: Use the drawing tools in the top-right corner to draw a shape around the area you want to analyze
   - Click the "Analyze Area" button after drawing a shape

4. **View Results**
   - The application will display a time series chart showing changes over time
   - A summary of the analysis will be shown below the chart

## Technical Details

This application uses:
- [Leaflet.js](https://leafletjs.com/) for interactive maps
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw) for drawing tools
- Simulated data (in a production environment, this would connect to Google Earth Engine)

## Future Enhancements

- Integration with Google Earth Engine API for real satellite data
- Additional environmental metrics and indices
- Export functionality for analysis results
- Higher resolution imagery
- Historical imagery comparison slider

## Browser Compatibility

This application works best in modern browsers including:
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)
- Safari (latest version)

## License

This project is open source and available under the MIT License.
