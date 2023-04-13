import { Line } from "react-chartjs-2"
import { Chart as ChartJS, scales } from "chart.js/auto"
import { useEffect, useState, useContext } from "react"
import { getLineData } from "../services/Services"
import { DataContext } from "../App"

const LineChart = () => {
  const [chartData, setChartData] = useState([])
  const [trueVotes, setTrueVotes] = useState([])
  const [falseVotes, setFalseVotes] = useState([])
  const handleRefetch = useContext(DataContext)

  useEffect(() => {
    const fetchTrueVotes = async () => {
      const response = await getLineData(true)
      const sortedVotes = response.data.data.sort(
        (a, b) => new Date(a.casted_at) - new Date(b.casted_at)
      )
      setTrueVotes(sortedVotes)
    }

    const fetchFalseVotes = async () => {
      const response = await getLineData(false)
      const sortedVotes = response.data.data.sort(
        (a, b) => new Date(a.casted_at) - new Date(b.casted_at)
      )

      setFalseVotes(sortedVotes)
    }

    fetchTrueVotes()
    fetchFalseVotes()
  }, [handleRefetch])

  useEffect(() => {
    if (trueVotes.length > 0 && falseVotes.length > 0) {
      const combinedDates = [...trueVotes, ...falseVotes]
        .map((vote) => vote.casted_at)
        .sort((a, b) => new Date(a) - new Date(b))

      // Count the votes for each date for the true and false votes
      const trueCounts = {}
      const falseCounts = {}
      for (let i = 0; i < combinedDates.length; i++) {
        const date = combinedDates[i]
        trueCounts[date] = 0
        falseCounts[date] = 0
      }
      for (let i = 0; i < trueVotes.length; i++) {
        const vote = trueVotes[i]
        trueCounts[vote.casted_at] = vote.count
      }
      for (let i = 0; i < falseVotes.length; i++) {
        const vote = falseVotes[i]
        falseCounts[vote.casted_at] = vote.count
      }

      const chartData = {
        labels: combinedDates,
        datasets: [
          {
            label: "True Votes",
            data: combinedDates.map((date) => trueCounts[date]),
            borderColor: "green",
            fill: false,
          },
          {
            label: "False Votes",
            data: combinedDates.map((date) => falseCounts[date]),
            borderColor: "red",
            fill: false,
          },
        ],
      }
      setChartData(chartData)
    }
  }, [trueVotes, falseVotes])

  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return <div>Loading...</div>
  }
  return (
    <div style={{ height: "350px" }}>
      <Line data={chartData} />
    </div>
  )
}

export default LineChart
