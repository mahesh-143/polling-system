import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import Vote from "./Vote"

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Vote />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
