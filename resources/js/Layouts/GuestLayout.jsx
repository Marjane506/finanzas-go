import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div
            className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 bg-cover
            bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/img/peter-rovder.jpg')" }}
        >
            <div className="self-start ml-20 mt-4">
                <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                    FinanzasGo
                </h1>
            </div>
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
            <footer className="p-6 text-center text-white text-sm opacity-70">
                © {new Date().getFullYear()} FinanzasGo
            </footer>
        </div>
    );
}
