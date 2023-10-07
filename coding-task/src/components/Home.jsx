import React,{useState,useEffect} from "react";
import MoVieComponent from "./MovieComponent";
import Loading from "./Loading";

const Home = () => {
    const [card, setCard] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const getCardData = async () => {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
        );
        const data = await res.json() // response by api stored in json format in data variable
        console.log(data);
        setCard((prev)=>[...prev, ...data]); //this code shows previous data as well as next page data 
        // setCard(data) // this lone of code shows only the next page data so use the code according to your need
        setLoading(false);
    };

    const handleInfiniteScroll = async () => {
        // console.log("scrollHeight", document.documentElement.scrollHeight); //this shows the Height of webpage from top to bottom 
        //     console.log("innerHeight", window.innerHeight); //use to show the innerheight or actuall viewable height of webpage
        //     console.log("scrollTop", document.documentElement.scrollTop); // this is the value which shows live height of scrollbar when you move your scrollbar the value will change accordingly 
        try {
            if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
                setLoading(true);
                setPage((prev)=> prev + 1);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCardData();
    },[page]);

    useEffect (()=>{
        window.addEventListener("scroll", handleInfiniteScroll);
        return()=> window.removeEventListener("scroll", handleInfiniteScroll)
    },[]);

    return(
        <>
           {/* <Loading/> */}
           <MoVieComponent MovieInfo={card}/>
           {loading && <Loading/>}
        </>
    );
};
export default Home;