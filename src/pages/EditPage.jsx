import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [evacPlan, setEvacPlan] = useState({
        id: "",
        name: "",
        location: "",
        description: ""
    });

    const getEvacPlan = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://hw3-fckl.onrender.com/api/plans/${id}`);
            setEvacPlan({
                id: response.data.id,
                name: response.data.name,
                location: response.data.location,
                description: response.data.description
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    const updateEvacPlan = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new URLSearchParams();
        formData.append('name', evacPlan.name);
        formData.append('location', evacPlan.location);
        formData.append('description', evacPlan.description);

        try {
            await axios.put(`https://hw3-fckl.onrender.com/api/plans/${id}`, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            toast.success("Updated Evac Plan successfully");
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getEvacPlan();
    }, [id]);

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">Update {evacPlan.name}</h2>
            {isLoading ? ("Loading") : (
                <>
                    <form onSubmit={updateEvacPlan}>
                        <div className="space-y-2">
                            <div>
                                <label>Name</label>
                                <input type="text" value={evacPlan.name} onChange={(e) => setEvacPlan({ ...evacPlan, name: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Name"></input>
                            </div>
                            <div>
                                <label>Location</label>
                                <input type="text" value={evacPlan.location} onChange={(e) => setEvacPlan({ ...evacPlan, location: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Location"></input>
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea value={evacPlan.description} onChange={(e) => setEvacPlan({ ...evacPlan, description: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Description"></textarea>
                            </div>
                            <div>
                                {!isLoading && (<button type="submit" className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Update</button>)}
                            </div>
                        </div>
                    </form>
                </>
            )}

        </div>
    );
};

export default EditPage;
