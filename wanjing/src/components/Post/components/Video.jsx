import { GoMute, GoUnmute } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
export default function Video({ src, format, loop, mute }) {
    const [pause, setPause] = useState(true);
    const control = useRef();

    if (control === undefined) {
        return (
            <div className="animate-bounce flex justify-center ">
                <div className="bg-white rounded-full w-4 h-4"></div>
                <div className="bg-white rounded-full w-4 h-4"></div>
                <div className="bg-white rounded-full w-4 h-4"></div>
            </div>
        );
    }

    function playHandler() {
        if (control.current.paused) {
            control.current.play();
        } else {
            control.current.pause();
        }
    }
    return (
        <div className="relative">
            <button
                type="button"
                className="absolute flex justify-center items-center inset-0   "
            >
                {pause && <AiFillPlayCircle size="3em" />}
            </button>
            <video
                onPause={() => {
                    setPause(true);
                }}
                onPlaying={() => setPause(false)}
                onClick={playHandler}
                onLoadStart={(e) => {
                    e.target.volume = 0.5;
                }}
                ref={control}
                className="object-contain w-full cursor-pointer  max-h-[400px] min-h-fit"
                muted={mute ? true : ""}
                loop={loop ? true : ""}
                src={src}
            ></video>
        </div>
    );
}
