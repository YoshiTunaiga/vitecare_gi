import clsx from "clsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled" | "total";
  count: number;
  label: string;
  icon: string;
};

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <Card
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <img
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <CardTitle className="text-32-bold text-white">{count}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{label}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
