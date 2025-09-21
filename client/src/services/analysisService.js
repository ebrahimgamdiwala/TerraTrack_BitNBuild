// Helper function to get display name for analysis type
function getAnalysisTypeName(type) {
    const types = {
        'ndvi': 'Vegetation Health (NDVI)',
        'ndwi': 'Water Bodies (NDWI)',
        'urban': 'Urban Expansion'
    };
    return types[type] || type;
}

// Enhanced simulation with more realistic patterns
export async function simulateEEAnalysis(lat, lng, startYear, endYear, analysisType, isArea = false) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const years = [];
    const values = [];
    const yearRange = parseInt(endYear) - parseInt(startYear) + 1;
    
    const latFactor = Math.abs(lat) / 90;
    let baseValue, metricName, trend, noiseLevel;
    
    switch(analysisType) {
        case 'ndvi':
            const tropicalFactor = Math.exp(-Math.pow((Math.abs(lat) - 15) / 30, 2));
            baseValue = 0.15 + 0.5 * tropicalFactor + 0.1 * (Math.random() - 0.5);
            metricName = 'NDVI';
            trend = 0.01 + 0.02 * Math.random();
            noiseLevel = 0.05;
            break;
        case 'ndwi':
            const polarFactor = Math.exp(-Math.pow((Math.abs(lat) - 70) / 20, 2));
            baseValue = 0.1 + 0.2 * polarFactor;
            metricName = 'NDWI';
            trend = -0.005 - 0.01 * Math.random();
            noiseLevel = 0.03;
            break;
        case 'urban':
            const urbanLatFactor = Math.exp(-Math.pow((Math.abs(lat) - 35) / 30, 2));
            baseValue = 0.1 + 0.4 * urbanLatFactor * (1 - Math.random() * 0.5);
            metricName = 'Urban Index';
            trend = 0.02 + 0.03 * Math.random();
            noiseLevel = 0.02;
            break;
        default:
            baseValue = 0.5;
            metricName = 'Index Value';
            trend = 0;
            noiseLevel = 0.1;
    }
    
    for (let i = 0; i < yearRange; i++) {
        const year = parseInt(startYear) + i;
        years.push(year.toString());
        let value = baseValue + trend * i + (Math.random() * 2 - 1) * noiseLevel;
        value = Math.max(-1, Math.min(1, value));
        values.push(parseFloat(value.toFixed(4)));
    }
    
    const locationName = `Point at (${lat.toFixed(4)}°, ${lng.toFixed(4)}°)`;
    
    return {
        location: locationName,
        analysisType: analysisType, // Keep it short for the switch case
        metricName,
        startYear,
        endYear,
        years,
        values,
    };
}

// Helper function to generate analysis description
// In analysisService.js - add these functions

export const getLocationInsights = async (lat, lng) => {
  // Simulate API call to get location insights
  return {
    description: `Location at ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`,
    elevation: `${(Math.random() * 3000).toFixed(0)}m above sea level`,
    climate: 'Temperate continental',
    landUse: 'Mixed vegetation with some agricultural areas',
    ecoregion: 'Temperate broadleaf forest',
    population: 'Moderately populated',
  };
};

export const getAnalysisDescription = (analysisType, values, startYear, endYear) => {
  const startValue = values[0];
  const endValue = values[values.length - 1];
  const change = ((endValue - startValue) / Math.abs(startValue)) * 100;
  
  let summary = '';
  let details = [];
  let recommendations = [];
  
  if (analysisType === 'ndvi') {
    // Vegetation analysis
    summary = `Vegetation ${change >= 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)}% between ${startYear} and ${endYear}.`;
    
    details = [
      `Normalized Difference Vegetation Index (NDVI) changed from ${startValue.toFixed(4)} to ${endValue.toFixed(4)}.`,
      change >= 0 ? 'This indicates improved vegetation health or expansion.' : 'This suggests vegetation stress or reduction in green cover.',
      'NDVI values typically range from -1 to 1, with higher values indicating healthier vegetation.'
    ];
    
    recommendations = [
      change < 0 ? 'Consider investigating causes of vegetation decline such as drought, pests, or land use changes.' : 'Maintain current land management practices that support vegetation growth.',
      'Monitor soil moisture levels to support healthy vegetation.',
      'Consider diversifying plant species to improve ecosystem resilience.'
    ];
  } 
  else if (analysisType === 'ndwi') {
    // Water analysis
    summary = `Water presence ${change >= 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)}% between ${startYear} and ${endYear}.`;
    
    details = [
      `Normalized Difference Water Index (NDWI) changed from ${startValue.toFixed(4)} to ${endValue.toFixed(4)}.`,
      change >= 0 ? 'This may indicate increased water body extent or soil moisture.' : 'This suggests reduced water availability in the area.',
      'NDWI values typically range from -1 to 1, with higher values indicating more water content.'
    ];
    
    recommendations = [
      change < 0 ? 'Investigate water management practices and potential causes of water loss.' : 'Continue current water conservation practices.',
      'Consider implementing water harvesting techniques if appropriate for the area.',
      'Monitor groundwater levels to complement surface water observations.'
    ];
  }
  else if (analysisType === 'urban') {
    // Urban expansion analysis
    summary = `Urban footprint ${change >= 0 ? 'expanded' : 'contracted'} by ${Math.abs(change).toFixed(1)}% between ${startYear} and ${endYear}.`;
    
    details = [
      `Urban index changed from ${startValue.toFixed(4)} to ${endValue.toFixed(4)}.`,
      change >= 0 ? 'This indicates urban development and expansion of built-up areas.' : 'This may indicate de-urbanization or changes in land classification.',
      'Urban expansion often correlates with population growth and economic development.'
    ];
    
    recommendations = [
      'Consider impacts on local ecosystems and biodiversity from urban expansion.',
      'Plan for sustainable urban development with green spaces.',
      'Monitor air and water quality changes associated with urban development.'
    ];
  }
  
  return {
    summary,
    details,
    recommendations: change < 5 ? [] : recommendations // Only show recommendations for significant changes
  };
};

