import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";

export default function ModalEditarCategoria({
    open,
    categoria,
    onClose,
    onSave,
}) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (categoria) {
            setName(categoria.name);
        }
    }, [categoria]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name });
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Editar categoría</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
