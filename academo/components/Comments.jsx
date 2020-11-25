import { useEffect, useState } from "react"

const [comment, setComment] = useState("")
const [userComments, setUserComments] = useState([])

useEffect(() => {
    fetch("./api/comments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((r) => r.json())
        .then((data) => {
            setUserComments(data)
        })
}, [])

function handleSubmit(e) {
    e.preventDefault()
    fetch("./api/createComments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment,
        }),
    })
        .then((r) => r.json())
        .then((submit) => {
            console.log(submit)
        })
}
