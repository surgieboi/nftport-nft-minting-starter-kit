import React, { useState } from "react"

const PreviewImage = ({ file }) => {

const [preview, setPreview] = useState(null)
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
    setPreview(reader.result);
}
    return <div>
        {preview ? <img className="w-full my-4 border border-slate-200 rounded-2xl" src={preview} alt="preview" /> : "Loading..."}
    </div>;
};

export default PreviewImage;