import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropperImage";

const aspectRatios = [
  { value: 4 / 3, text: "M" },
  { value: 16 / 9, text: "L" },
  { value: 1 / 2, text: "S" },
];

const ImageToCrop = ({ imageUrl, onCancel, setCroppedImage, }) => {

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [aspect, setAspect] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onAspectChange = (e) => {
    const value = e.target.value;
    const ratio = aspectRatios.find((ratio) => ratio.value == value);
    setAspect(ratio);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
      console.log('my cropped image', { croppedImageUrl })
      setCroppedImage(crop, zoom, aspect, croppedImageUrl);
    } catch (e) {
      console.error(e)
    }
  };
  
  return (
    
    <div className="overflow:hidden">
      <div className="fixed bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100 inset-0"></div>
      <Cropper
        image={imageUrl}
        zoom={zoom}
        crop={crop}
        aspect={aspect.value}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
      />

      <div className="fixed bottom-0 w-full h-1/6">
        <div className=" justify-center flex ">
          <input className=" flex md:w-1/2 w-4/6 rounded-lg   h-3 w-128" 
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={zoom}
            onInput={(e) => {
              onZoomChange(e.target.value);
            }}
            
          ></input>
        </div>

        <div className="justify-center gap-6 py-1 flex">
        <select className="w-12 h-12 px-4 mt-0.5 appearance-none  border border-solid border-hashtag rounded-full focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none" aria-label="change ratio" onChange={onAspectChange}>
            {aspectRatios.map((ratio) => (
              <option
                key={ratio.text}
                value={ratio.value}
                selected={ratio.value === aspect.value}
              >
                {ratio.text}
              </option>
            ))}
          </select>
          <button onClick={onCrop} title="CROP" class="bg-blue-500 px-4 py-4 font-bold text-white inline-flex items-center space-x-2 rounded-full">
            <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M32 64C49.67 64 64 78.33 64 96V416C64 433.7 49.67 448 32 448C14.33 448 0 433.7 0 416V96C0 78.33 14.33 64 32 64zM246.6 137.4C259.1 149.9 259.1 170.1 246.6 182.6L205.3 224H434.7L393.4 182.6C380.9 170.1 380.9 149.9 393.4 137.4C405.9 124.9 426.1 124.9 438.6 137.4L534.6 233.4C547.1 245.9 547.1 266.1 534.6 278.6L438.6 374.6C426.1 387.1 405.9 387.1 393.4 374.6C380.9 362.1 380.9 341.9 393.4 329.4L434.7 288H205.3L246.6 329.4C259.1 341.9 259.1 362.1 246.6 374.6C234.1 387.1 213.9 387.1 201.4 374.6L105.4 278.6C92.88 266.1 92.88 245.9 105.4 233.4L201.4 137.4C213.9 124.9 234.1 124.9 246.6 137.4V137.4zM640 416C640 433.7 625.7 448 608 448C590.3 448 576 433.7 576 416V96C576 78.33 590.3 64 608 64C625.7 64 640 78.33 640 96V416z" /></svg>
          </button>
          <button onClick={onCancel}  title="CANCEL" class="bg-red-500 px-4 py-4 font-bold text-white inline-flex items-center space-x-2 rounded-full">
            <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageToCrop;
