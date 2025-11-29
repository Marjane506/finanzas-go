import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";

export default function ModalSubcategoria({ open, parentId, onClose, onSave }) {
    const [form, setForm] = useState({
        name: "",
        type: "gasto",
        value: "",
        date: new Date().toISOString().slice(0, 10),
    });

    // Reset formulario al abrir modal
    useEffect(() => {
        if (open) {
            setForm({
                name: "",
                type: "gasto",
                value: "",
                date: new Date().toISOString().slice(0, 10),
            });
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(parentId, form); // Inertia cierra el modal en Categorias.jsx
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Añadir subcategoría
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        required
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
