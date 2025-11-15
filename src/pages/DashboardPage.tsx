import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";

const dashboardCards = [
    {
        id: "providers",
        title: "Providers",
        description: "Manage onboarding, approval, and assignments.",
        to: "/providers",
        status: "Session in progress",
        interactive: true,
    },
    {
        id: "practices",
        title: "Practices",
        description: "Practice setup and credentialing.",
        to: "/practices",
        interactive: true,
    },
    {
        id: "patients",
        title: "Patients",
        description: "Patient engagement and care plans.",
        interactive: false,
    },
    {
        id: "financials",
        title: "Financials",
        description: "Billing and Medicare reconciliation.",
        interactive: false,
    },
];

export const DashboardPage = () => (
    <section className="space-y-6">
        <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
                Overview
            </p>
            <h1 className="text-3xl font-semibold text-cp365-textMain">
                Dashboard
            </h1>
            <p className="text-sm text-cp365-textMuted">
                Monitor provider onboarding, practice readiness, patient
                engagement, and financial health.
            </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
            {dashboardCards.map((card) => {
                const content = (
                    <Card
                        key={card.id}
                        className={`flex flex-col justify-between rounded-2xl p-6 transition hover:shadow-soft ${
                            card.interactive
                                ? "cursor-pointer hover:-translate-y-0.5"
                                : "opacity-70"
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cp365-primary/15 text-cp365-primary">
                                {card.title.slice(0, 1)}
                            </div>
                            {card.status && <Pill>{card.status}</Pill>}
                        </div>
                        <div className="mt-6 space-y-2">
                            <h2 className="text-xl font-semibold text-cp365-textMain">
                                {card.title}
                            </h2>
                            <p className="text-sm text-cp365-textMuted">
                                {card.description}
                            </p>
                        </div>
                        <div className="mt-8 flex items-center justify-between text-sm font-semibold text-cp365-primary">
                            {card.interactive ? "Manage" : "Coming soon"}
                            <span className="text-lg">&rarr;</span>
                        </div>
                    </Card>
                );

                return card.interactive && card.to ? (
                    <Link key={card.id} to={card.to} className="block">
                        {content}
                    </Link>
                ) : (
                    content
                );
            })}
        </div>
    </section>
);
