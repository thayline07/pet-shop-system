import { AppointmentForm } from '../components/appointment-form';
import { PeriodSection } from '../components/period-section';
import { Appointment as AppointmentPrisma } from '../generated/prisma';
import {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodDay,
} from '../types/appointments';
import { groupAppointmentsByPeriod } from '@/src/utils/appointment-utils';
import { APPOINTMENT_DATA } from '@/src/utils/mock-data';
import { prisma } from '@/lib/prisma';
import { Button } from '@/src/components/ui/button';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { DatePicker } from '../components/date-picker';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;

  const selectedDate = date ? parseISO(date) : new Date();

  let appointments: AppointmentPrisma[] = [];
  
  // Only fetch from database if DATABASE_URL is available
  if (process.env.DATABASE_URL) {
    try {
      appointments = await prisma.appointment.findMany({
        where: {
          scheduledAt: {
            gte: startOfDay(selectedDate),
            lte: endOfDay(selectedDate),
          },
        },
        orderBy: {
          scheduledAt: 'asc',
        },
      });
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      appointments = [];
    }
  }

  const period = groupAppointmentsByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua Agenda
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <DatePicker />
        </div>
      </div>

      <div className="mt-3 mb-8 md:hidden">
        <DatePicker />
      </div>

      <div className="pb-24 md:pb-0">
        {period.map((period, index) => (
          <PeriodSection period={period} key={index} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-[#23242C] py-[18px] px6 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm>
          <Button variant="brand">Novo Agendamento</Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
