import Modal from "@/Components/Modal";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function ModalMovimiento({ open, onClose, subcategoriaId }) {
    const [tipo, setTipo] = useState("gasto");
    const [cantidad, setCantidad] = useState("");

    const enviar = () => {
        if (!cantidad) return;

        router.post("/movimientos", {
            tipo,
            cantidad,
            subcategoria_id: subcategoriaId,
        });

        onClose();
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Nuevo movimiento</h2>

                <div className="space-y-2">
                    <label className="text-gray-700 font-medium">Tipo</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="gasto">Gasto</option>
                        <option value="ingreso">Ingreso</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-gray-700 font-medium">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="0 €"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        onClick={enviar}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
