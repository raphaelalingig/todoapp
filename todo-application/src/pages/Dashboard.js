import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "./components/Table";

export default function Dashboard() {
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    console.log("Open Dashboard");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.data && user.data.length > 0) {
      const userId = user.data[0].user_id; // Access the user_id correctly from the data array
      console.log(userId); // Logs the user_id
      setUser_id(userId);
    }
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex justify-center items-center">
        <Table user_id={user_id} />
      </div>
    </div>
  );
}
