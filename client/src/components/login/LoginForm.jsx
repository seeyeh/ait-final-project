import Button from '../Button';
import Input from '../Input';

function LoginForm() {
  return (
    <div className="bg-grayscale-90 w-[20rem] h-[23rem] rounded-4xl mb-8 shadow-glow-2xl shadow-grayscale-90 p-5 text-grayscale-5">
      <h1 className="text-5xl mb-6">Login</h1>
      <Input id="username" header="Username" type="text" name="Test" />
      <Input id="password" header="Password" className="mb-[4rem]" type="text" name="Test" />
      <div>
        <Button variant="pink" size="lg" className="mr-1">
          Next
        </Button>
        <Button size="lg">Create an account</Button>
      </div>
    </div>
  );
}

export default LoginForm;
