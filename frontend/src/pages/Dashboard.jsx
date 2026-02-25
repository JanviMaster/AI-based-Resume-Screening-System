import { useEffect } from "react";
import API from "../services/api";

function Dashboard() {

  useEffect(() => {
    API.get("/")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return <h2>Admin Dashboard</h2>;
}

export default Dashboard;