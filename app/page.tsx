"use client";

import ByCountryGraphs from "@/components/by-country/by-country-graphs";
import ByDateGraphs from "@/components/by-date/by-date-graphs";
import ClientOnly from "@/providers/ClientOnly";
import { useTheme } from "next-themes";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  const { resolvedTheme } = useTheme();

  return (
    <main className="min-h-screen w-full flex flex-col gap-5 p-10 pt-20">
      <ByDateGraphs resolvedTheme={resolvedTheme || "dark"} />
      <ByCountryGraphs resolvedTheme={resolvedTheme || "dark"} />
    </main>
  );
};

export default MainPage;
