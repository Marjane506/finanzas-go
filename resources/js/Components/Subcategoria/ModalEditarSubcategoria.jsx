import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";

export default function ModalEditarSubcategoria({
    open,
    subcategoria,
    onClose,
    onSave,
}) {
    const [form, setForm] = useState({
        name: "",
        type: "gasto",
        value: "",
        date: "",
    });

    useEffect(() => {
        if (subcategoria) {
            setForm({
                name: subcategoria.name || "",
                type: subcategoria.type || "gasto",
                value: subcategoria.value || "",
                date: subcategoria.date || "",
            });
        }
    }, [subcategoria]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Editar subcategoría
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre */}
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

                    {/* Tipo */}
                    <select
                        className="w-full border rounded-lg px-3 py-2"
                        value={form.type}
                        onChange={(e) =>
                            setForm({ ...form, type: e.target.value })
                        }
                    >
                        <option value="gasto">Gasto</option>
                        <option value="ingreso">Ingreso</option>
                    </select>

                    {/* Valor */}
                    <input
                        type="number"
                        step="0.01"
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Valor"
                        value={form.value}
                        onChange={(e) =>
                            setForm({ ...form, value: e.target.value })
                        }
                    />

                    {/* Fecha */}
                    <input
                        type="date"
                        className="w-full border rounded-lg px-3 py-2"
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                        required
                    />

                    {/* Botones */}
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
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
