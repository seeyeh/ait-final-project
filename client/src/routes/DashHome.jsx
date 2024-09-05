import LabeledSection from '@/components/LabeledSection';
import Subsection from '@/components/Subsection';

function DashHome() {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-6">
      <div className="flex w-full flex-col gap-6 lg:w-[calc(50%-1.5rem)]">
        <h1 className="text-7xl">
          Saturday,
          <br /> December 25
        </h1>
        <LabeledSection
          label="This Week"
          color="green"
        >
          <h2>This Week</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          reiciendis vitae voluptate perspiciatis, illum dolor, similique soluta
          asperiores totam doloremque magni neque animi unde ipsam a error
          voluptatibus? Saepe, aliquam?
        </LabeledSection>
        <LabeledSection
          label="Workouts"
          color="pink"
        >
          <Subsection className="h-96">
            <h2>Workouts</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
            reiciendis vitae voluptate perspiciatis, illum dolor, similique
            soluta asperiores totam doloremque magni neque animi unde ipsam a
            error voluptatibus? Saepe, aliquam?
          </Subsection>
        </LabeledSection>
      </div>
      <div className="flex w-full flex-col gap-6 lg:w-[calc(50%-1.5rem)]">
        <LabeledSection
          label="Log"
          color="yellow"
        >
          <Subsection className="h-[30rem]">
            <h2>Log</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
            reiciendis vitae voluptate perspiciatis, illum dolor, similique
            soluta asperiores totam doloremque magni neque animi unde ipsam a
            error voluptatibus? Saepe, aliquam?
          </Subsection>
        </LabeledSection>
        <LabeledSection
          label="Stats"
          color="blue"
        >
          <Subsection className="h-72">
            <h2>Stats</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
            reiciendis vitae voluptate perspiciatis, illum dolor, similique
            soluta asperiores totam doloremque magni neque animi unde ipsam a
            error voluptatibus? Saepe, aliquam?
          </Subsection>
        </LabeledSection>
      </div>
    </div>
  );
}

export default DashHome;
