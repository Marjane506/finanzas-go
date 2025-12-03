import { useState } from "react";
import ModalMovimiento from "./ModalMovimiento";
import { router } from "@inertiajs/react";
import ModalEditarMovimiento from "./ModalEditarMovimiento";
export default function PanelSubcategoriaDetalle({ sub }) {
    const [openMovimiento, setOpenMovimiento] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [movEditar, setMovEditar] = useState(null);

    const abrirEditar = (mov) => {
        setMovEditar(mov);
        setOpenEditar(true);
    };

    const gastos = sub.movimientos?.filter((m) => m.tipo === "gasto") || [];
    const ingresos = sub.movimientos?.filter((m) => m.tipo === "ingreso") || [];

    const totalGastos = gastos.reduce((sum, m) => sum + Number(m.cantidad), 0);

    const totalIngresos = ingresos.reduce(
        (sum, m) => sum + Number(m.cantidad),
        0
    );

    const balance = totalIngresos - totalGastos;

    const eliminarMovimiento = (id) => {
        if (!confirm("¿Eliminar este movimiento?")) return;

        router.delete(`/movimientos/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ["sub"] });
            },
        });
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {sub.name}
            </h2>

            {/* BALANCE */}
            <div className="p-4 bg-gray-50 rounded-lg border mb-6">
                <p className="text-sm text-gray-500">Balance</p>
                <p
                    className={
                        "text-3xl font-bold " +
                        (balance >= 0 ? "text-green-700" : "text-red-700")
                    }
                >
                    {balance.toFixed(2)} €
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Ingresos (+{totalIngresos.toFixed(2)} €)
                </h3>

                {ingresos.length > 0 ? (
                    ingresos.map((mov) => (
                        <div
                            key={mov.id}
                            className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg mb-2"
                        >
                            <span className="text-green-700 font-medium">
                                +{parseFloat(mov.cantidad).toFixed(2)} €
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm">
                                    {new Date(
                                        mov.created_at
                                    ).toLocaleDateString()}
                                </span>
                                <button
                                    onClick={() => eliminarMovimiento(mov.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">Sin ingresos.</p>
                )}
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                    Gastos (-{totalGastos.toFixed(2)} €)
                </h3>

                {gastos.length > 0 ? (
                    gastos.map((mov) => (
                        <div
                            key={mov.id}
                            className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg mb-2"
                        >
                            <span className="text-red-700 font-medium">
                                -{parseFloat(mov.cantidad).toFixed(2)} €
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm">
                                    {new Date(
                                        mov.created_at
                                    ).toLocaleDateString()}
                                </span>
                                <button
                                    onClick={() => abrirEditar(mov)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarMovimiento(mov.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">Sin gastos.</p>
                )}
            </div>

            <button
                onClick={() => setOpenMovimiento(true)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
                Añadir movimiento
            </button>

            <ModalMovimiento
                open={openMovimiento}
                onClose={() => setOpenMovimiento(false)}
                subcategoriaId={sub.id}
            />
            <ModalEditarMovimiento
                open={openEditar}
                onClose={() => setOpenEditar(false)}
                movimiento={movEditar}
            />
        </div>
    );
}
