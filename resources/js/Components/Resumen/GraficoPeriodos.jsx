import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend
);

export default function GraficoPeriodos({ periodos }) {
    const [periodo, setPeriodo] = useState("mes");

    const tabs = [
        { key: "dia", label: "Día" },
        { key: "semana", label: "Semana" },
        { key: "mes", label: "Mes" },
        { key: "anio", label: "Año" },
    ];

    const datos = periodos[periodo] || [];

    const chartData = {
        labels: datos.map((d) => d.label),
        datasets: [
            {
                label: "Gastos (€)",
                data: datos.map((d) => d.valor),
                borderColor: "#4F46E5",
                backgroundColor:
                    periodo === "anio" ? "#4F46E5" : "rgba(79,70,229,0.2)",
                tension: 0.4,
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.parsed.y} €`,
                },
            },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    const EsBarra = periodo === "anio";

    return (
        <div className="bg-white shadow rounded-xl p-6">
            <div className="flex gap-4 mb-4 border-b pb-2">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setPeriodo(t.key)}
                        className={`px-3 py-1 rounded-lg font-medium ${
                            periodo === t.key
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="w-full h-72">
                {EsBarra ? (
                    <Bar data={chartData} options={options} />
                ) : (
                    <Line data={chartData} options={options} />
                )}
            </div>
        </div>
    );
}
