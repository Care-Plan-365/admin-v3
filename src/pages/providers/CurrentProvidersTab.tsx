import { useMemo, useState } from "react";
import { Table } from "../../components/ui/Table";
import { useProviderContext } from "../../hooks/useProviderContext";

export const CurrentProvidersTab = () => {
    const { providers, isLoading } = useProviderContext();
    const [query, setQuery] = useState("");

    const currentProviders = useMemo(
        () => providers.filter((provider) => provider.status === "approved"),
        [providers]
    );

    const filteredProviders = currentProviders.filter((provider) => {
        if (!query.trim()) {
            return true;
        }
        const searchString = [
            provider.firstName,
            provider.lastName,
            provider.ahpraNumber,
            provider.providerType,
            provider.practice,
            provider.medicareLocationId,
            provider.minorId,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchString.includes(query.trim().toLowerCase());
    });

    if (isLoading && !providers.length) {
        return (
            <div className="rounded-2xl border border-dashed border-cp365-border bg-white px-8 py-12 text-center text-sm text-cp365-textMuted">
                Loading providers…
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
                        Current Providers
                    </p>
                    <h2 className="text-xl font-semibold text-cp365-textMain">
                        Active roster
                    </h2>
                </div>
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search providers…"
                    className="w-full rounded-2xl border border-cp365-border bg-white px-4 py-2 text-sm text-cp365-textMain focus:outline-none focus:ring-2 focus:ring-cp365-primary md:w-64"
                />
            </div>

            <Table>
                <thead className="bg-cp365-bg text-left text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
                    <tr>
                        <th className="px-6 py-4">First Name</th>
                        <th className="px-6 py-4">Last Name</th>
                        <th className="px-6 py-4">AHPRA Number</th>
                        <th className="px-6 py-4">Provider Type</th>
                        <th className="px-6 py-4">Practice</th>
                        <th className="px-6 py-4">
                            Medicare Location / Minor ID
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProviders.map((provider) => (
                        <tr
                            key={provider.id}
                            className="border-t border-cp365-border/80 hover:bg-slate-50 transition"
                        >
                            <td className="px-6 py-4 text-sm font-medium text-cp365-textMain">
                                {provider.firstName}
                            </td>
                            <td className="px-6 py-4 text-sm text-cp365-textMain">
                                {provider.lastName}
                            </td>
                            <td className="px-6 py-4 text-sm text-cp365-textMain">
                                {provider.ahpraNumber ?? "—"}
                            </td>
                            <td className="px-6 py-4 text-sm text-cp365-textMain">
                                {provider.providerType}
                            </td>
                            <td className="px-6 py-4 text-sm text-cp365-textMain">
                                {provider.practice ?? "—"}
                            </td>
                            <td className="px-6 py-4 text-sm text-cp365-textMain">
                                <div className="flex flex-col text-xs text-cp365-textMuted">
                                    <span>
                                        Medicare:{" "}
                                        {provider.medicareLocationId ?? "—"}
                                    </span>
                                    <span>
                                        Minor: {provider.minorId ?? "—"}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredProviders.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-6 py-10 text-center text-sm text-cp365-textMuted"
                            >
                                No providers match your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};
