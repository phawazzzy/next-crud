import axios from "axios";
import { useRouter } from "next/router";


export async function getStaticPaths() {
    const res = await axios.get(`http://localhost:8080/books`)
    // consl res

    const books = res.data;
    // console.log(books)

    const paths = books.data.map((book) => {
        // console.log({book})
        return {
            params: { bookid: book.id.toString() }
        }
    })
    console.log(typeof paths[0].params.bookid)
    return { paths, fallback: false }
}
export async function getStaticProps({ params }) {
    const getOne = await axios.get(`http://localhost:8080/books/${params.bookid}`)
    // console.log(getOne.data)
    return {
        props: {
            oneData: getOne.data
        }
    }
}

export default function getOne({ oneData }) {
    const data = oneData.data
    const router = useRouter();

    const editBook = (id) => {
        let data = {
            // title: e.target[0].value,
            // author: e.target[1].value
        }
        console.log(data)
        axios.put(`http://localhost:8080/books/${id}`, data)
            .then((res) => {
                router.push(`/${id}`)


                console.log("success", res)
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <div key={data.id}>
                    <p class="font-bold">
                        Book Title:  <span> {data.title} </span>
                    </p>
                    <p class="font-bold">
                        Author of book: <span> {data.author} </span>
                    </p>
                    <p class="font-bold">
                        date Posted:  <span> {data.datetime} </span>
                    </p>
                    <p class="font-bold">
                        date updated:  <span> {data.updatedtime === '0001-01-01T00:00:00Z' ? <span> Never been updated</span> : data.updatedtime} </span>
                    </p>
                    {/* <button class="bg-red hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full" onClick={() => deleteBook(data.id)}> Delete</button> */}
                    <span> </span>
                    <button class="bg-red hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full" onClick={() => editBook(data.id)}> Edit</button>
                </div>
            </div>
        </>
    )
}