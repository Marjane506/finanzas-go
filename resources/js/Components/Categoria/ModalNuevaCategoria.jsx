import { useState } from "react";
import Modal from "@/Components/Modal";

export default function ModalNuevaCategoria({ open, onClose, onSave }) {
    const [form, setForm] = useState({
        name: "",
        tipo: "gasto", // ← NECESARIO
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        setForm({ name: "", tipo: "gasto" }); // reset
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Crear nueva categoría
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

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Tipo
                        </label>

                        <select
                            value={form.tipo}
                            onChange={(e) =>
                                setForm({ ...form, tipo: e.target.value })
                            }
                            className="w-full border-gray-300 rounded-lg"
                        >
                            <option value="gasto">Gasto</option>
                            <option value="ingreso">Ingreso</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                            onClick={onClose}
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
