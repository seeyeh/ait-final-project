import TemplatesSection from '@/components/dashboard/TemplatesSection';
import WeekCalendar from '@/components/dashboard/WeekCalendar';
import LabeledSection from '@/components/LabeledSection';
import Subsection from '@/components/Subsection';

function DashHome() {
  const today = new Date();
  const date = today
    .toLocaleDateString('en-US', { dateStyle: 'full' })
    .split(',');

  return (
    <div className="flex w-full flex-wrap gap-x-12 gap-y-6">
      <div className="flex w-fit max-w-full flex-1 flex-col gap-6">
        <h1 className="w-full text-7xl">
          {date[0]},
          <br /> {date[1]}
        </h1>
        <LabeledSection
          label="This Week"
          color="green"
          className="w-full min-w-[36rem] max-w-[44rem]"
        >
          <WeekCalendar />
        </LabeledSection>
        <LabeledSection
          label="Workouts"
          color="pink"
          className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]"
        >
          <TemplatesSection />
        </LabeledSection>
      </div>
      <div className="flex min-w-[30rem] flex-1 flex-col gap-6">
        <LabeledSection
          label="Log"
          color="yellow"
        >
          <Subsection className="h-[30rem]">
            <h2>Log</h2>
          </Subsection>
        </LabeledSection>
        <LabeledSection
          label="Stats"
          color="blue"
        >
          <Subsection className="h-72">
            <h2>Stats</h2>
          </Subsection>
        </LabeledSection>
      </div>
    </div>
  );
}

export default DashHome;
