import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export default function SeleccionMes({ mesActual, anioActual }) {
    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const cambiarMes = (nuevoMes, nuevoAnio) => {
        router.get(
            "/resumen",
            { mes: nuevoMes, anio: nuevoAnio },
            { preserveState: true }
        );
    };

    const siguienteMes = () => {
        let mes = mesActual + 1;
        let anio = anioActual;

        if (mes > 12) {
            mes = 1;
            anio++;
        }

        cambiarMes(mes, anio);
    };

    const anteriorMes = () => {
        let mes = mesActual - 1;
        let anio = anioActual;

        if (mes < 1) {
            mes = 12;
            anio--;
        }

        cambiarMes(mes, anio);
    };

    return (
        <div className="flex items-center justify-center gap-4 mb-6 select-none">
            {/* Botón Mes Anterior */}
            <button
                onClick={anteriorMes}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
                <ChevronLeft size={20} className="text-gray-700" />
            </button>

            {/* Texto del Mes */}
            <div className="flex items-center gap-2">
                <Calendar size={20} className="text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                    {meses[mesActual - 1]} {anioActual}
                </h2>
            </div>

            {/* Botón Mes Siguiente */}
            <button
                onClick={siguienteMes}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
                <ChevronRight size={20} className="text-gray-700" />
            </button>
        </div>
    );
}
