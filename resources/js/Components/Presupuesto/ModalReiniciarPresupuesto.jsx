import { useState } from "react";
import { router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalReiniciarPresupuesto({ open, onClose }) {
    const [monto, setMonto] = useState("");

    const enviar = () => {
        if (!monto) return;

        router.post(
            route("presupuesto.reiniciar"),
            { nuevo_monto: monto },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Actualiza solo el presupuestoActual sin recargar la página entera
                    router.reload({ only: ["presupuestoActual"] });

                    // Cierra el modal
                    onClose();

                    // Limpia el campo
                    setMonto("");
                },
            }
        );
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        Reiniciar presupuesto
                    </h2>

                    <p className="text-gray-600 text-center mb-4">
                        Ingresa un nuevo presupuesto para comenzar un nuevo mes.
                    </p>

                    <input
                        type="number"
                        placeholder="Nuevo monto (€)"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-center text-lg"
                    />

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={enviar}
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            Reiniciar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
