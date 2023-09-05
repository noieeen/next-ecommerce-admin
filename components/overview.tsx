import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";

interface OverviewProps {
  data: any[];
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <div className="flex flex-col space-y-2">
      <LineChart data={data} />
      <BarChart data={data} />
    </div>
  );
};

export default Overview;
