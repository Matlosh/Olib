import {redirect} from "next/navigation";
import {getMe} from "./_actions/user/actions";
import LoginForm from "./_components/loginForm/loginForm";

export default async function Page() {
  const me = await getMe(); 

  if('nick' in me) {
    redirect('/dashboard');
  }

  return (
    <LoginForm />
  );
}
