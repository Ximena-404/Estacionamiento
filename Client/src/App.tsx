
import { useReducer } from "react";
import Form from './Components/Form'
import { activityReducer, initialState } from "./reducers/activity-reducers";
import ActivityList from "./Components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <>
      {/* HEADER */}
      <header className="bg-gray-800 py-3">
        <div className="max-w-5xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorías
          </h1>
        </div>
      </header>

      {/* FORMULARIO */}
      <section className="bg-gray-700 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      {/* LISTA DE ACTIVIDADES MEJORADA */}
      <section className="p-10 mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-5">
          Comidas y Actividades
        </h2>

        <div className="space-y-4">  {/* Separa cada actividad */}
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </div>
      </section>
    </>
  );
}

export default App;
