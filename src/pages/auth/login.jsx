import LoginForm from "../../components/login";

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
      <div className="w-full bg-white overflow-hidden shadow sm:max-w-[420px] rounded-md">
        <div className='brand-strip h-[6px] bg-[#4a8cd1]'></div>
        <div className='text-center pt-7 pb-5 px-7'>
          <h1 className='font-semibold mb-2 text-2xl text-black'>
            Welcome to Thomson Medical
          </h1>
          <p className="login-subtitle text-[#666666]">
            GenAI-Powered Medical Summary Platform
          </p>
        </div>
        <LoginForm />
        <div className="text-xs text-center text-[#999999] mb-5">
          © 2025 Thomson Medical Group. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;