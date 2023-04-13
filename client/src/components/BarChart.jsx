import { useState, useEffect, useContext } from "react"
import { getBarData } from "../services/Services"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import { DataContext } from "../App"

const BarChart = () => {
  const [chartData, setChartData] = useState()
  const handleRefetch = useContext(DataContext)
  const fetchData = async () => {
    const result = await getBarData()
    const bar = result.data
    const chartData = {
      labels: bar.data.map((data) => data.voting_choice),
      datasets: [
        {
          label: "Bar chart",
          data: [bar.data[0].count, bar.data[1].count],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          barThickness: 100,
        },
      ],
    }
    setChartData(chartData)
  }
  useEffect(() => {
    fetchData()
  }, [handleRefetch])
  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ height: "350px" }}>
      <Bar data={chartData} options={{}} />
    </div>
  )
}

export default BarChart
