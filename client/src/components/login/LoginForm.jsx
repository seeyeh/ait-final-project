import Button from '../Button';
import Input from '../Input';

function LoginForm() {
  return (
    <div className="bg-grayscale-90 w-[32rem] h-[36rem] rounded-4xl mb-8 shadow-glow-2xl shadow-grayscale-90 p-4 text-grayscale-5">
      <Input id="username" header="Username" type="text" name="Test" />
      <Input id="password" header="Password" type="text" name="Test" />
      <div>
        <Button variant="pink" size="lg">
          Next
        </Button>
        <Button size="lg">Create an account</Button>
      </div>
    </div>
  );
}

export default LoginForm;
