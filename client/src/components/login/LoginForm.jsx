import Button from '../Button';
import Input from '../Input';

function LoginForm() {
  return (
    <div className="m-10 bg-grayscale-90 max-w-md p-4 text-grayscale-5">
      Placeholder Login Form
      <div>
        <Button variant="pink">Next</Button>
        <Button>Create an account</Button>
      </div>
      <Input id="username" header="Username" type="text" name="Test" />
      <Input id="password" header="Password" type="text" name="Test" />
    </div>
  );
}

export default LoginForm;
