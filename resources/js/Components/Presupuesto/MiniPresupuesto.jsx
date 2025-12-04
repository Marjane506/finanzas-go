import { useState } from "react";
import ModalReiniciarPresupuesto from "./ModalReiniciarPresupuesto";

export default function MiniPresupuestoCircular({ presupuestoActual }) {
    const [openReiniciar, setOpenReiniciar] = useState(false);

    if (!presupuestoActual) return null;

    const monto = Number(presupuestoActual.monto_inicial);
    const saldo = Number(presupuestoActual.saldo_final);
    const porcentaje = Math.max(0, Math.min((saldo / monto) * 100, 100));

    const color =
        porcentaje < 30 ? "#ef4444" : porcentaje < 60 ? "#f59e0b" : "#10b981";
    return (
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full">
            <div className="flex justify-between items-center w-full mb-4">
                <h3 className="text-gray-800 font-semibold text-lg">
                    Presupuesto del mes
                </h3>
            </div>
            <div className="relative h-48 w-48 flex items-center justify-center">
                <svg className="h-full w-full" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        fill="none"
                    />

                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke={color}
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="314" // 2 * π * 50
                        strokeDashoffset={314 - (314 * porcentaje) / 100}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.8s ease" }}
                    />
                </svg>

                <div className="absolute text-center">
                    <p className="text-xl font-bold text-gray-800">
                        {saldo.toFixed(2)} €
                    </p>
                    <p className="text-gray-500 text-sm">
                        {porcentaje.toFixed(0)}%
                    </p>
                </div>
            </div>

            <p className="text-gray-600 text-sm mt-2">
                Presupuesto inicial: {monto} €
            </p>

            <button
                onClick={() => setOpenReiniciar(true)}
                className="mt-6 px-4 py-3 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
            >
                Nuevo presupuesto
            </button>

            <ModalReiniciarPresupuesto
                open={openReiniciar}
                onClose={() => setOpenReiniciar(false)}
            />
        </div>
    );
}
