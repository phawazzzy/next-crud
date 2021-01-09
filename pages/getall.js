import axios from "axios"
import { useRouter } from "next/router";
import Link from "next/link";



export async function getStaticProps() {
    const allBooks = await axios.get(`http://localhost:8080/books`)
    // console.log(allBooks.data)
    return {
        props: {
            allBooks: allBooks.data
        }
    }
}

export default function Getall({ allBooks }) {

    console.log(allBooks)
    const router = useRouter();

    const deleteBook = (id) => {
        axios.delete(`http://localhost:8080/books/${id}`).then((res) => {
            console.log(res)
            if (res.data.data === true) {
                router.push("/getall")
            }
        })
    }

    const getOneBook = (id) => {
        router.push(`/${id}`)
    }

    return (
        <>

            <section>
                <h1 class="text-3xl text-gray-900"> List of All Books</h1>
                <h2>
                    <Link href="/create">
                        <button class="bg-red hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"> upload a book</button>
                    </Link>
                </h2>
            </section>
        <div class="grid grid-cols-3 gap-4"> 

            {
                allBooks.data.length == 0 ? <p class="text-pink-900">opps!! no record found</p> : allBooks.data.map((doc) => (
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                        <div key={doc.id}>
                            <p class="font-bold">
                                Book Title:  <span> {doc.title} </span>
                            </p>
                            <p class="font-bold">
                                Author of book: <span> {doc.author} </span>
                            </p>
                            <p class="font-bold">
                                date Posted  <span> {doc.datetime} </span>
                            </p>
                            <p class="font-bold">
                                date updated  <span> {doc.updatedtime === '0001-01-01T00:00:00Z' ? <span> Never been updated</span> : doc.updatedtime} </span>
                            </p>
                            <button class="bg-red hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full" onClick={() => deleteBook(doc.id)}> Delete</button>
                            <span> </span>
                            <button class="bg-red hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full" onClick={() => getOneBook(doc.id)}> View Details</button>
                        </div>
                    </div>
                ))
            }
        </div>



        </>
    )
}
