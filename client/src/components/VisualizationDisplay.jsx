import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const VisualizationDisplay = ({ data }) => {
  if (!data || !data.type) return null

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: data.title || 'Climate Data Visualization',
        color: '#10b981',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#10b981',
        bodyColor: '#ffffff',
        borderColor: '#10b981',
        borderWidth: 1
      }
    },
    scales: data.type !== 'doughnut' ? {
      x: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(16, 185, 129, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(16, 185, 129, 0.1)'
        }
      }
    } : {}
  }

  const renderChart = () => {
    switch (data.type) {
      case 'line':
        return <Line data={data.chartData} options={chartOptions} />
      case 'bar':
        return <Bar data={data.chartData} options={chartOptions} />
      case 'doughnut':
        return <Doughnut data={data.chartData} options={chartOptions} />
      case 'scatter':
        return <Scatter data={data.chartData} options={chartOptions} />
      default:
        return <div className="text-gray-400 text-center py-8">Unsupported chart type: {data.type}</div>
    }
  }

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl border border-green-500/20 p-6 shadow-lg">
      <div className="h-80 mb-4">
        {renderChart()}
      </div>
      
      {/* Chart Description */}
      {data.description && (
        <div className="text-sm text-gray-300 bg-slate-900/50 rounded-lg p-3 border border-slate-600">
          <h4 className="text-green-300 font-medium mb-2">Analysis:</h4>
          <p>{data.description}</p>
        </div>
      )}

      {/* Key Insights */}
      {data.insights && data.insights.length > 0 && (
        <div className="mt-4 text-sm">
          <h4 className="text-green-300 font-medium mb-2">Key Insights:</h4>
          <ul className="space-y-1 text-gray-300">
            {data.insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Data Summary */}
      {data.summary && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(data.summary).map(([key, value]) => (
            <div key={key} className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-600">
              <div className="text-green-300 text-xs uppercase tracking-wide mb-1">{key}</div>
              <div className="text-white font-semibold">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VisualizationDisplay