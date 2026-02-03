import Modal from "@/Components/Modal";
import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function ModalEditarMovimiento({ open, onClose, movimiento }) {
    const [tipo, setTipo] = useState("gasto");
    const [cantidad, setCantidad] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        if (movimiento) {
            setTipo(movimiento.tipo);
            setCantidad(movimiento.cantidad);
            setFecha(movimiento.fecha?.slice(0, 10));
        }
    }, [movimiento]);

    const enviar = () => {
        router.put(
            `/movimientos/${movimiento.id}`,
            { tipo, cantidad, fecha },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["sub"] });
                    onClose();
                },
            },
        );
    };

    if (!movimiento) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Editar movimiento</h2>

                <div>
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
                <div>
                    <label className="text-gray-700 font-medium">Fecha</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="text-gray-700 font-medium">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        onClick={enviar}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
