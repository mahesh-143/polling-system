import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { getVotesData } from "../services/Services"

const VoteData = () => {
  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const { data } = await getVotesData(paginationModel)
      setData(data.vote)
      setTotalRows(data.totalCount)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [paginationModel])

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "voting_choice", headerName: "Vote", width: 130 },
    { field: "casted_at", headerName: "Date", width: 130 },
  ]

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <h2>All data</h2>
      <DataGrid
        columns={columns}
        rows={data}
        rowCount={totalRows}
        pagination
        pageSize={paginationModel.pageSize}
        pageSizeOptions={[10, 50, 100]}
        page={paginationModel.page + 1}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  )
}

export default VoteData
