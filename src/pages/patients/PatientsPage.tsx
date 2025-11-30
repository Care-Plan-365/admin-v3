import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Tabs } from "../../components/ui/Tabs";
import { CurrentPatientsTab } from "./CurrentPatientsTab";
import { NewPatientsTab } from "./NewPatientsTab";
import { RejectedPatientsTab } from "./RejectedPatientsTab";
import { usePatientContext } from "../../hooks/usePatientContext";

type PatientTab = "current" | "new" | "rejected";

export const PatientsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<PatientTab>("current");
    const { refreshPatients, hasLoaded, isLoading, error } =
        usePatientContext();

    useEffect(() => {
        if (!hasLoaded && !isLoading) {
            refreshPatients();
        }
    }, [hasLoaded, isLoading, refreshPatients]);

    return (
        <section className="space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
                        Care navigation
                    </p>
                    <h1 className="text-3xl font-semibold text-cp365-textMain">
                        Patients
                    </h1>
                    <p className="text-sm text-cp365-textMuted">
                        Monitor current patients, review new submissions, and
                        keep rejected applications on file
                    </p>
                </div>
                <Button
                    variant="secondary"
                    onClick={() => navigate("/dashboard")}
                >
                    Go Back
                </Button>
            </header>

            <Card className="bg-white p-6 shadow-sm">
                {error && (
                    <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
                            Patients
                        </p>
                        <h2 className="text-2xl font-semibold text-cp365-textMain">
                            Patient management.
                        </h2>
                    </div>
                    <span className="text-sm text-cp365-textMuted">
                        Updated • {new Date().toLocaleDateString()}
                    </span>
                </div>

                <div className="mt-6">
                    <Tabs
                        tabs={[
                            { id: "current", label: "Current" },
                            { id: "new", label: "New" },
                            { id: "rejected", label: "Rejected" },
                        ]}
                        activeTab={activeTab}
                        onChange={(tabId) => setActiveTab(tabId as PatientTab)}
                    />
                </div>

                <div className="pt-6">
                    {activeTab === "current" && <CurrentPatientsTab />}
                    {activeTab === "new" && <NewPatientsTab />}
                    {activeTab === "rejected" && <RejectedPatientsTab />}
                </div>
            </Card>
        </section>
    );
};
