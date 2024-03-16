import { Fragment,useEffect,useState } from "react"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component";         // do party import first and then local import 
import { Navbar,HotelCard,Categories} from "../../components"
import "./Home.css";
import { useCategory } from "../../context";

export const Home =() => {

    const [hasMore,setHasMore] =      useState(true);                                         // hasmore basically check that whether there are more images aur cart to be displayed

    const [currentIndex, setCurrentIndex] = useState(16);
    const [testData, setTestData] = useState([]);
    

      const [hotels, setHotels] = useState([]);
      const {hotelCategory } = useCategory();
      useEffect(() =>{                                        // we are actually going to do sideeffect over here so to every refresh we get the data
        ( async () =>{
            try{                                              // ()() we are creating eefy basically eefy is a  immediately invoking function 
                const {data} = await axios.get(
                    `https://travel-app-backend-5.onrender.com/api/hotels?category=${hotelCategory}`);
                setTestData(data);
                setHotels(data ? data.slice(0, 16) : []);       // first 16 hotels
            }catch(err){
                console.log(err)
            }
        })();
      },[hotelCategory]);
      
      const fetchMoreData = () =>{
      if (hotels.length >= testData.length) {
        setHasMore(false);
        return;
      }
      setTimeout(() => {                                                          // why settimeout because after scrolling infinite times we show some loading
        if (hotels && hotels.length > 0) {
            setHotels(
              hotels.concat(testData.slice(currentIndex, currentIndex + 16))      // adding more 16 data from current index
            );
            setCurrentIndex((prev) => prev + 16);
          } else {
            setHotels([]);
          }
        }, 1000);
      };






    return (                                //  basically hua kya ki ab bahut saara hotel add ho gaye line se
        <Fragment>
        <Navbar />
        <Categories/>
           
            
                
                     {
                     hotels && hotels.length > 0 ? (
                        <InfiniteScroll
                          dataLength={hotels.length}
                          next={fetchMoreData}
                          hasMore={hasMore}
                          loader={
                            hotels.length > 0 && <h3 className="alert-text">Loading...</h3>
                     
                          }
                          endMessage={<p className="alert-text"> You have seen it all</p>}
                          >
                             <main className="main d-flex align-centre wrap gap-larger">{
                                hotels && hotels.map((hotel) => (
                                <HotelCard key={hotel._id} hotel={hotel}/>))}
                                         </main>
                          </InfiniteScroll>
                     ) : (<></>)
                }
              
        
        </Fragment>
        

    );
};