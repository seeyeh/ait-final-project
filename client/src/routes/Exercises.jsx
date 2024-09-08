import Button from '@/components/Button';
import LabeledSection from '@/components/LabeledSection';
import ParchmentSection from '@/components/ParchmentSection';
import SearchBar from '@/components/exercises/SearchBar';
import SearchOption from '@/components/exercises/SearchOption';
import StickyNote from '@/components/exercises/StickyNote';
import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Exercises = () => {
  const searchRef = useRef();
  const [exercises, setExercises] = useState();
  const [selected, setSelected] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState();
  const [selectedNotes, setSelectedNotes] = useState(selected?.notes || []);
  const { auth } = useAuth();

  useEffect(() => {
    const controller = new AbortController();

    const getExercises = async () => {
      try {
        const response = await axiosPrivate.get('/exercises', {
          params: { parentUser: auth.id }, // parentUser is the User's _id in their db file, so we'd have to fetcch it when they log in and save it in the auth context?
          signal: controller.signal
        });
        console.log(response);
        setExercises(response?.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openExercise = async (e) => {
    console.log(e.target.id);
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get('/exercises', {
        params: { parentUser: auth.id, name: e.target.id }, // parentUser is the User's _id in their db file, so we'd have to fetcch it when they log in and save it in the auth context?
        signal: controller.signal
      });
      console.log(response);
      setSelected(response?.data[0]);
    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  const addNote = () => {
    setSelectedNotes((prev) => {
      return [...prev, ''];
    });
  };

  const stickyList = selectedNotes?.map((note, index) => {
    return (
      <StickyNote
        exercise={selected?.name}
        editing={note === '' ? true : false}
        index={index}
        key={index}
      >
        {note}
      </StickyNote>
    );
  });

  const exercisesList = exercises?.map((entry, index) => {
    return (
      <SearchOption
        id={entry.name}
        key={index}
        onClick={openExercise}
      >
        {entry.name}
      </SearchOption>
    );
  });

  return (
    <div>
      <h3 className="mb-5 text-h3">Exercises</h3>
      <div className="flex h-full w-full flex-row gap-4">
        <ParchmentSection className="h-fit overscroll-auto">
          <SearchBar
            id="search"
            className="w-full text-p"
            ref={searchRef}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            autoComplete="off"
          />
          <div className="flex h-[15rem] flex-col gap-1 overflow-y-auto">
            {exercisesList}
          </div>
        </ParchmentSection>
        {selected?._id && (
          <ParchmentSection className="flex h-fit gap-2">
            {selected?._id}
            <h4 className="text-h5">{selected?.name}</h4>
            <div className="flex h-fit w-full flex-col gap-2 rounded-xl">
              <div className="h-[12rem] w-full rounded-xl bg-grayscale-25"></div>
              <div className="flex h-fit w-full flex-col gap-2">
                <button className="h-[4rem] w-[6rem] rounded-xl border-2 border-grayscale-25 bg-grayscale-25 transition-colors focus:border-grayscale-90"></button>
              </div>
            </div>
            <LabeledSection
              color="blackBlue"
              size="xl"
              label="Instructions"
              className="w-full bg-blue-light"
            >
              {selected?.instructions ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend elit in efficitur eleifend. Etiam eget nisl non urna sollicitudin dictum. Nam pretium massa vel felis imperdiet, sed mattis erat pretium. In vel nunc purus.'}
            </LabeledSection>
            <Button
              className="w-fit"
              onClick={addNote}
            >
              + Add Sticky Note
            </Button>
            <div className="flex flex-row gap-2">{stickyList}</div>
          </ParchmentSection>
        )}
      </div>
    </div>
  );
};

export default Exercises;
