import React, { useState } from 'react'
import { ImageData } from './ImageData'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa"

const ImageSlider = () => {

    const [sliderImage,setSliderImage] = useState(0)

    const prevSlide = () => {

    }

    const nextSlide = () => {

    }

    return (
        <div className="imageSlider__container">
            
                <FaArrowAltCircleLeft className="left__arrow" onClick={prevSlide}/>
                <FaArrowAltCircleRight className="right__arrow" onClick={nextSlide}/>
                {ImageData.map((slide, index) => {

                        return <img className="slider__image" src={slide.image} alt={slide.alt} />
                    })
                }
                {/* <ChevronRightIcon className="right__arrow"/> */}
          
        </div>
    )
}

export default ImageSlider
