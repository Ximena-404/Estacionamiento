import {v4 as uuidv4} from "uuid"
import { useState, ChangeEvent,  Dispatch, useEffect } from "react"
import { ActivityActions, ActivityState } from "../reducers/activity-reducers";
import { categories } from "../data/categories";
import { Activity } from "../types";

type FormProps = {
  dispatch : Dispatch<ActivityActions>
  state : ActivityState
}

const initialState : Activity ={
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
}


export default function Form({dispatch, state}: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);
  // const [activity, setActivity] = useState<Activity>({

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  }
  , [state.activeId]
  )


  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
    console.log(e.target.id);
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit..");
    setIsSubmitting(true);
    dispatch({type: "save-activity", payload: {newActivity: activity}})
    setActivity({
      ...initialState, id: uuidv4()}); // Reinicia el formulario después de enviar
    setIsSubmitting(false); // Reactiva el botón después de enviar
    // Aquí puedes agregar la lógica para enviar el formulario.
    // Luego de la operación asíncrona puedes reactivar el botón si es necesario.
  };

  // Cambia el texto del botón según la categoría
  const buttonText =
    activity.category === 1 ? "Guardar comida" : "Guardar ejercicio";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías. Ej 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-50"
        value={buttonText}
        disabled={!isValidActivity() || isSubmitting}
      />
    </form>
  );
}
