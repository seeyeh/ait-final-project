import Button from '@/components/Button';
import Subsection from '@/components/Subsection';
import { daysAgoString } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function TemplatesSection() {
  // TODO: replace templates with db data
  const templates = [
    {
      name: 'Upper 1',
      lastCompleted: new Date('2024-08-16'),
      exercises: [
        'Barbell bench press',
        'Lat pulldown',
        'DB lateral raise',
        'Seated cable row',
        'Cable curl',
        'Pec deck'
      ]
    },
    {
      name: 'Lower 1',
      lastCompleted: new Date('2024-08-25'),
      exercises: [
        'Back squat',
        'Barbell RDL',
        'Barbell hip thrust',
        'Seated leg curl',
        'Leg extension',
        'Standing calf raise'
      ]
    },
    {
      name: 'Upper 2',
      lastCompleted: new Date('2024-08-27'),
      exercises: [
        'DB incline press',
        'Pull-ups',
        'Cable lateral raise',
        'Chest-supported machine row',
        'DB skull crushers',
        'Reverse cable fly'
      ]
    },
    {
      name: 'Lower 2',
      lastCompleted: new Date('2024-08-26'),
      exercises: [
        'Leg press',
        'Lying leg curl',
        'Smith machine Bulgarian split squat',
        'Glute-ham raise',
        'Machine hip adduction',
        'Seated calf raise'
      ]
    }
  ];

  return (
    <>
      {templates.map((template) => (
        <Subsection
          key={template.name}
          className="relative flex h-56 w-full flex-col"
        >
          <h3 className="text-h5 font-medium">{template.name}</h3>
          <p className="text-p text-grayscale-60">
            {daysAgoString(template.lastCompleted)}
          </p>
          <div className="mb-2 mt-4 overflow-y-hidden text-p">
            {template.exercises.map((exercise) => (
              <p
                className="overflow-hidden text-ellipsis text-nowrap"
                key={exercise}
              >
                {exercise}
              </p>
            ))}
          </div>

          <Button
            className="absolute right-3 top-3 p-0.5"
            variant="pink"
            size="icon"
          >
            <ArrowRight size={32} />
          </Button>
        </Subsection>
      ))}
    </>
  );
}
