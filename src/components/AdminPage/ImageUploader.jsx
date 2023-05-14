import { Icon } from "@iconify/react";
import React from "react";

const ImageUploader = ({ setDataForm, imageURL }) => {
  return (
    <div className="relative flex flex-col justify-between items-center w-64 h-80 bg-gray-100  border-4 border-slate-200 rounded-2xl p-8">
      <input
        id="image"
        name="image"
        type="file"
        className="absolute w-full h-full top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
        onChange={(e) =>
          setDataForm((prev) => {
            return { ...prev, imageURL: e.target.files[0].name };
          })
        }
      />
      {/* EDIT IMAGE URL DISINI JIKA SUDAH ADA API */}
      {imageURL?.length > 0 ? (
        <>
          <img src={`/${imageURL}`} className="w-full object-fill flex justify-center items-center" alt={imageURL} />
          {/* Button for remove image url */}
          <div
            className="cursor-pointer"
            onClick={(e) =>
              setDataForm((prev) => {
                return { ...prev, imageURL: "" };
              })
            }
          >
            <Icon icon="mdi:cancel-bold" width={30} className="border border-slate-200 bg-white rounded-full text-[#DE5959] absolute -top-4 -right-4" />
          </div>
        </>
      ) : (
        <>
          <Icon icon="bx:image-add" width={180} className="text-[#4B8F98]" />
          <span className="text-[#bdbdbd] text-center font-medium m-0">Click or drag & drop gambar produk</span>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
