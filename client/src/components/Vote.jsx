import { useState } from "react"
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Stack,
} from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { postVotesData } from "../services/Services"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const validationSchema = yup.object({
  name: yup.string("Enter name of the voter").required("Name is required"),
  voting_choice: yup
    .string("Choose True or False")
    .required("Voting is required"),
})

const Vote = () => {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      voting_choice: "",
      casted_at: Date.now(),
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        setIsSubmitting(true)
        const response = await postVotesData(values)
        console.log(response.data)
        setAlertSeverity("success");
        setAlertMessage(response.data.message);
        formik.resetForm();
        setOpen(false)
      } catch (err) {
        console.log(err)
        setAlertSeverity("error");
        setAlertMessage("Failed to submit vote." + err);
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="success">Cast Vote</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                id="name"
                name="name"
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  id="casted_at"
                  name="casted_at"
                  label="Date"
                  value={formik.values.casted_at}
                  format="yyyy-MM-dd"
                  onChange={(value) =>
                    formik.setFieldValue("casted_at", Date.parse(value))
                  }
                />
              </LocalizationProvider>
              <FormControl>
                <FormLabel id="vote-radio-buttons-group-label">Vote</FormLabel>
                <RadioGroup
                  aria-labelledby="vote-radio-buttons-group-label"
                  defaultValue="false"
                  name="voting_choice"
                  value={formik.values.voting_choice}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="True"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="False"
                  />
                </RadioGroup>
              </FormControl>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
          <AlertTitle>{alertSeverity === "success" ? "Success" : "Error"}</AlertTitle>
          {alertMessage}
        </Alert>
      )}
    </div>
  )
}

export default Vote
