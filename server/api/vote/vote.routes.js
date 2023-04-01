import { Router } from "express"
import db from "../../utils/db.js"

const router = Router()

// make vote
router.post("/createvote", async (req, res, next) => {
  try {
    let { name, voting_choice, casted_at } = req.body

    const date = new Date(casted_at)
    
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    casted_at = year + "-" + month + "-" + day + 'T00:00:00.000Z'

    voting_choice = voting_choice === "true" ? true : false 
    const newVote = await db.vote.create({
      data: {
        name,
        voting_choice,
        casted_at,
      },
    })
    return res.status(200).json({ message: "Vote created", newVote })
  } catch (err) {
    next(err)
  }
})

//display all votes data
router.get("/data", async (req, res, next) => {
  try {
    const vote = await db.vote.findMany()
    return res.status(200).json({ vote })
  } catch (err) {
    next(err)
  }
})

// counting votes for line chart
router.get("/count", async (req, res, next) => {
  try {
    const voting_choice = req.query.voting_choice === "true" ? true : false
    
    const result = await db.vote.groupBy({
      by: ["casted_at"],
      where: {
        voting_choice,
      },
      _count: { voting_choice: true },
    })
    const data = result.map((row) => ({
      count: row._count.voting_choice,
      casted_at: row.casted_at.toISOString().substring(0, 10),
    }))
    return res.status(200).json({ data })
  } catch (err) {
    next(err)
  }
})

// counting votes for bar charts
router.get("/results", async (req, res, next) => {
  try {
    const result = await db.vote.groupBy({
      by: ["voting_choice"],
      _count: { voting_choice: true },
    })

    const data = result.map((row) => ({
      count: row._count.voting_choice,
      voting_choice: row.voting_choice,
    }))
    return res.status(200).json({ data })
  } catch (err) {
    next(err)
  }
})

export default router
