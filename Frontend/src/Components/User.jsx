import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then(response => {
                console.log(response.data.user); // Log user data to verify structure
                setUsers(response.data.user || []); // Ensure users is always an array
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate=useNavigate()
    console.log("User props:", user); // Debugging line

    if (!user) {
        return <div>Loading...</div>; // Handle the case where user is not yet available
    }

    const firstName = user.firstName || "Unknown";
    const displayName = firstName[0] || "U";

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {displayName}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {firstName} {user.lastName || ""}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button
                    onClick={() => {
                        navigate(`/send?id=${user._id}&name=${firstName}`);
                    }}
                    label={"Send Money"}
                />
            </div>
        </div>
    );
}