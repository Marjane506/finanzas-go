import Modal from "@/Components/Modal";
import { Trash2, Edit, PlusCircle } from "lucide-react";

export default function ModalDetalleSubcategoria({
    open,
    sub,
    onClose,
    onDelete,
    onAddMovimiento,
}) {
    if (!sub) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">{sub.name}</h2>

                <div className="text-gray-700">
                    <p>
                        <strong>Tipo:</strong> {sub.tipo ?? "—"}
                    </p>
                    <p>
                        <strong>Valor:</strong> {sub.valor ?? 0} €
                    </p>
                    <p>
                        <strong>Fecha:</strong> {sub.date ?? "—"}
                    </p>
                </div>

                <div className="mt-4">
                    <button
                        onClick={() => onAddMovimiento(sub.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
                    >
                        <PlusCircle size={18} />
                        Añadir movimiento
                    </button>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
                        onClick={() => onDelete(sub.id)}
                    >
                        <Trash2 size={18} />
                        Eliminar
                    </button>

                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2">
                        <Edit size={18} />
                        Editar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
