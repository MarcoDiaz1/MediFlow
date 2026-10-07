import { FaUsers } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import Card from "../ui/card";

interface TotalPatientsCardProps {
  totalPatients: number | null;
  patientGrowth: number | null;
}

const TotalPatientsCard = ({
  totalPatients,
  patientGrowth,
}: TotalPatientsCardProps) => {
  return (
    <Card additionalClasses="bg-[#DCEBE7] w-full  h-full">
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex items-center">
          <FaUsers className="bg-[#3c6e71] text-[#E8C878] text-[2.5vw] rounded-full p-3 mr-2" />

          <div className="font-bold text-[1vw] text-[#20272B] flex">
            <p>Total Patients:</p>

            <p className="ml-3">
              {totalPatients !== null
                ? totalPatients
                : "Loading..."}
            </p>
          </div>
        </div>

        <div className="w-full bg-[#3c6e71] my-2 p-2 px-3 rounded-full flex items-center">
          <FaFire className="mr-2 text-[#E8C878]" />

          <p className="font-bold text-white">
            {patientGrowth !== null
              ? `${patientGrowth >= 0 ? "+" : ""}${patientGrowth} vs previous 7 days`
              : "Loading..."}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TotalPatientsCard;