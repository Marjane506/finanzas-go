import { useState } from "react";
import { router } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoriaItem from "../Components/Categoria/CategoriaItem";
import ModalNuevaCategoria from "../Components/Categoria/ModalNuevaCategoria";
import ModalSubcategoria from "../Components/Subcategoria/ModalSubcategoria";
import ModalEditarCategoria from "../Components/Categoria/ModalEditarCategoria";
import PanelSubcategoriaDetalle from "../Components/Subcategoria/PanelSubcategoriaDetalle";
import MiniPresupuesto from "../Components/Presupuesto/MiniPresupuesto";
import { usePage } from "@inertiajs/react";
import BudgetOverlay from "@/Components/BudgetOverlay";

export default function Categorias({ categorias, presupuestoActual }) {
    const page = usePage().props;

    if (!presupuestoActual) {
        return (
            <AuthenticatedLayout>
                <BudgetOverlay user={page.auth.user} />
            </AuthenticatedLayout>
        );
    }

    const [expanded, setExpanded] = useState(
        categorias.reduce((acc, cat) => {
            acc[cat.id] = true;
            return acc;
        }, {})
    );

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [modalCat, setModalCat] = useState(false);
    const [subSeleccionada, setSubSeleccionada] = useState(null);

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

    const deleteSubcategoria = (id) => {
        if (confirm("¿Eliminar esta subcategoría?")) {
            router.delete(`/subcategorias/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6">
                <MiniPresupuesto presupuestoActual={presupuestoActual} />
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
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

                            {categorias.map((cat) => (
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
                                    onDeleteSub={deleteSubcategoria}
                                    onSelectSub={(sub) =>
                                        setSubSeleccionada(sub)
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1">
                        {subSeleccionada && (
                            <PanelSubcategoriaDetalle sub={subSeleccionada} />
                        )}
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
                        onClose={() =>
                            setModalSub({ open: false, parentId: null })
                        }
                        onSave={addSubcategoria}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
