import { useRef, useEffect, useState } from "react";

import Carousel from 'react-material-ui-carousel';
import { Box, Typography } from '@mui/material';

/**
 * Display carousel 
 * @param {Array} items image path and text
 * @example
 * const items = [{ src: '/static/homePageImg/Preview ' + 1 + '.png', altText: "Parameter Recommendations" }]
 * @returns <MyCarousel items={items}/>
 */

const MyCarousel = (props) => {
    const carousel = useRef();
    const carouselImage = useRef();
    const [showImage, setShowImage] = useState(props.items.slice(0, 1));

    useEffect(() => {
        setTimeout(function () {
            const carouselResponsiveImageHeight = carouselImage.current.height;
            let carouselHeight = carouselResponsiveImageHeight + 36
            carousel.current.children[0].children[0].style.height = carouselHeight + "px";
            setShowImage(props.items);
        }, 500);

    }, [])

    
    return (
        <Box ref={carousel}>
            <Carousel autoPlay navButtonsAlwaysVisible animation="slide" duration="1100">
                {
                    showImage.map((item, i) => (
                        <>
                            <Box component="img" src={item.src} ref={carouselImage} sx={{m:"auto"}}/>
                            <Typography variant="body1" gutterBottom align="center">{item.altText}</Typography>
                        </>
                    ))
                }
            </Carousel>
        </Box>
    )
}

export default MyCarousel;