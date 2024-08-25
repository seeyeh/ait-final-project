import { cn } from '@/lib/utils';

function WeekCalendar() {
  const days = [
    { day: 'Su', workout: 'Push', done: true },
    { day: 'Mo', workout: 'Pull', done: true },
    { day: 'Tu', workout: 'Legs', done: false },
    { day: 'We', workout: 'Rest', done: true },
    { day: 'Th', workout: 'Upper', done: false },
    { day: 'Fr', workout: 'Lower', done: false },
    { day: 'Sa', workout: 'Rest', done: false }
  ];
  const currentDay = new Date().getDay();
  const getDayStyles = (index) => {
    const { workout, done } = days[index];
    if (workout === 'Rest') return 'border-none';
    if (done) return 'bg-grayscale-25';
    return index < currentDay ? 'border-dashed' : '';
  };

  return (
    <div className="flex w-full gap-2">
      {days.map((day, index) => (
        <div
          className={cn(
            'relative flex flex-1 flex-col rounded-xl border-2 border-grayscale-25 p-2 pb-3 text-h6',
            getDayStyles(index)
          )}
          key={day.day}
        >
          <b>{day.day}</b>
          <p className={cn({ 'text-grayscale-25': day.workout === 'Rest' })}>
            {day.workout}
          </p>

          {currentDay === index && (
            <div className="absolute right-2 z-10 h-4 w-4 rounded-full bg-green-medium" />
          )}
        </div>
      ))}
    </div>
  );
}

export default WeekCalendar;
