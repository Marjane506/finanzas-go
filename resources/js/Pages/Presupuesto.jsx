import { usePage, router } from "@inertiajs/react";
import ProgressBar from "../Components/ProgressBar";

export default function Presupuesto() {
    const { auth, presupuesto } = usePage().props;
    if (!presupuesto) {
        console.log("No hay presupuesto → mostrando pantalla vacía");
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Aún no tienes presupuesto definido
                </h2>
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => router.visit("/")}
                >
                    Definir presupuesto
                </button>
            </div>
        );
    }

    // Si el usuario aún no tiene presupuesto definido
    if (!presupuesto) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Aún no tienes presupuesto definido
                </h2>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                    Define un presupuesto para comenzar a controlar tus gastos.
                </p>
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => router.visit("/")}
                >
                    Definir presupuesto
                </button>
            </div>
        );
    }

    // Si presupuesto existe → ahora SI tiene las propiedades correctas
    const porcentaje =
        presupuesto.monto_inicial > 0
            ? (presupuesto.saldo_actual / presupuesto.monto_inicial) * 100
            : 0;

    return (
        <div className="max-w-xl mx-auto mt-16 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Presupuesto General
            </h1>

            <div className="text-center mb-4">
                <p className="text-gray-600 text-lg">
                    Monto inicial:
                    <span className="font-semibold">
                        {" "}
                        {presupuesto.monto_inicial} €
                    </span>
                </p>
                <p className="text-gray-600 text-lg">
                    Saldo actual:
                    <span className="font-semibold">
                        {" "}
                        {presupuesto.saldo_actual} €
                    </span>
                </p>
            </div>

            {/* Barra de progreso */}
            <ProgressBar porcentaje={porcentaje} />

            <p className="text-center mt-4 text-gray-500">
                {porcentaje.toFixed(0)}% disponible
            </p>
        </div>
    );
}
