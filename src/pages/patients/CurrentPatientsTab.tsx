import { useEffect, useMemo, useState } from "react";
import { usePatientContext } from "../../hooks/usePatientContext";
import { PatientSearchBar } from "./PatientSearchBar";
import { PatientsTable } from "./PatientsTable";
import { filterPatients } from "./utils";

export const CurrentPatientsTab = () => {
    const { patients, isLoading, hasLoaded, refreshPatients } =
        usePatientContext();
    useEffect(() => {
        if (!hasLoaded && !isLoading) {
            refreshPatients();
        }
    }, [hasLoaded, isLoading, refreshPatients]);
    const currentPatients = useMemo(
        () => patients.filter((patient) => patient.status === "current"),
        [patients]
    );
    const [query, setQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPatients = useMemo(
        () => filterPatients(currentPatients, searchTerm),
        [currentPatients, searchTerm]
    );

    const handleSearch = () => {
        setSearchTerm(query.trim());
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
                        Current
                    </p>
                    <h2 className="text-xl font-semibold text-cp365-textMain">
                        Active care plans
                    </h2>
                </div>
                <PatientSearchBar
                    query={query}
                    onQueryChange={setQuery}
                    onSearch={handleSearch}
                />
            </div>

            {isLoading && !patients.length ? (
                <div className="rounded-2xl border border-dashed border-cp365-border bg-cp365-bg/40 px-6 py-12 text-center text-sm text-cp365-textMuted">
                    Loading patients…
                </div>
            ) : filteredPatients.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-cp365-border bg-cp365-bg/40 px-6 py-12 text-center text-sm text-cp365-textMuted">
                    No current patients to display.
                </div>
            ) : (
                <PatientsTable patients={filteredPatients} />
            )}
        </div>
    );
};
