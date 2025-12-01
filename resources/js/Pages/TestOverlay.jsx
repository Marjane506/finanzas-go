import BudgetOverlay from "../Components/BudgetOverlay";
export default function TestOverlay() {
    const fakeUser = { id: 1, name: "Test User" };

    return (
        <div className="min-h-screen bg-gray-100">
            <BudgetOverlay user={fakeUser} />
        </div>
    );
}
