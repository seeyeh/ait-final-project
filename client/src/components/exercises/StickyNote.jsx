import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import Button from '../Button';

const StickyNote = ({ exercise, editing, index, content }) => {
  const [isEditing, setIsEditing] = useState(editing);
  const [noteContent, setNoteContent] = useState(content);
  const navigate = useNavigate();
  const location = useLocation();

  // Toggles editing mode; if sticky note is editing -> editing-off, will send API request to update
  const toggleEditing = async () => {
    // if (isEditing) {
    //   const controller = new AbortController();
    //   try {
    //     const response = await axiosPrivate.patch('/exercises', {
    //       data: [{ parentUser: '66b5b77e6f9fbd6c8bd5b11b', name: exercise, patches:[{ 'path':'notes'}] }], // parentUser is the User's _id in their db file, so we'd have to fetcch it when they log in and save it in the auth context?
    //       signal: controller.signal
    //     });
    //     console.log(response);
    //   } catch (err) {
    //     console.error(err);
    //     navigate('/login', { state: { from: location }, replace: true });
    //   }
    // }

    setIsEditing((prevState) => !prevState);
  };

  return (
    <div
      className={cn(
        'flex h-[7rem] w-[10rem] flex-row gap-2 rounded-xl border p-3 text-small',
        isEditing
          ? 'border-yellow-light bg-grayscale-5'
          : 'border-yellow-light bg-yellow-light'
      )}
    >
      <div className="h-full w-full">
        {isEditing ? (
          <textarea
            className="h-full w-full resize-none overflow-hidden bg-grayscale-5 focus:outline-none"
            id="noteContent"
            onChange={(e) => setNoteContent(e.target.value)}
            value={noteContent}
          />
        ) : (
          noteContent
        )}
      </div>

      <div className={cn('flex w-[2rem] flex-col')}>
        <Button
          variant="yellow"
          hover="yellow"
          size="small"
          onClick={toggleEditing}
        >
          {isEditing ? 'OK' : 'E'}
        </Button>
      </div>
    </div>
  );
};

StickyNote.propTypes = {
  exercise: PropTypes.string,
  editing: PropTypes.bool,
  index: PropTypes.number,
  content: PropTypes.string
};

export default StickyNote;
