import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-3 pt-3 pb-1 text-lg font-semibold transition duration-150 ease-in-out " +
                (active
                    ? "border-b-4 border-indigo-600 text-gray-900"
                    : "border-b-4 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300") +
                " " +
                className
            }
        >
            {children}
        </Link>
    );
}
