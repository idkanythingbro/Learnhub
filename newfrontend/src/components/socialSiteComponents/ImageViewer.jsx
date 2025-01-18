import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
const ImageViewer = ({ images, alt = "Preview not display", className, imgClass }) => {
    return (
        <div className={`${className} w-full`}>
            {images.length > 1 ?
                <SimpleImageSlider
                    width={"35rem"}
                    height={"25rem"}
                    style={{ position: "relative", borderRadius: "0.5rem" }}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    navSize={20}
                />
                :
                <img src={images[0].url} alt={alt} className={`w-full h-80 ${imgClass} rounded-lg`} />
            }

        </div>
    )
}

export default ImageViewer