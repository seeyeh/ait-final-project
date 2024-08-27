import { cn } from '@/lib/utils';

function WeekCalendar() {
  // TODO: replace days with db data on workout split
  const split = [
    { day: 'Su', name: 'Push', done: true },
    { day: 'Mo', name: 'Pull', done: true },
    { day: 'Tu', name: 'Legs', done: false },
    { day: 'We', name: 'Rest', done: true },
    { day: 'Th', name: 'Upper', done: false },
    { day: 'Fr', name: 'Lower', done: false },
    { day: 'Sa', name: 'Rest', done: false }
  ];
  const currentDay = new Date().getDay();
  const getDayStyles = (index) => {
    const { name, done } = split[index];
    if (name === 'Rest') return 'border-none';
    if (done) return 'bg-grayscale-25';
    return index < currentDay ? 'border-dashed' : '';
  };

  return (
    <div className="flex w-full gap-2">
      {split.map((day, index) => (
        <div
          className={cn(
            'relative flex flex-1 flex-col rounded-xl border-2 border-grayscale-25 p-2 pb-3 text-h6',
            getDayStyles(index)
          )}
          key={day.day}
        >
          <b>{day.day}</b>
          <p className={cn({ 'text-grayscale-25': day.name === 'Rest' })}>
            {day.name}
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
