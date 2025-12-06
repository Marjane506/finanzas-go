import SeleccionMes from "@/Components/Resumen/SeleccionMes";
import GraficoCategorias from "@/Components/Resumen/GraficoCategorias";
import GraficoGastosDia from "@/Components/Resumen/GraficoGastoDia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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
            <div className="p-6 max-w-7xl mx-auto">
                <SeleccionMes mesActual={mes} anioActual={anio} />

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Resumen del Mes
                </h1>

                {/* === TARJETAS DE TOTALES RESPONSIVE === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 bg-white shadow rounded-xl">
                        <p className="text-gray-500">Ingresos</p>
                        <p className="text-2xl font-bold text-green-600">
                            {totalIngresos} €
                        </p>
                    </div>

                    <div className="p-4 bg-white shadow rounded-xl">
                        <p className="text-gray-500">Gastos</p>
                        <p className="text-2xl font-bold text-red-600">
                            {totalGastos} €
                        </p>
                    </div>

                    <div className="p-4 bg-white shadow rounded-xl">
                        <p className="text-gray-500">Balance</p>
                        <p
                            className={`text-2xl font-bold ${
                                balance >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {balance} €
                        </p>
                    </div>
                </div>

                {/* === GRÁFICOS RESPONSIVE === */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Gastos por categoría
                        </h2>
                        <GraficoCategorias data={gastosPorCategoria} />
                    </div>

                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Gastos por día
                        </h2>
                        <GraficoGastosDia
                            data={gastosPorDia}
                            mesActual={mes}
                            anioActual={anio}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
