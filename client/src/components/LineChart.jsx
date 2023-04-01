import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import { useEffect, useState } from "react"
import { getLineData } from "../services/Services"

const LineChart = () => {
    const [chartData, setChartData] = useState([])
  const [trueVotes, setTrueVotes] = useState([])
  const [falseVotes, setFalseVotes] = useState([])

  useEffect(() => {
    const fetchTrueVotes = async () => {
      const response = await getLineData(true)
      // const sortedVotes = response.data.data.sort(
      //   (a, b) => new Date(a.casted_at) - new Date(b.casted_at)
      // )
      setTrueVotes(response.data.data)
    }

    const fetchFalseVotes = async () => {
      const response = await getLineData(false)
      // const sortedVotes = response.data.data.sort(
      //   (a, b) => new Date(a.casted_at) - new Date(b.casted_at)
      // )

      setFalseVotes(response.data.data)
    }

    fetchTrueVotes()
    fetchFalseVotes()
  }, [])

  useEffect(() => {
    if (trueVotes.length > 0 && falseVotes.length > 0) {
      const trueDates = trueVotes.map((vote) => vote.casted_at)
      const falseDates = falseVotes.map((vote) => vote.casted_at)
      const trueCounts = trueVotes.map((vote) => vote.count)
      const falseCounts = falseVotes.map((vote) => vote.count)
      const alldates = [...new Set([...trueDates, ...falseDates])]
      alldates.sort()
      const chartData = {
        labels: alldates,
        datasets: [
          {
            label: "True Votes",
            data: trueCounts,
            borderColor: "green",
            fill: false,
          },
          {
            label: "False Votes",
            data: falseCounts,
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
    <div style={{height : "350px"}}>
      <Line data={chartData}/>
    </div>
  )
}

export default LineChart
