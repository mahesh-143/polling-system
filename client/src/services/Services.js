import client from "./AxiosClient"

//send data to server
export function postVotesData(data) {
    return client.post("/vote/createvote", data)
}

// get all data
export function getVotesData(paginationModel) {
    console.log(paginationModel)
  return client.get(`/vote/data?page=${(paginationModel.page + 1)}&limit=${paginationModel.pageSize}`)
}

//get data for bar chart
export function getBarData() {
    return client.get("vote/results")
}

//get data for line chart
export function getLineData(choice) {
    return client.get(`vote/count?voting_choice=${choice}`)
}