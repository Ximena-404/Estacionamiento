import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo, Dispatch } from "react";
import { ActivityActions } from "../reducers/activity-reducers";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
  const getCategoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.find((cat) => cat.id === category)?.name || "",
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comidas y Actividades
      </h2>
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white m-5 flex justify-between items-center"
        >
          <div className="space-y-2 relative">
            {/* Tipo de tarea con margen para separación */}
            <p
              className={`absolute top-0 left-8 -top-10 py-2 px-3 text-white uppercase font-bold rounded-md
                ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}
            >
              {getCategoryName(activity.category)}
            </p>

            {/* Nombre con margen para que no se pegue */}
            <br />
            <p className="ml-auto py-2 px-3 text-2xl font-bold pt-5">{activity.name}</p>

            <p className="ml-auto font-black text-4xl text-lime-500">
            {activity.calories} <span>Calorías</span>
            </p>


            <button
              onClick={() => dispatch({ type: "set-activity", payload: { id: activity.id } })}
            >
              <PencilSquareIcon className="w-8 h-8 text-gray-800" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
