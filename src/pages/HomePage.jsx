import { useEffect, useState } from "react";
import axios from "axios";
import EvacPlan from "../components/evacPlan";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [evacPlans, setEvacPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getEvacPlans = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("https://hw3-fckl.onrender.com/api/plans");
            console.log(response.data);
            setEvacPlans(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvacPlans();
    }, [])

    return (
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Create an Evac Plan</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {isLoading ? (
                    "Loading"
                ) : (
                    <>
                        {evacPlans.length > 0 ? (
                            <>
                                {
                                    evacPlans.map((evacPlan, index) => {
                                        return (
                                            <EvacPlan key={index} evacPlan={evacPlan}  getEvacPlans={getEvacPlans}/>
                                        )
                                    })

                                }
                            </>
                        ) : (
                            <div>
                                There are no Evacuation plans.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default HomePage;