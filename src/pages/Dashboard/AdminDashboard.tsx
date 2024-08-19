import React, { useEffect, useState } from "react";
import CardDataStats from "../../components/CardDataStats";
import ChartThree from "../../components/Charts/ChartThree";
import ChartTwo from "../../components/Charts/ChartTwo";
import { FaRegListAlt } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import ChartFour from "../../components/Charts/ChartFour";
import adminServices from "../../services/adminServices";

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState();
  const fetchUserStats = async () => {
    const response = await adminServices.getMonthlyUserStats();
    console.log(response);
    setData(response);
  };
  useEffect(() => {
    fetchUserStats();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats
          title="Inactive"
          total={data?.inactiveUsers.length}
          color="blue"
        >
          <FaRegListAlt size={"3vh"} color="blue" />
        </CardDataStats>
        <CardDataStats
          title="Supprimé"
          total={data?.deletionStats.length}
          color="red"
        >
          <FaStop color="red" size={"3vh"} />
        </CardDataStats>
        <CardDataStats
          title="Active"
          total={data?.loginStats.length}
          color="green"
        >
          <MdDoneOutline color="green" size={"3vh"} />
        </CardDataStats>
      </div>

      <div className="mt-4 flex justify-around">
        {/* repartitions des utilisateures   */}
        <ChartTwo />
        {/* repartitions des taches selon type   */}

        <ChartFour />
      </div>

      <div className="mt-4 flex justify-around">
        {" "}
        <ChartThree />
      </div>
    </>
  );
};
