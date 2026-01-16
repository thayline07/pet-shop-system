import {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodDay,
} from '@/src/types/appointments';
import { Appointment as AppointmentPrisma } from '@/src/generated/prisma';

export const getPeriod = (hour: number): AppointmentPeriodDay => {
  if (hour >= 9 && hour < 13) {
    return 'morning';
  } else if (hour >= 13 && hour < 19) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

export function groupAppointmentsByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] {
  const transformedAppointments: Appointment[] =
    appointments?.map((apt) => ({
      id: apt.id,
      tutorName: apt.tutorName,
      petName: apt.petName,
      phone: apt.phone,
      description: apt.description,
      scheduleAt: apt.scheduledAt,
      time: formatDateTime(apt.scheduledAt),
      period: getPeriod(parseInt(formatDateTime(apt.scheduledAt)),
    })) || [];

  const morningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );

  const afternoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );

  const eveningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ];
}

export function calculatePeriod(hour: number) {
  const isMorning = hour >= 9 && hour < 12;
  const isAfternoon = hour >= 13 && hour < 18;
  const isEvening = hour >= 19 && hour < 21;

  return { isMorning, isAfternoon, isEvening };
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  });
}
