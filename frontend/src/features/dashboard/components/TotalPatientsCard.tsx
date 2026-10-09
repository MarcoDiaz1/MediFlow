
import { FaUsers } from "react-icons/fa6";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Card from "../../../components/ui/card";

interface TotalPatientsCardProps {
  totalPatients: number | null;
  patientGrowth: number | null;
}

const TotalPatientsCard = ({
  totalPatients,
  patientGrowth,
}: TotalPatientsCardProps) => {
  const isGrowthPositive = patientGrowth !== null && patientGrowth > 0;
  const isGrowthNegative = patientGrowth !== null && patientGrowth < 0;

  return (
    <Card additionalClasses="w-full h-full bg-[#F8F5ED] border border-[#E5E0D5]">
      <div className="flex h-full w-full flex-col justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3C6E71]">
            <FaUsers className="text-xl text-white" />
          </div>

          <div>
            <p className="text-sm font-medium text-[#5B6268]">
              Total Patients
            </p>

            <p className="text-2xl font-bold text-[#212529]">
              {totalPatients !== null ? totalPatients : "—"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {patientGrowth === null ? (
            <p className="text-sm text-[#5B6268]">
              Loading growth data...
            </p>
          ) : (
            <>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                  isGrowthPositive
                    ? "bg-[#DCEBE7] text-[#245B4A]"
                    : isGrowthNegative
                      ? "bg-[#F8E3E3] text-[#9B3030]"
                      : "bg-[#ECEAE4] text-[#5B6268]"
                }`}
              >
                {isGrowthPositive ? (
                  <FaArrowTrendUp />
                ) : isGrowthNegative ? (
                  <FaArrowTrendDown />
                ) : null}

                {patientGrowth > 0 ? "+" : ""}
                {patientGrowth}
              </span>

              <p className="text-sm text-[#5B6268]">
                vs. previous 7 days
              </p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TotalPatientsCard;
