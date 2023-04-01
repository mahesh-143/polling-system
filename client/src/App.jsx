import BarChart from "./components/BarChart"
import Navbar from "./components/Navbar"
import VoteData from "./components/VoteData"
import { Grid } from "@mui/material"
import LineChart from "./components/LineChart"

const App = () => {
  return (
    <>
      <Navbar />
      <Grid container spacing={1} columns={{ xs: 4, sm: 4, md: 8 }} sx={{marginInline: "1em", marginTop: "1em"}}>
        <Grid item xs={8} sm={2} md={4}>
          <BarChart />
        </Grid>
        <Grid item xs={8} sm={2} md={4}>
          <LineChart />
        </Grid>
        <VoteData />
      </Grid>
    </>
  )
}

export default App
