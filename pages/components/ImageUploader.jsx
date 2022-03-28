import React, { useState, useEffect } from "react";
import ImageToCrop from "./ImageToCrop.jsx";

const ImageUploader = () => {

    const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (selectedImage) {
        setImageUrl(URL.createObjectURL(selectedImage));
    }
}, [selectedImage]);

  const onCancel = () => {
    setSelectedImage(null);
  };

  const setCroppedImage = ( crop, zoom, aspect, croppedImageUrl) => {
    const newImage =croppedImageUrl;
    setImageUrl(newImage);
    setSelectedImage(null);
    const newObject = {
      crop,
      zoom,
      aspect,
      imageUrl,
    };
    console.log('ImageCrop :',newObject)
  };

  return (
    <>
    <h1 className="text-4xl text-center font-extrabold tracking-tight py-10  text-blue-500 sm:text-5xl md:text-6xl overflow:hidden">HASHTAG CROPPER</h1>
      <div className="m-auto flex justify-center py-5">
          
                    <label className=" text-center">
                        <span className="sr-only">Choose photo</span>
                        <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 " />
                    </label>
                   
                </div>
      {selectedImage ? (
        <ImageToCrop
          imageUrl={imageUrl}
          onCancel={onCancel}
          setCroppedImage={setCroppedImage}
          className="overflow-hidden"
        />
      ) : null}
      <div className="">
      <img className=" m-auto flex justify-center rounded-lg" src={imageUrl}></img>
     
      </div>
     </>
  );
};
export default ImageUploader;