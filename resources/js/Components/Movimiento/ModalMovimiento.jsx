import Modal from "@/Components/Modal";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function ModalMovimiento({ open, onClose, subcategoriaId }) {
    const [tipo, setTipo] = useState("gasto");
    const [cantidad, setCantidad] = useState("");
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));

    const enviar = () => {
        if (!cantidad) return;

        router.post(
            "/movimientos",
            {
                tipo,
                cantidad,
                fecha,
                subcategoria_id: subcategoriaId,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["sub"] });
                    setCantidad("");
                    setTipo("gasto");
                    setFecha(new Date().toISOString().slice(0, 10));
                    onClose();
                },
            },
        );
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6 space-y-5 rounded-xl bg-white">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Registrar movimiento
                </h2>

                <div className="space-y-2">
                    <label className="text-gray-600 font-medium">Tipo</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                        <option value="gasto">Gasto</option>
                        <option value="ingreso">Ingreso</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-gray-600 font-medium">Fecha</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-gray-600 font-medium">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="0 €"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={enviar}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
