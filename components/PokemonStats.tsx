import { PokemonStat } from "pokenode-ts";

import { statColors } from "@/utils/colors";

interface StatsProps {
  stats: PokemonStat[];
}

const Stats = ({ stats }: StatsProps) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-5 font-semibold capitalize max-w-md">
      {stats.map((stat) => (
        <li key={stat.stat.name} className="text-center relative py-5">
          <div
            style={{
              backgroundColor: `${statColors[stat.stat.name]}`,
              opacity: 0.25,
            }}
            className="absolute top-0 left-0 w-full h-full rounded-md -z-10"
          ></div>
          <p>{stat.stat.name}</p>
          <p>{stat.base_stat}</p>
        </li>
      ))}
    </ul>
  );
};

export default Stats;
