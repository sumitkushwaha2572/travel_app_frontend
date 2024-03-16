import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory } from "../../context";
import "./Categories.css";
export const Categories = () =>{
    const[categories,setCategories] = useState([]);
    const[numberofCategoryToShow,setnumberofCategoryToShow] = useState(0);
    const {hotelCategory, setHotelCategory} =useCategory();

    const handleShowmorerightclick = () =>
    {
        setnumberofCategoryToShow(prev => prev+10);
    }
    const handleShowmoreleftclick = () =>{
        setnumberofCategoryToShow(prev => prev-10);

    }
    
        useEffect(()=> {
            (async() => {
                try{
                    const {data} = await axios.get("https://travel-app-backend-5.onrender.com/api/category");
                    const categoriesToShow = data.slice(
                        numberofCategoryToShow + 10 > data.length ? data.length -10 : numberofCategoryToShow,
                         numberofCategoryToShow > data.length ? data.length : numberofCategoryToShow +10);
                    setCategories(categoriesToShow);


                } catch(err){
                    console.log(err)
                }
            })();
        },[numberofCategoryToShow]);

const handleCategoryClick =(category) =>
{
   setHotelCategory(category);
};

console.log({"Hotel Category" : hotelCategory});


    return (
    <section className=" categories d-flex align-centre gap-large cursor-pointer"> 

      {
        numberofCategoryToShow >=10 && (
            
        <button className="button btn-category btn-left fixed cursor-pointer" 
        onClick={handleShowmoreleftclick}>
        <span class ="material-icons-outlined">chevron_left</span>
    </button>
        )
      }
                                    

        
        { categories && categories.map(({ _id, category }) => <span key={_id} className={`${category === hotelCategory ? "border-bottom" : ""} item`} onClick={() => handleCategoryClick(category)}>{category}</span>)} 
        {

            numberofCategoryToShow - 10 < categories.length &&
        (<button className="button btn-category btn-right fixed cursor-pointer" 
         onClick={handleShowmorerightclick}>
            <span class ="material-icons-outlined">chevron_right</span>
        </button>)
        }
    </section>
    )
};

// whenever you have to pass a value to a onclick function you need to create a callback function and then pass the value