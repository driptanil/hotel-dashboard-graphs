import { format } from "date-fns";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-accent/90 p-3 rounded-2xl ">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col text-muted-foreground text-sm">
            <p>
              Adults:{" "}
              <span className="text-primary font-bold">{payload[1].value}</span>
            </p>
            <p>
              Children:{" "}
              <span className="text-primary font-bold">{payload[2].value}</span>
            </p>
            <p>
              Babies:{" "}
              <span className="text-primary font-bold">{payload[3].value}</span>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p>Total</p>
            <p className="text-3xl text-primary font-bold">
              {payload[0].value}
            </p>
          </div>
        </div>

        <p className="text-center label text-sm flex flex-col font-semibold mt-3">
          <span>{`${format(new Date(label), "do MMM yyyy")}  `}</span>{" "}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
