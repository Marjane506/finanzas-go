import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { router } from "@inertiajs/react";
import BudgetImg from "../../assets/mujerynino.jpg";
import PrimaryButton from "@/Components/PrimaryButton";

export default function BudgetOverlay({ user }) {
    const [monto, setMonto] = useState("");

    const handleSave = () => {
        if (!monto) return;

        router.post("/presupuesto_inicial", {
            monto_inicial: monto,
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                <motion.div
                    className="relative bg-white rounded-3xl shadow-xl p-10 w-[95%] max-w-4xl border border-gray-200 flex items-center gap-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            src={BudgetImg}
                            alt="Presupuesto"
                            className="w-96 h-96 object-cover rounded-2xl shadow-sm"
                        />
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            “Lo primero es lo primero”!
                        </h2>

                        <p className="text-gray-700 text-lg mb-6 px-8">
                            Define tu presupuesto inicial para comenzar a
                            organizar tus finanzas.
                        </p>

                        <input
                            type="number"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            placeholder="0 €"
                            className="w-full max-w-xs border-2 border-gray-300 rounded-xl p-4 text-center text-2xl text-gray-800 focus:outline-none focus:border-indigo-500 shadow-sm mb-6"
                        />

                        <PrimaryButton
                            disabled={!monto}
                            onClick={handleSave}
                            className="!text-lg !py-4 !px-8"
                        >
                            Continuar
                        </PrimaryButton>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
