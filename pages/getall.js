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
                alert("book deleted")
            }
        })
    }

    return (
        <>

            <section>
                <h1> List of All Books</h1>
                <h2>
                <Link href="/create">
                    <a> upload a book </a>
                </Link>
            </h2>
            </section>
            <ol>

                {
                    allBooks.data.length  == 0 ? <p>opps!! no record found</p> : allBooks.data.map((doc) => (
                        <li key={doc.id}>
                            Book title: {doc.title}
                            <br />
                           Author of book:  {doc.author}
                            <br />
                           date Posted: {doc.datetime}
                            <button onClick={() => deleteBook(doc.id)}> Delete</button>
                        </li>
    
    
                    ))
                }
            </ol>
           
        </>
    )
}

