import React, { ReactNode, useState } from "react";
import { signIn, getProviders } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaSpinner, FaGooglePlusG } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ComikamediaNavbar, BackgroundLogin } from "../../components/svg";
import { Login } from "../../res/interface";

// enum Severity {
//   error='bg-red-200',
//   success='bg-green-200',
// }
// type ErrorMsg ={
//   0:Severity,
//   1:string
// }
export const LoginPage = (): ReactNode => {
  const router = useRouter();
  const [login, setLogin] = useState<Login | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>(
    router?.query?.errorNextAuth as string
  );
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, checked, name, value } = e.target;
    setLogin({ ...login, [name]: type === "checkbox" ? checked : value });
  };
  const { callbackUrl } = router.query;
  const callbackUrlString = (callbackUrl as string) || "/";

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    signIn("credentials", {
      redirect: false,
      ...login,
      callbackUrlString,
    }).then((result) => {
      if (result?.error !== null) {
        setErrorMsg(result.error);
        setIsLoading(false);
      } else router.push(`${callbackUrlString}`);
    });
  };
  return (
    <>
      <Head>
        <title>Comika Media - Login</title>
        {/* <meta property="og:image" content={post.ogImage.url} /> */}
      </Head>
      <div className="relative grid min-h-screen lg:grid-cols-2 bg-primary lg:bg-white">
        <BackgroundLogin className="fixed block lg:hidden" />
        <form
          onSubmit={handleSubmitLogin}
          className="absolute bottom-0 flex flex-col w-full px-8 pt-6 pb-8 mx-auto overflow-auto bg-white lg:static rounded-t-2xl lg:rounded lg:mb-4 lg:w-2/3 place-content-center"
        >
          <div className="hidden mb-8 lg:flex">
            <ComikamediaNavbar className="w-2/3" />
          </div>
          <div className="mb-8">
            <p className="text-3xl font-medium leading-9 text-gray-800">
              Login{" "}
            </p>
            <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">
              Log in to Comika Media
            </p>
          </div>

          <div className="mb-4">
            {errorMsg ? (
              <div className="max-w-full p-2 mb-4 bg-red-200 rounded">
                {errorMsg}
              </div>
            ) : null}
            <label
              htmlFor="email"
              className="block mt-4 mb-2 font-bold text-gray-800 "
            >
              Email
              <input
                className="w-full px-3 py-2 mt-3"
                type="text"
                onChange={handleChangeValue}
                placeholder="Email"
                name="email"
                id="email"
              />
            </label>
            <label
              htmlFor="Password"
              className="relative block mt-4 mb-2 font-bold text-gray-800"
            >
              Password
              <input
                className="w-full px-3 py-2 mt-3"
                id="password"
                type={isPasswordShown ? "text" : "password"}
                name="password"
                onChange={handleChangeValue}
                placeholder="******************"
              />
              <button
                type="button"
                className="absolute right-4 bottom-3"
                onClick={() => setIsPasswordShown(!isPasswordShown)}
              >
                {isPasswordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </label>
          </div>

          <div className="flex items-center justify-between mt-4">
            <label
              htmlFor="rememberMe"
              className="block font-bold text-gray-800 "
            >
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 leading-loose"
              />
              Remember Me
            </label>
            <Link
              href="/auth/forget"
              className="inline-block font-bold align-baseline text-blue hover:text-blue-darker"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            className="flex justify-center px-6 py-4 mt-8 font-bold btn-primary"
            type="submit"
          >
            {isLoading && <FaSpinner className="w-5 h-5 mr-3 animate-spin" />}
            Sign In
          </button>
          <div className="py-2 font-bold text-center text-gray-800 text-opacity-50">
            Or
          </div>
          <div className="flex justify-center my-2">
            {/* <button
            type="button"
            className="btn-secondary border-primary text-primary "
            onClick={() => signIn('facebook', { redirect: true })}
          >
            <FaFacebookF className="mr-2 text-xl" />
            Facebook
          </button> */}
            <button
              type="button"
              className="w-full text-red-700 border-2 border-red-700 btn-secondary "
              onClick={() =>
                signIn("google", { callbackUrl: callbackUrlString })
              }
            >
              <FaGooglePlusG className="mr-2 text-2xl" />
              Google
            </button>
          </div>
          <p className="py-4 text-sm leading-relaxed text-center text-gray-500">
            Don’t have an account?
            <Link href="/auth/signup" className="font-bold text-primary">
              Sign up
            </Link>
          </p>
        </form>
        <div className="relative hidden h-auto overflow-hidden bg-primary lg:block">
          <BackgroundLogin className="absolute " />
        </div>
      </div>
    </>
  );
};

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
export default LoginPage;
