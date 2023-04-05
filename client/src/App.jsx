import BarChart from "./components/BarChart"
import Navbar from "./components/Navbar"
import VoteData from "./components/VoteData"
import { Grid } from "@mui/material"
import LineChart from "./components/LineChart"
import { createContext,  useState } from "react"

export const DataContext = createContext(null)
const App = () => {

  const[refetch, setRefetch ] = useState(false)

  const handleRefetch = () => {
    setRefetch(prevRefetch => !prevRefetch) // toggle the value of refetch
  }

  return (
    <>
    <DataContext.Provider value={handleRefetch}>
        <Navbar />
        <Grid
          container
          spacing={1}
          columns={{ xs: 4, sm: 4, md: 8 }}
          sx={{ marginInline: "1em", marginTop: "1em" }}
        >
          <Grid item xs={8} sm={2} md={4}>
            <BarChart />
          </Grid>
          <Grid item xs={8} sm={2} md={4}>
            <LineChart />
          </Grid>
          <VoteData />
        </Grid>
        </DataContext.Provider>
    </>
  )
}

export default App
