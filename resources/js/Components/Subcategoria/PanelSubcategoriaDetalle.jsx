export default function PanelSubcategoriaDetalle({ sub }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            {/* TÍTULO */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{sub.name}</h2>

                <button className="text-indigo-600 hover:text-indigo-800">
                    Editar
                </button>
            </div>

            {/* INFORMACIÓN BÁSICA */}
            <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-500">Asignado este mes</p>
                    <p className="text-2xl font-bold text-gray-800">0 €</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-500">Gastado</p>
                    <p className="text-2xl font-bold text-gray-800">0 €</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-500">Restante</p>
                    <p className="text-2xl font-bold text-gray-800">0 €</p>
                </div>
            </div>

            {/* ACCIONES */}
            <div className="mt-6 flex gap-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Asignar
                </button>

                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                    Añadir gasto
                </button>
            </div>
        </div>
    );
}
