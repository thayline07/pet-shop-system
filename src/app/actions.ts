'use server';

import {
  calculatePeriod,
  getHourFromDateTime,
} from '@/src/utils/appointment-utils';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const appointmentsSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduledAt: z.coerce.date(),
});

type AppointmentData = z.infer<typeof appointmentsSchema>;

export async function createAppointment(data: any) {
  try {
    const parsedData = appointmentsSchema.parse(data);

    const { scheduledAt } = parsedData;
    const hour = getHourFromDateTime(scheduledAt);

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamentos só podem ser feitos entre 9h-12h, 13h-18h e 19h-21h',
      };
    }

    const existingAppointments = await prisma.appointment.findFirst({
      where: {
        scheduledAt,
      },
    });

    if (existingAppointments) {
      return {
        error: 'Já existe um agendamento para este horário.',
      };
    }

    await prisma.appointment.create({
      data: {
        ...parsedData,
      },
    });

    revalidatePath('/');
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return {
      error: 'Erro ao criar agendamento.',
    };
  }
}

export async function updateAppointment(id: string, data: AppointmentData) {
  try {
    const parsedData = appointmentsSchema.parse(data);

    const { scheduledAt } = parsedData;
    const hour = getHourFromDateTime(scheduledAt);

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isEvening) {
      throw new Error(
        'Agendamentos só podem ser feitos entre 9h-12h, 13h-18h e 19h-21h'
      );
    }

    const existingAppointments = await prisma.appointment.findFirst({
      where: {
        scheduledAt,
        id: { not: id },
      },
    });

    if (existingAppointments) {
      return {
        error: 'Já existe um agendamento para este horário.',
      };
    }

    await prisma.appointment.update({
      where: { id },
      data: { ...parsedData },
    });

    revalidatePath('/');
  } catch (error) {
    return {
      error: 'Erro ao atualizar agendamento.',
    };
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: { id },
    });

    revalidatePath('/');
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);

    return {
      error: 'Erro ao deletar agendamento.',
    };
  }
}
