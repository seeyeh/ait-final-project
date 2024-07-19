import PropTypes from 'prop-types';

function Input(props) {
  // props needed: header, type, placeholder, handleChange, name, value
  return (
    <div>
      <h3 className="input--header">{props.header}</h3>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.handleChange} // the parent Form component that holds this Input should be the one holding a formData state and also a function that changes that state
        name={props.name}
        value={props.value} // props.value = formData.[whatever the name of the input being updated in formData state in the parent Form component] (e.g. formData.firstName)
      />
    </div>
  );
}
Input.propTypes = {
  header: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Input;
