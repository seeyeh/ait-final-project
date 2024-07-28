import Button from '../Button';
import Input from '../Input';

function LoginForm() {
  return (
    <div className="bg-grayscale-5 w-[32rem] h-[36rem] rounded-5xl shadow-glow-2xl shadow-black/50 p-8 flex flex-col gap-12">
      <h1 className="text-8xl text-black">Login</h1>
      <div className="w-full flex-1 flex flex-col gap-4">
        <Input id="username" header="Username" className="w-full" />
        <Input id="password" header="Password" className="w-full" />
        <a href="/login" className="text-lg text-grayscale-60 self-end">
          Forgot password?
        </a>
      </div>

      <div className="flex gap-2">
        <Button variant="pink" hover="gray" size="lg">
          Next
        </Button>
        <Button hover="gray" size="lg">
          Create an account
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
