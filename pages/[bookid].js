import axios from "axios";

export async function getStaticPath() {
    
}
export async function getStaticProps({id}) {
    const getOne = await axios.get(`http://localhost:8080/books/${id}`)
    return {
        props: {
            getOne
        }
      }
}

export default function getOne() {
return (
    <>
    <h1> 
        hello this is one page
    </h1>
    </>
)
}