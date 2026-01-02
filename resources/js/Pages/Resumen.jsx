import SeleccionMes from "@/Components/Resumen/SeleccionMes";
import { Head } from "@inertiajs/react";
import GraficoCategorias from "@/Components/Resumen/GraficoCategorias";
import GraficoPeriodos from "@/Components/Resumen/GraficoPeriodos";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Resumen({
    mes,
    anio,
    totalIngresos,
    totalGastos,
    balance,
    gastosPorCategoria,
    gastosPorDia,
    gastosPorSemana = [],
    gastosPorMes = [],
    gastosPorAnio = [],
    consejos = [],
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Resumen
                </h2>
            }
        >
            <Head title="Resumen" />
            <div className="p-6 max-w-screen-2xl mx-auto">
                {/* Selector Mes */}
                <SeleccionMes mesActual={mes} anioActual={anio} />

                {/* kPI + Consejos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Ingresos */}
                    <div
                        className="p-4 bg-white shadow rounded-xl border border-gray-200
                      hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
                    >
                        <p className="text-gray-500">Ingresos</p>
                        <p className="text-2xl font-bold text-green-600">
                            {totalIngresos} €
                        </p>
                    </div>

                    {/* Gastos */}
                    <div
                        className="p-4 bg-white shadow rounded-xl border border-gray-200
                      hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
                    >
                        <p className="text-gray-500">Gastos</p>
                        <p className="text-2xl font-bold text-red-600">
                            {totalGastos} €
                        </p>
                    </div>

                    {/* Balance */}
                    <div
                        className="p-4 bg-white shadow rounded-xl border border-gray-200
                      hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
                    >
                        <p className="text-gray-500">Balance</p>
                        <p
                            className={`text-2xl font-bold ${
                                balance >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {balance} €
                        </p>
                    </div>

                    {/* Consejos IA */}
                    <div
                        className="p-4 bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-md rounded-xl border
                     border-indigo-500/30 hover:border-indigo-300"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-indigo-200 text-sm font-semibold tracking-wide">
                                Consejo del mes
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed">
                            {consejos.length > 0
                                ? consejos[0]
                                : "Sin consejos este mes."}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                    <div
                        className="bg-white shadow-sm rounded-xl p-6 border border-gray-300
                    hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
                    >
                        <h2 className="text-lg font-semibold mb-4">
                            Gastos por categoría
                        </h2>
                        <GraficoCategorias data={gastosPorCategoria} />
                    </div>

                    {/* Periodos */}
                    <div
                        className="bg-white shadow-sm rounded-xl p-2 border border-gray-300
                    hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
                    >
                        <GraficoPeriodos
                            periodos={{
                                dia: Object.entries(gastosPorDia).map(
                                    ([dia, valor]) => ({
                                        label: dia,
                                        valor,
                                    })
                                ),
                                semana: gastosPorSemana,
                                mes: gastosPorMes,
                                anio: gastosPorAnio,
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
