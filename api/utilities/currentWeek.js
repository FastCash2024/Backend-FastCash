export const getCurrentWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { start: monday, end: sunday };
};

export const getWeekNumber = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfWeek = startOfYear.getDay() || 7; // Ajustar para que el domingo sea el día 7
  const firstMonday = new Date(startOfYear.setDate(startOfYear.getDate() + (8 - dayOfWeek)));
  const pastDaysOfYear = (date - firstMonday) / 86400000;
  return Math.ceil((pastDaysOfYear + 1) / 7);
};

export const getWeekRange = (year, week) => {
  const startOfYear = new Date(year, 0, 1);
  const dayOfWeek = startOfYear.getDay() || 7; // Ajustar para que el domingo sea el día 7
  const firstMonday = new Date(startOfYear.setDate(startOfYear.getDate() + (8 - dayOfWeek)));
  const start = new Date(firstMonday.setDate(firstMonday.getDate() + (week - 1) * 7));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
};