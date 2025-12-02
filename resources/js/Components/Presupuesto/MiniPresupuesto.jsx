export default function MiniPresupuesto({ presupuestoActual }) {
    if (!presupuestoActual) return null;

    const monto = presupuestoActual.monto_inicial;
    const saldo = presupuestoActual.saldo_final;

    const porcentaje = (saldo / monto) * 100;

    return (
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">
                    Presupuesto del mes
                </span>
                <span className="text-indigo-600 font-bold">{saldo} €</span>
            </div>

            {/* Barra */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div
                    className={`h-full transition-all duration-500 ${
                        porcentaje < 30
                            ? "bg-red-500"
                            : porcentaje < 60
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }`}
                    style={{ width: `${porcentaje}%` }}
                />
            </div>

            <p className="text-gray-500 text-sm mt-2 text-right">
                {porcentaje.toFixed(0)}% disponible
            </p>
        </div>
    );
}
