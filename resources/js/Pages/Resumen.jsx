import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Resumen({
    mes,
    anio,
    totalIngresos,
    totalGastos,
    balance,
    gastosPorCategoria,
    gastosPorDia,
}) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Resumen del mes</h1>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500">Ingresos</p>
                        <p className="text-3xl text-green-600 font-bold">
                            {totalIngresos} €
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500">Gastos</p>
                        <p className="text-3xl text-red-600 font-bold">
                            {totalGastos} €
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500">Balance</p>
                        <p
                            className={`text-3xl font-bold ${
                                balance >= 0 ? "text-green-700" : "text-red-700"
                            }`}
                        >
                            {balance} €
                        </p>
                    </div>
                </div>

                {/* Aquí pondremos los gráficos */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Gastos por categoría
                        </h2>

                        <pre>{JSON.stringify(gastosPorCategoria, null, 2)}</pre>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Gastos por día
                        </h2>

                        <pre>{JSON.stringify(gastosPorDia, null, 2)}</pre>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
