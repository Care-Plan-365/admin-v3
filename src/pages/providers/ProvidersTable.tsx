import type { ReactNode } from "react";
import { Table } from "../../components/ui/Table";
import type { Provider } from "../../types/provider";

type ProviderLike = Provider & Record<string, unknown>;

const getString = (value: unknown): string | undefined => {
    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed ? trimmed : undefined;
    }
    return undefined;
};

const getAHPRA = (provider: ProviderLike): string => {
    return getString(provider.ahpraNumber) ?? getString(provider.phone) ?? "—";
};

const getPractice = (provider: ProviderLike): string => {
    return getString(provider.practice) ?? getString(provider.location) ?? "—";
};

interface ProvidersTableProps {
    providers: Provider[];
    includePractice?: boolean;
    includeMedicareMinor?: boolean;
    renderActions?: (provider: Provider) => ReactNode;
}

export const ProvidersTable = ({
    providers,
    includePractice = false,
    includeMedicareMinor = false,
    renderActions,
}: ProvidersTableProps) => {
    const hasActions = typeof renderActions === "function";

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[720px]">
                <Table>
                    <thead className="bg-cp365-bg text-left text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
                        <tr>
                            <th className="px-6 py-4">First Name</th>
                            <th className="px-6 py-4">Last Name</th>
                            <th className="px-6 py-4">AHPRA Number</th>
                            <th className="px-6 py-4">Email</th>
                            {includePractice && (
                                <th className="px-6 py-4">Practice</th>
                            )}
                            {includeMedicareMinor && (
                                <th className="px-6 py-4">
                                    Medicare Location / Minor ID
                                </th>
                            )}
                            {hasActions && (
                                <th className="px-6 py-4 text-right">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map((provider) => {
                            const providerLike = provider as ProviderLike;
                            return (
                                <tr
                                    key={provider.id}
                                    className="border-t border-cp365-border/80 text-sm text-cp365-textMain transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 font-semibold">
                                        {provider.firstName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {provider.lastName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getAHPRA(providerLike)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* @ts-expect-error  EMAIL*/}
                                        {provider.email}
                                    </td>
                                    {includePractice && (
                                        <td className="px-6 py-4">
                                            {getPractice(providerLike)}
                                        </td>
                                    )}
                                    {includeMedicareMinor && (
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-xs text-cp365-textMuted">
                                                <span>
                                                    Medicare:{" "}
                                                    {provider.medicareLocationId ??
                                                        "—"}
                                                </span>
                                                <span>
                                                    Minor:{" "}
                                                    {provider.minorId ?? "—"}
                                                </span>
                                            </div>
                                        </td>
                                    )}
                                    {hasActions && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {renderActions(provider)}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                        {providers.length === 0 && (
                            <tr>
                                <td
                                    colSpan={
                                        4 +
                                        (includePractice ? 1 : 0) +
                                        (includeMedicareMinor ? 1 : 0) +
                                        (hasActions ? 1 : 0)
                                    }
                                    className="px-6 py-10 text-center text-sm text-cp365-textMuted"
                                >
                                    No providers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
