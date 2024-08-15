import LabeledSection from '../components/LabeledSection';
import ParchmentSection from '../components/ParchmentSection';

const Exercises = () => {
  return (
    <div>
      <h3 className="mb-5 text-h3">Exercises</h3>
      <ParchmentSection header="Search">
        <LabeledSection label="Instructions" color="blue">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          reiciendis vitae voluptate perspiciatis, illum dolor, similique soluta
          asperiores totam doloremque magni neque animi unde ipsam a error
          voluptatibus? Saepe, aliquam?
        </LabeledSection>
      </ParchmentSection>
    </div>
  );
};

export default Exercises;
