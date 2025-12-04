import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoriaItem from "../Components/Categoria/CategoriaItem";
import ModalNuevaCategoria from "../Components/Categoria/ModalNuevaCategoria";
import ModalSubcategoria from "../Components/Subcategoria/ModalNuevaSubcategoria";
import ModalEditarCategoria from "../Components/Categoria/ModalEditarCategoria";
import PanelSubcategoriaDetalle from "../Components/Subcategoria/PanelSubcategoriaDetalle";
import MiniPresupuesto from "../Components/Presupuesto/MiniPresupuesto";

export default function Categorias({ gastos, ingresos, presupuestoActual }) {
    const [expanded, setExpanded] = useState({});
    const { props } = usePage();
    const subSeleccionada = props.sub;

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [modalCat, setModalCat] = useState(false);
    const [editModal, setEditModal] = useState({
        open: false,
        categoria: null,
    });
    const [modalSub, setModalSub] = useState({
        open: false,
        parentId: null,
    });

    const addCategoria = (data) => {
        router.post("/categorias", data, {
            onSuccess: () => setModalCat(false),
        });
    };

    const updateCategoria = (id, data) => {
        router.put(`/categorias/${id}`, data, {
            onSuccess: () => setEditModal({ open: false, categoria: null }),
        });
    };

    const deleteCategoria = (id) => {
        if (confirm("¿Eliminar esta categoría?")) {
            router.delete(`/categorias/${id}`);
        }
    };

    const addSubcategoria = (parentId, data) => {
        router.post(
            "/subcategorias",
            { ...data, categoria_id: parentId },
            {
                onSuccess: () => {
                    setExpanded((prev) => ({
                        ...prev,
                        [parentId]: true,
                    }));
                    setModalSub({ open: false, parentId: null });
                },
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <div className="w-full p-6">
                <div className="grid grid-cols-12 gap-6 w-full">
                    <div className="col-span-3">
                        <MiniPresupuesto
                            presupuestoActual={presupuestoActual}
                        />
                    </div>

                    <div className="col-span-6">
                        <div className="bg-white p-6 rounded-xl shadow w-full">
                            <div className="flex justify-between items-center mb-4 border-b pb-3">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Categorías
                                </h1>

                                <button
                                    className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
                                    onClick={() => setModalCat(true)}
                                >
                                    <PlusCircle size={22} />
                                    Nueva categoría
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-gray-700 mb-2">
                                Gastos
                            </h2>

                            {gastos.map((cat) => (
                                <CategoriaItem
                                    key={cat.id}
                                    categoria={{
                                        ...cat,
                                        expanded: expanded[cat.id],
                                    }}
                                    onToggleExpand={toggleExpand}
                                    onAddSub={(id) =>
                                        setModalSub({
                                            open: true,
                                            parentId: id,
                                        })
                                    }
                                    onEdit={(categoria) =>
                                        setEditModal({ open: true, categoria })
                                    }
                                    onDelete={deleteCategoria}
                                    onSelectSub={(sub) =>
                                        router.get(
                                            `/categorias?sub=${sub.id}`,
                                            {},
                                            { preserveState: true }
                                        )
                                    }
                                />
                            ))}

                            <h2 className="text-xl font-bold text-gray-700 mt-6 mb-2">
                                Ingresos
                            </h2>

                            {ingresos.map((cat) => (
                                <CategoriaItem
                                    key={cat.id}
                                    categoria={{
                                        ...cat,
                                        expanded: expanded[cat.id],
                                    }}
                                    onToggleExpand={toggleExpand}
                                    onAddSub={(id) =>
                                        setModalSub({
                                            open: true,
                                            parentId: id,
                                        })
                                    }
                                    onEdit={(categoria) =>
                                        setEditModal({ open: true, categoria })
                                    }
                                    onDelete={deleteCategoria}
                                    onSelectSub={(sub) =>
                                        router.get(
                                            `/categorias?sub=${sub.id}`,
                                            {},
                                            { preserveState: true }
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-span-3">
                        {subSeleccionada && (
                            <PanelSubcategoriaDetalle sub={subSeleccionada} />
                        )}
                    </div>
                </div>

                <ModalNuevaCategoria
                    open={modalCat}
                    onClose={() => setModalCat(false)}
                    onSave={addCategoria}
                />

                <ModalEditarCategoria
                    open={editModal.open}
                    categoria={editModal.categoria}
                    onClose={() =>
                        setEditModal({ open: false, categoria: null })
                    }
                    onSave={(data) =>
                        updateCategoria(editModal.categoria.id, {
                            name: data.name,
                        })
                    }
                />

                <ModalSubcategoria
                    open={modalSub.open}
                    parentId={modalSub.parentId}
                    onClose={() => setModalSub({ open: false, parentId: null })}
                    onSave={addSubcategoria}
                />
            </div>
        </AuthenticatedLayout>
    );
}
