import { useState } from "react";
import { router } from "@inertiajs/react";

import { Pencil, Trash2 } from "lucide-react";

import ModalMovimiento from "../Movimiento/ModalMovimiento";
import ModalEditarMovimiento from "../Movimiento/ModalEditarMovimiento";
import ModalEliminarMovimiento from "../Movimiento/ModalEliminarMovimiento";

import ModalEditarSubcategoria from "./ModalEditarSubcategoria";
import ModalEliminarSubcategoria from "./ModalEliminarSubcategoria";

export default function PanelSubcategoriaDetalle({ sub }) {
    // Añadir movimiento
    const [openMovimiento, setOpenMovimiento] = useState(false);

    // Editar movimiento
    const [openEditarMov, setOpenEditarMov] = useState(false);
    const [movEditar, setMovEditar] = useState(null);

    // Eliminar movimiento
    const [modalEliminarMov, setModalEliminarMov] = useState(false);
    const [movAEliminar, setMovAEliminar] = useState(null);

    // Editar / Eliminar subcategoría
    const [openEditarSub, setOpenEditarSub] = useState(false);
    const [openEliminarSub, setOpenEliminarSub] = useState(false);

    const abrirEditarMovimiento = (mov) => {
        setMovEditar(mov);
        setOpenEditarMov(true);
    };

    const solicitarEliminarMovimiento = (mov) => {
        setMovAEliminar(mov);
        setModalEliminarMov(true);
    };

    const eliminarMovimiento = () => {
        router.delete(`/movimientos/${movAEliminar.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ["sub"] });
                setModalEliminarMov(false);
                setMovAEliminar(null);
            },
        });
    };

    // Cálculo de movimientos
    const gastos = sub.movimientos?.filter((m) => m.tipo === "gasto") || [];
    const ingresos = sub.movimientos?.filter((m) => m.tipo === "ingreso") || [];

    const totalGastos = gastos.reduce((sum, m) => sum + Number(m.cantidad), 0);
    const totalIngresos = ingresos.reduce(
        (sum, m) => sum + Number(m.cantidad),
        0
    );
    const balance = totalIngresos - totalGastos;

    return (
        <div className="bg-white rounded-xl shadow p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{sub.name}</h2>

                <div className="flex gap-3">
                    {/* Editar subcategoría */}
                    <button
                        onClick={() => setOpenEditarSub(true)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar subcategoría"
                    >
                        <Pencil size={20} />
                    </button>

                    {/* Eliminar subcategoría */}
                    <button
                        onClick={() => setOpenEliminarSub(true)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar subcategoría"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {/* Balance */}
            <div className="p-4 bg-gray-50 rounded-lg border mb-6">
                <p className="text-sm text-gray-500">Balance</p>
                <p
                    className={`text-3xl font-bold ${
                        balance >= 0 ? "text-green-700" : "text-red-700"
                    }`}
                >
                    {balance.toFixed(2)} €
                </p>
            </div>

            {/* INGRESOS */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Ingresos (+{totalIngresos.toFixed(2)} €)
                </h3>

                {ingresos.length ? (
                    ingresos.map((mov) => (
                        <div
                            key={mov.id}
                            className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg mb-2"
                        >
                            <span className="text-green-700 font-medium">
                                +{Number(mov.cantidad).toFixed(2)} €
                            </span>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm">
                                    {new Date(
                                        mov.created_at
                                    ).toLocaleDateString()}
                                </span>

                                {/* Eliminar ingreso */}
                                <button
                                    onClick={() =>
                                        solicitarEliminarMovimiento(mov)
                                    }
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">Sin ingresos.</p>
                )}
            </div>

            {/* GASTOS */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                    Gastos (-{totalGastos.toFixed(2)} €)
                </h3>

                {gastos.length ? (
                    gastos.map((mov) => (
                        <div
                            key={mov.id}
                            className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg mb-2"
                        >
                            <span className="text-red-700 font-medium">
                                -{Number(mov.cantidad).toFixed(2)} €
                            </span>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm">
                                    {new Date(
                                        mov.created_at
                                    ).toLocaleDateString()}
                                </span>

                                {/* Editar gasto */}
                                <button
                                    onClick={() => abrirEditarMovimiento(mov)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Pencil size={18} />
                                </button>

                                {/* Eliminar gasto */}
                                <button
                                    onClick={() =>
                                        solicitarEliminarMovimiento(mov)
                                    }
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">Sin gastos.</p>
                )}
            </div>

            {/* Botón añadir */}
            <button
                onClick={() => setOpenMovimiento(true)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
                Añadir movimiento
            </button>

            {/* MODALES */}
            <ModalMovimiento
                open={openMovimiento}
                onClose={() => setOpenMovimiento(false)}
                subcategoriaId={sub.id}
            />

            <ModalEditarMovimiento
                open={openEditarMov}
                onClose={() => setOpenEditarMov(false)}
                movimiento={movEditar}
            />

            <ModalEliminarMovimiento
                open={modalEliminarMov}
                onClose={() => setModalEliminarMov(false)}
                movimiento={movAEliminar}
                onConfirm={eliminarMovimiento}
            />

            <ModalEditarSubcategoria
                open={openEditarSub}
                subcategoria={sub}
                onClose={() => setOpenEditarSub(false)}
            />

            <ModalEliminarSubcategoria
                open={openEliminarSub}
                subcategoria={sub}
                onClose={() => setOpenEliminarSub(false)}
                onConfirm={() =>
                    router.delete(`/subcategorias/${sub.id}`, {
                        onSuccess: () => router.visit("/categorias"),
                    })
                }
            />
        </div>
    );
}
