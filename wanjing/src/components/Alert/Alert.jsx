import { GoAlert } from "react-icons/go";
export function AlertDanger({ errors }) {
    return (
        <div className="bg-red-500 text-white flex flex-col items-center px-2 mx-3 rounded-md py-1">
            <GoAlert />
            {errors.status === 401 && errors.data.errors}
            {errors.status === 429 && errors.data.message}
            {errors.status === 404 && errors.data.message}
            {errors.status === 406 && (
                <div>
                    {Object.keys(errors.data.errors).map((key) => {
                        return <p key={key}>{errors.data.errors[key][0]}</p>;
                    })}
                </div>
            )}
            {errors.status === 500 && "Internal server error"}
        </div>
    );
}
