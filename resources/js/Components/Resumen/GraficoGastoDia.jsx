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

export default function GraficoGastosDia({ data }) {
    const dias = Object.keys(data);
    const valores = Object.values(data);

    if (dias.length === 0) {
        return <p className="text-gray-500">No hay gastos este mes.</p>;
    }

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
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="w-full h-72">
            <Bar data={chartData} options={options} />
        </div>
    );
}
