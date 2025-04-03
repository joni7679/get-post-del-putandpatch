import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Userdata() {
    let navigate = useNavigate()
    const [students, setStudents] = useState([]);

    let FetchData = () => {
        axios
            .get("http://localhost:3000/students")
            .then((response) => {
                console.log(response.data);
                setStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //  handleDelete
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");

        if (confirmDelete) {
            axios.delete(`http://localhost:3000/students/${id}`)
                .then((response) => {
                    console.log(response.data);

                    // Remove the deleted student from state
                    setStudents(students.filter((stu) => stu.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("Deletion canceled");
        }
    };

    // handleEdit Data
    const handleEdit = (id) => {
        console.log(id);
        //  save this data in local storage
        let saveId = window.localStorage.setItem("userId", id);
    
        navigate('/editdata')



    }




    useEffect(() => {
        FetchData();
    }, []);

    return (
        <>
            <div className="p-5" >
                <Link to={`/`} className="bg-blue-500 px-2 py-1 cursor-pointer rounded text-white">Back To Page</Link>

            </div>
            <div className="w-full  h-screen flex items-center justify-center flex-col p-5 ">
                <div className="bg-white p-6 rounded-lg shadow-lg  max-w-2xl ">
                    <h2 className="text-xl font-bold text-center mb-4">Registered Users</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Phone No</th>
                                <th className="border border-gray-300 p-2">Password</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr className="text-center" key={student.id}>
                                        <td className="border border-gray-300 p-2">{student.name}</td>
                                        <td className="border border-gray-300 p-2">{student.email}</td>
                                        <td className="border border-gray-300 p-2">{student.phone}</td>
                                        <td className="border border-gray-300 p-2">{student.password}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button className="bg-red-500 px-2 py-1 cursor-pointer rounded text-white" onClick={() => handleDelete(student.id)}>Delete</button> |{" "}
                                            <button onClick={() => handleEdit(student.id)} className="bg-blue-500 px-2 py-1 cursor-pointer rounded text-white">Edit</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-2">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default Userdata;
