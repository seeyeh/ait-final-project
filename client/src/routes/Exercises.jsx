import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LabeledSection from '../components/LabeledSection';
import ParchmentSection from '../components/ParchmentSection';
import SearchBar from '../components/exercises/SearchBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Exercises = () => {
  const searchRef = useRef();
  const [exercises, setExercises] = useState();
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
          params: { parentUser: 'bob' },
          signal: controller.signal
        });
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getExercises();
  }, []);

  return (
    <div>
      <h3 className="mb-5 text-h3">Exercises</h3>
      <ParchmentSection header="Search">
        <SearchBar
          id="search"
          className="w-full text-h4"
          ref={searchRef}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
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
