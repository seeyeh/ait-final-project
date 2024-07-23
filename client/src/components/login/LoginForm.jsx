import Button from '../Button';
import Input from '../Input';

function LoginForm() {
  return (
    <div className="bg-grayscale-90 w-[32rem] h-[36rem] rounded-4xl mb-8 shadow-glow-2xl shadow-grayscale-90 p-8 text-grayscale-5 flex flex-col gap-4">
      <h1 className="text-7xl">Login</h1>
      <div className="w-full flex-1 flex flex-col gap-4">
        <Input id="username" header="Username" className="w-full" />
        <Input id="password" header="Password" className="w-full" />
        <a href="/login" className="text-grayscale-70 self-end">
          Forgot password?
        </a>
      </div>

      <div className="flex gap-2">
        <Button variant="pink" size="lg">
          Next
        </Button>
        <Button size="lg">Create an account</Button>
      </div>
    </div>
  );
}

export default LoginForm;
