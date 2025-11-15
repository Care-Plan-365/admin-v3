import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { CurrentPatientsTab } from './CurrentPatientsTab';
import { NewPatientsTab } from './NewPatientsTab';
import { RejectedPatientsTab } from './RejectedPatientsTab';

type PatientTab = 'current' | 'new' | 'rejected';

export const PatientsPage = () => {
  const [activeTab, setActiveTab] = useState<PatientTab>('current');
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={handleBack}>
          Back
        </Button>
        <div className="h-px flex-1 bg-cp365-border" />
      </div>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
          Care navigation
        </p>
        <h1 className="text-3xl font-semibold text-cp365-textMain">Patients</h1>
        <p className="text-sm text-cp365-textMuted">
          Monitor current patients, review new submissions, and keep rejected applications on file.
        </p>
      </header>

      <Card className="bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
              Patients
            </p>
            <h2 className="text-2xl font-semibold text-cp365-textMain">Patient management</h2>
          </div>
          <span className="text-sm text-cp365-textMuted">
            Updated • {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="mt-6">
          <Tabs
            tabs={[
              { id: 'current', label: 'Current' },
              { id: 'new', label: 'New' },
              { id: 'rejected', label: 'Rejected' },
            ]}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId as PatientTab)}
          />
        </div>

        <div className="pt-6">
          {activeTab === 'current' && <CurrentPatientsTab />}
          {activeTab === 'new' && <NewPatientsTab />}
          {activeTab === 'rejected' && <RejectedPatientsTab />}
        </div>
      </Card>
    </section>
  );
};
