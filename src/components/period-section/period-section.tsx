import { AppointmentPeriod } from '@/src/types/appointments';
import { Cloudy, Moon, Sun } from 'lucide-react';
import { AppointmentCard } from '../appointment-card';

type PeriodSectionProps = {
  period: AppointmentPeriod;
};

const periodIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <Cloudy className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
};

export const PeriodSection = ({ period }: PeriodSectionProps) => {
  return (
    <section className="mb-8 bg-background-tertiary rounded-xl">
      <div className="flex items-center px-5 py-3 justify-between">
        <div className="flex items-center gap-2">
          {periodIcons[period?.type]}

          <h2 className="text-label-large-size text-content-primary">
            {period.title}
          </h2>
        </div>
        <span className="text-label-large-size text-content-secondary">
          {period.timeRange}
        </span>
      </div>

      {period.appointments.length > 0 ? (
        <div className="px-5">
          <div>
            {period.appointments.map((appointment, index) => (
              <AppointmentCard
                appointment={appointment}
                key={index}
                isFirstInSection={index === 0}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-paragraph-small-size text-content-secondary p-5">
          Nenhum agendamento para este período.
        </p>
      )}
    </section>
  );
};
