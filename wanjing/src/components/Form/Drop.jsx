import { useContext, useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { UserContext } from "../../context/UserAuth";
import Video from "../Post/components/Video";

export default function Drop({
    setPreviewImage,
    previewImage,
    setImage,
    image,
}) {
    const [format, setFormat] = useState("");
    const fileInput = useRef();
    function imageHandler(file) {
        setImage(file);
        if (file) {
            var ext = file.name.split(".");
            ext = ext[ext.length - 1];
            setFormat(ext === "mp4" ? "video" : "image");
        }
        setPreviewImage(URL.createObjectURL(file));
        console.log(format);
    }
    function onDragOverHandler(e) {
        e.preventDefault();
    }
    function closeHandler() {
        setPreviewImage("");
        setImage(null);
    }
    function onDropHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const imageFile = e.dataTransfer.files[0];
        imageHandler(imageFile);
    }
    return (
        <>
            {previewImage && (
                <button
                    onClick={closeHandler}
                    className="absolute right-0 top-0 z-40 m-2 text-xl font-bold text-white/80"
                >
                    <AiFillCloseCircle />
                </button>
            )}
            <div
                onDragOver={onDragOverHandler}
                onDrop={onDropHandler}
                onClick={() => fileInput.current.click()}
                className="w-full min-h-[8em] rounded-md border-dashed border-2 justify-center flex items-center bg-secondary"
            >
                {previewImage ? (
                    <div className="bg-black text-center max-w-full flex flex-col">
                        {format === "video" ? (
                            <Video src={previewImage} format={"video"} />
                        ) : (
                            <img
                                src={previewImage}
                                className="max-h-[200px] object-contain"
                                alt={previewImage}
                            />
                        )}
                    </div>
                ) : (
                    <p>Drag and Drop file here or click here</p>
                )}
                <input
                    type="file"
                    hidden
                    ref={fileInput}
                    accept="video/*,image/*"
                    onChange={(e) => {
                        console.log(e);
                        imageHandler(e.target.files[0]);
                    }}
                    className="px-2 w-full rounded-md mb-4"
                />
            </div>
        </>
    );
}

export function DropEdit({ previewImage, setImage, image, setPreviewImage }) {
    const { user, url } = useContext(UserContext);
    const fileInput = useRef();
    useEffect(() => {
        setPreviewImage(() => {
            return !user.profile_img ? null : url + user.profile_img;
        });
    }, []);
    function imageHandler(file) {
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    }
    function onDragOverHandler(e) {
        e.preventDefault();
    }
    function closeHandler() {
        setPreviewImage("");
        setImage(null);
    }
    function onDropHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const imageFile = e.dataTransfer.files[0];
        imageHandler(imageFile);
    }
    return (
        <>
            {previewImage && (
                <button
                    onClick={closeHandler}
                    className="absolute right-0 top-0 z-40 m-2 text-xl font-bold text-white/80"
                >
                    <AiFillCloseCircle />
                </button>
            )}
            <div
                onDragOver={onDragOverHandler}
                onDrop={onDropHandler}
                onClick={() => fileInput.current.click()}
                className="w-full min-h-[8em] rounded-md border-dashed border-2 justify-center flex items-center bg-secondary"
            >
                {previewImage ? (
                    <div className="bg-black text-center max-w-full  flex flex-col">
                        <img
                            src={previewImage}
                            className="max-h-[200px] md:max-h-[300px] object-cover"
                            alt={previewImage}
                        />
                    </div>
                ) : (
                    <p>Drag and Drop file here or click here</p>
                )}
                <input
                    type="file"
                    hidden
                    ref={fileInput}
                    accept="image/*"
                    onChange={(e) => {
                        console.log(e);
                        imageHandler(e.target.files[0]);
                    }}
                    className="px-2 w-full rounded-md mb-4"
                />
            </div>
        </>
    );
}
