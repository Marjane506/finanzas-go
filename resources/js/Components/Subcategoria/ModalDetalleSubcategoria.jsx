import Modal from "@/Components/Modal";
import { Trash2, Edit } from "lucide-react";

export default function ModalDetalleSubcategoria({
    open,
    sub,
    onClose,
    onDelete,
}) {
    if (!sub) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">{sub.name}</h2>

                <div className="text-gray-700">
                    <p>
                        <strong>Tipo:</strong> {sub.type}
                    </p>
                    <p>
                        <strong>Valor:</strong> {sub.value} €
                    </p>
                    <p>
                        <strong>Fecha:</strong> {sub.date}
                    </p>
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
