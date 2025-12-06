import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function GraficoGastosDia({ data, mesActual, anioActual }) {
    const totalDias = new Date(anioActual, mesActual, 0).getDate();

    const dias = Array.from({ length: totalDias }, (_, i) =>
        String(i + 1).padStart(2, "0")
    );

    const valores = dias.map((dia) => data[dia] ?? 0);

    const chartData = {
        labels: dias,
        datasets: [
            {
                label: "Gastos (€)",
                data: valores,
                backgroundColor: "#ef4444",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full h-72 relative">
            <Bar data={chartData} options={options} />
        </div>
    );
}
