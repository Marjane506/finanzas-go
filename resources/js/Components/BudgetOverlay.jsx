import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { router } from "@inertiajs/react";
import BudgetImg from "../../assets/mujerynino.jpg";

export default function BudgetOverlay({ presupuestoActual }) {
    const [monto, setMonto] = useState("");

    // Si el usuario YA TIENE un presupuesto en la tabla historial → no mostrar overlay
    if (presupuestoActual !== null) return null;

    const handleSave = () => {
        if (!monto) return;

        // Guardar presupuesto inicial EN LA TABLA historial_presupuestos
        router.post("/presupuesto-general", { monto_inicial: monto });
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-gradient-to-br from-indigo-900/70 to-indigo-600/50 backdrop-blur-md flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl
                        px-8 w-[98%] max-w-6xl h-[60vh] border border-white/30
                        flex items-center gap-10"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Columna izquierda */}
                    <div className="flex-1 flex items-center justify-center">
                        <motion.img
                            src={BudgetImg}
                            alt="Ilustración presupuesto"
                            className="w-120 h-120 drop-shadow-lg rounded-3xl"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                    </div>

                    {/* Columna derecha */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-3xl font-bold text-gray-800 mt-2 mb-4 rounded-lg"
                        >
                            “Lo primero es lo primero”!
                        </motion.h2>

                        <p className="text-gray-700 text-lg mb-4 mt-2 py-4 px-16">
                            Define tu presupuesto inicial para empezar a
                            organizar tus finanzas.
                        </p>

                        <motion.input
                            type="number"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            placeholder="0 €"
                            className="w-full max-w-xs border-2 border-gray-200 rounded-xl p-4 text-center text-2xl text-gray-800 focus:outline-none focus:border-indigo-500 shadow-sm mb-6"
                            whileFocus={{ scale: 1.02 }}
                        />

                        <motion.button
                            onClick={handleSave}
                            disabled={!monto}
                            className={`w-35 max-w-xs py-3 rounded-xl font-semibold shadow-md text-lg transition-all
                                ${
                                    monto
                                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 150 }}
                        >
                            Continuar
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
