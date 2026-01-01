import type { ReactNode } from "react";
import type { Patient } from "../../types/patient";

interface PatientsTableProps {
    patients: Patient[];
    renderActions?: (patient: Patient) => ReactNode;
}

export const PatientsTable = ({
    patients,
    renderActions,
}: PatientsTableProps) => {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[680px] overflow-hidden rounded-2xl border border-cp365-border bg-white shadow-sm">
                <table className="w-full border-collapse text-sm text-cp365-textMain">
                    <thead className="bg-cp365-bg text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-cp365-textMuted">
                        <tr>
                            <th className="px-6 py-3">First Name Initial</th>
                            <th className="px-6 py-3">Last Name Initial</th>
                            <th className="px-6 py-3">Suburb</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Gender</th>
                            <th className="px-6 py-3">Provider</th>
                            {renderActions && (
                                <th className="px-6 py-3 text-right">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr
                                key={patient.id}
                                className="border-t border-cp365-border/70 bg-white text-sm text-cp365-textMain transition hover:bg-cp365-bg/60"
                            >
                                <td className="px-6 py-4 font-semibold">
                                    {patient.firstName}
                                </td>
                                <td className="px-6 py-4 font-semibold">
                                    {patient.lastName}
                                </td>
                                {/* @ts-expect-error location */}
                                <td className="px-6 py-4">{patient.city}</td>
                                {/* @ts-expect-error email */}
                                <td className="px-6 py-4">{patient.email}</td>
                                {/* @ts-expect-error sex */}
                                <td className="px-6 py-4">{patient.sex}</td>
                                <td className="px-6 py-4">
                                    {patient.providerName}
                                </td>
                                {renderActions && (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            {renderActions(patient)}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
