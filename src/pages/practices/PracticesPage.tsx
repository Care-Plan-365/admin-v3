import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { usePracticeContext } from "../../hooks/usePracticeContext";

export const PracticesPage = () => {
    const { practices } = usePracticeContext();
    const navigate = useNavigate();
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    return (
        <section className="space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
                        Admin / Practice
                    </p>
                    <h1 className="text-3xl font-semibold text-cp365-textMain">
                        Practice
                    </h1>
                    <p className="text-sm text-cp365-textMuted">
                        List of practice
                    </p>
                </div>
                <Button
                    variant="secondary"
                    onClick={() => navigate("/dashboard")}
                >
                    Go Back
                </Button>
            </header>

            <Card className="rounded-3xl bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
                            Practice Directory
                        </p>
                        <p className="text-sm text-cp365-textMuted">
                            Manage active practices and locations.
                        </p>
                    </div>
                    <Button
                        type="button"
                        onClick={() => setIsInfoModalOpen(true)}
                    >
                        New Practice
                    </Button>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-cp365-border">
                    <table className="w-full border-collapse text-left text-sm text-cp365-textMain">
                        <thead className="bg-cp365-surface text-xs uppercase tracking-wide text-cp365-textMuted">
                            <tr>
                                <th className="px-6 py-3 font-semibold">
                                    Name
                                </th>
                                <th className="px-6 py-3 font-semibold">
                                    Practice Code
                                </th>
                                <th className="px-6 py-3 font-semibold text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {practices.length === 0 && (
                                <tr>
                                    <td
                                        className="px-6 py-6 text-sm text-cp365-textMuted"
                                        colSpan={3}
                                    >
                                        No practices available yet.
                                    </td>
                                </tr>
                            )}
                            {practices.map((practice) => (
                                <tr
                                    key={practice.id}
                                    className="border-t border-cp365-border/70 transition hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-cp365-textMain">
                                            {practice.name}
                                        </div>
                                        <p className="text-xs text-cp365-textMuted">
                                            {practice.city}, {practice.state}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm text-cp365-textMain">
                                        {practice.practiceCode}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={() =>
                                                navigate(
                                                    `/practices/${practice.id}`
                                                )
                                            }
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal
                open={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                title="New Practice"
                description="Practice onboarding from the admin console is coming soon."
                footer={
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => setIsInfoModalOpen(false)}
                    >
                        Got it
                    </Button>
                }
            >
                <p>
                    For now, please contact the implementation team to add new
                    practices. This shortcut will activate when the workflow is
                    ready
                </p>
            </Modal>
        </section>
    );
};
