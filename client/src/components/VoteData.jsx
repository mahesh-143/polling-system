import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { getVotesData } from "../services/Services"

const VoteData = () => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const result = await getVotesData()
    setData(result.data.vote)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "voting_choice", headerName: "Vote", width: 130 },
    { field: "casted_at", headerName: "Date", width: 130 },
  ]

  return (
    <div style={{ height: "400px", width: "100%"}}>
      <h2>All data</h2>
      <DataGrid
        columns={columns}
        rows={data}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  )
}

export default VoteData
