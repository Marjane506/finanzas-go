import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function ModalEditarSubcategoria({
    open,
    subcategoria,
    onClose,
}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (subcategoria) {
            setName(subcategoria.name);
            setError("");
        }
    }, [subcategoria]);

    //Solo letras, acentos, ñ y espacios
    const handleNameChange = (e) => {
        const value = e.target.value;

        const regexInvalid = /[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g;

        if (regexInvalid.test(value)) {
            setError("Solo se permiten letras y espacios.");
        } else {
            setError("");
        }

        // Elimina caracteres no permitidos
        const cleaned = value.replace(regexInvalid, "");

        setName(cleaned);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subcategoria) return;

        router.put(
            `/subcategorias/${subcategoria.id}`,
            { name },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["sub"] });
                    onClose();
                },
            }
        );
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Editar subcategoría
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            className="w-full border rounded-lg px-3 py-2"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />

                        {error && (
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        )}
                    </div>

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
