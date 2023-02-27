import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading({ bg, text, screen }) {
    return (
        <div
            className={`w-full ${
                screen && "h-screen"
            }  transition-all flex items-center flex-col justify-center bg-${bg} relative `}
        >
            <div>
                <h1 className="text-center font-bold text-white/80">{text}</h1>
            </div>
            <AiOutlineLoading3Quarters className="animate-spin text-white" />
        </div>
    );
}

// export function LoadingSmall() {
//     return (
//         <div className="w-full  transition-all flex-col flex items-center justify-center bg-base relative ">
//             <div>
//                 <h1 className="text-center font-bold text-white/80">Loading</h1>
//             </div>
//             <AiOutlineLoading3Quarters className="animate-spin text-white" />
//         </div>
//     );
// }
