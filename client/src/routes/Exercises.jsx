import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ParchmentSection from '../components/ParchmentSection';
import SearchBar from '../components/exercises/SearchBar';
import SearchOption from '../components/exercises/SearchOption';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Exercises = () => {
  const searchRef = useRef();
  const [exercises, setExercises] = useState();
  const [selected, setSelected] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getExercises = async () => {
      try {
        const response = await axiosPrivate.get('/exercises', {
          params: { parentUser: '66b5b77e6f9fbd6c8bd5b11b' }, // parentUser is the User's _id in their db file, so we'd have to fetcch it when they log in and save it in the auth context?
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
        params: { parentUser: '66b5b77e6f9fbd6c8bd5b11b', name: e.target.id }, // parentUser is the User's _id in their db file, so we'd have to fetcch it when they log in and save it in the auth context?
        signal: controller.signal
      });
      console.log(response);
      setSelected(response?.data[0]);
    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  const exercisesList = exercises?.map((entry, index) => {
    return (
      <SearchOption id={entry.name} key={index} onClick={openExercise}>
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
        <ParchmentSection className="h-[30rem]">
          {selected._id}
          <h4 className="text-h4">{selected.name}</h4>
        </ParchmentSection>
      </div>
    </div>
  );
};

export default Exercises;
