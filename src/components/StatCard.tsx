import clsx from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
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
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>

    // <div
    //   className={clsx("stat-card", {
    //     "bg-appointments": type === "appointments",
    //     "bg-pending": type === "pending",
    //     "bg-cancelled": type === "cancelled",
    //   })}>
    //   <div className="flex items-center gap-4">
    //     <img
    //       src={icon}
    //       height={32}
    //       width={32}
    //       alt="appointments"
    //       className="size-8 w-fit"
    //     />
    //     <h2 className="text-32-bold text-white">{count}</h2>
    //   </div>

    //   <p className="text-14-regular text-white">{label}</p>
    // </div>
  );
};

export default StatCard;
