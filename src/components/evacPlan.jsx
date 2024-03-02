import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";



const EvacPlan = ({ evacPlan, getEvacPlans }) => {
    const deleteEvacPlan = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",

        })
        if (result.isConfirmed) {
            try {
                await axios.delete(`https://hw3-fckl.onrender.com/api/plans/${id}`);
                toast.success("Deleted Evac Plan successfully ");
                getEvacPlans();
            } catch (error) {
                toast.error(error.message);
            }
        }



    }

    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{evacPlan.name}</h2>
                <div className="text-sm">ID: {evacPlan.id} </div>
                <div className="text-sm">Location: {evacPlan.location}</div>
                <div className="text-sm">Description: {evacPlan.description}</div>

                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${evacPlan.id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                    <button onClick={() => deleteEvacPlan(evacPlan.id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                </div>
            </div>



        </div>
    )
}

export default EvacPlan;