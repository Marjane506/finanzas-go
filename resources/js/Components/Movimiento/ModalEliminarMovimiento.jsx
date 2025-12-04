import Modal from "@/Components/Modal";
import { motion } from "framer-motion";

export default function ModalEliminarMovimiento({
    open,
    onClose,
    onConfirm,
    movimiento,
}) {
    if (!open || !movimiento) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="p-6 text-center"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Eliminar movimiento
                </h2>

                <p className="text-gray-600 mb-6">
                    ¿Seguro que deseas eliminar este movimiento de{" "}
                    <span className="font-semibold">
                        {parseFloat(movimiento.cantidad).toFixed(2)} €
                    </span>
                    ?
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
