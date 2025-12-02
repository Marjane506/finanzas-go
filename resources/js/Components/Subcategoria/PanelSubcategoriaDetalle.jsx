import { useState } from "react";
import ModalDetalleSubcategoria from "./ModalDetalleSubcategoria";
import ModalMovimiento from "./ModalMovimiento";

export default function PanelSubcategoriaDetalle({ sub }) {
    const [openDetalle, setOpenDetalle] = useState(false);
    const [openMovimiento, setOpenMovimiento] = useState(false);

    // 🔥 Aseguramos valores numéricos
    const gastado = sub.total_gastado ?? 0;
    const ingresos = sub.total_ingresos ?? 0;
    const restante = sub.restante ?? ingresos - gastado;

    return (
        <div className="bg-white rounded-xl shadow p-6">
            {/* CABECERA */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{sub.name}</h2>

                <button
                    onClick={() => setOpenDetalle(true)}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    Editar
                </button>
            </div>

            {/* INFORMACIÓN BÁSICA */}
            <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-500">Ingresos</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {ingresos.toFixed(2)} €
                    </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-500">Gastado</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {gastado.toFixed(2)} €
                    </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-500">Restante</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {restante.toFixed(2)} €
                    </p>
                </div>
            </div>

            {/* ACCIONES */}
            <div className="mt-6 flex gap-4">
                <button
                    onClick={() => setOpenMovimiento(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Añadir movimiento
                </button>
            </div>

            {/* MODALES */}
            <ModalDetalleSubcategoria
                open={openDetalle}
                sub={sub}
                onClose={() => setOpenDetalle(false)}
                onAddMovimiento={() => setOpenMovimiento(true)}
                onDelete={() => {}}
            />

            <ModalMovimiento
                open={openMovimiento}
                onClose={() => setOpenMovimiento(false)}
                subcategoriaId={sub.id}
            />
        </div>
    );
}
