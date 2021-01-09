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


    // const updateSubmit = (e) => {
    //     e.preventDefault()
    //     let data = e.
    // }

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
            <h1 class=""> upload a book </h1>
            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlfor="title"> Title</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={title} onChange={handleTitle} name="title" placeholder="Title of author here" />
                    </div>
                    <br />
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlfor="author"> author </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={author} onChange={handleauthor} name="author" placeholder="author of author here" />
                    </div>

                    {/* <button type="submit"> Submit form</button> */}
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit form
      </button>
                    </div>

                </form>
            </div>

            <h2>
                <Link href="/getall">
                    <button class="bg-red hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"> View all Books</button>

                </Link>
            </h2>


        </>

    )
}