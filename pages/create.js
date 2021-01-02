import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Create() {
    const [title, SetTitle] = useState("")
    const [author, Setauthor] = useState("")

    const router = useRouter();

    const handleTitle = (e) => {
        SetTitle(e.target.value)
    }

    const handleauthor = (e) => {
        Setauthor(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            title: e.target[0].value,
            author: e.target[1].value
        }
        console.log(data)
        axios.post(`http://localhost:8080/books`, data)
            .then((res) => {
                router.push("/getall")

                console.log("success", res)
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <h1> upload a book </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlfor="title"> Title</label>
                    <input type="text" value={title} onChange={handleTitle} name="title" placeholder="Title of author here" />
                </div>
                <br />
                <div>
                    <label htmlfor="author"> author </label>
                    <input type="text" value={author} onChange={handleauthor} name="author" placeholder="author of author here" />
                </div>

                <button type="submit"> Submit form</button>

            </form>

            <h2>
                <Link href="/getall">
                    <a> View all Books</a>
                </Link>
            </h2>
        </>

    )
}