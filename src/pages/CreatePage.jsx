import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveEvacPlan = async (e) => {
        e.preventDefault();
        if (id === "" || name === "" || location === "" || description === "") {
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post("https://hw3-fckl.onrender.com/api/plans", {id: id, name: name, location: location, description: description});
            toast.success(`Saved ${response.data.name} sucessfully`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">Create an Evac Plan</h2>
            <form onSubmit={saveEvacPlan}>
                <div className="space-y-2">
                    <div>
                        <label>ID</label>
                        <input type="number" value={id} onChange={(e) => setID(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter ID"></input>
                    </div>
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Name"></input>
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Location"></input>
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Description"></input>
                    </div>
                    <div>
                        {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}

                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePage;