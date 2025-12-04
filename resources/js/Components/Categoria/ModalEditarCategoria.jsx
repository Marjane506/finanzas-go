import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function ModalEditarSubcategoria({
    open,
    onClose,
    subcategoria,
}) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (subcategoria) {
            setName(subcategoria.name);
        }
    }, [subcategoria]);

    const submit = () => {
        router.put(
            `/subcategorias/${subcategoria.id}`,
            { name },
            {
                preserveScroll: true,
                onSuccess: onClose,
            }
        );
    };

    if (!open) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Editar subcategoría</h2>

                <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={submit}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
