import Modal from "@/Components/Modal";
import { motion } from "framer-motion";

export default function ModalEliminarCategoria({
    open,
    onClose,
    categoria,
    onConfirm,
}) {
    if (!open || !categoria) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="p-6 text-center"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Eliminar categoría
                </h2>

                <p className="text-gray-600 mb-6">
                    ¿Seguro que deseas eliminar la categoría{" "}
                    <span className="font-semibold">{categoria.name}</span>?
                    <br />
                    <span className="text-red-600 font-medium">
                        Se eliminarán todas las subcategorías y movimientos
                        asociados.
                    </span>
                </p>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </motion.div>
        </Modal>
    );
}
