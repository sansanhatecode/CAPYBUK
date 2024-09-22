"use client";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Confetti from "react-confetti";
import { useAuthorization } from "@/hooks/queries/useAuthorization";
import { useRouter } from "next/navigation";

const VerifyPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [code, setCode] = useState<string>("");
  const { verify } = useAuthorization();
  const router = useRouter();

  useEffect(() => {
    setShowConfetti(true);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 1000);
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (
    index: number,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    if (!/^[0-9]*$/.test(value)) {
      event.currentTarget.value = "";
      return;
    }
    const newCode = [...code.split("")];
    newCode[index] = value;
    setCode(newCode.join(""));

    if (value.length === 1) {
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const data = await verify(code);
      router.push("/");
    } catch (e) {
      console.error
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5 relative min-w-[100vw] min-h-[100vh]">
      {showConfetti && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ opacity: fadeOut ? 0 : 1, transition: "opacity 1s" }}
        >
          <Confetti width={width} height={height} />
        </div>
      )}
      <Image
        src="/assets/img/login.png"
        alt="cute capybara"
        width="300"
        height="300"
        className="fixed bottom-0 right-20 z-10 h-auto"
        priority
      />
      <h1 className="text-brown-dark text-4xl">Welcome to capybuk :3</h1>
      <div className="w-[50%] max-w-[600px] min-w-[360px] bg-shinny rounded-lg px-10 py-5 gap-3 flex flex-col shadow-md">
        <p>
          <span className="text-xl">🎉 </span>Congratulations on officially
          joining the coolest club in town—our community! We’re super excited to
          have you with us! Now, to unlock all the magic, please check your
          email for a secret code (no, it’s not the WiFi password). Just enter
          that code below, and you’re in!
        </p>
        <p>
          <span className="text-xl">😄 </span>If you run into any hiccups or
          just want to chat about your favorite snacks, we’re all ears!
        </p>
        <div className="flex gap-2 my-5 m-auto">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              ref={(el) => (inputRefs.current[index] = el as any)}
              onInput={(event) => handleChange(index, event)}
              className="w-10 h-12 border border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              autoComplete="off"
              maxLength={1}
            />
          ))}
        </div>
        <button
          onClick={() => handleVerify()}
          className="font-bold mt-4 bg-brown-dark text-white py-2 px-4 rounded-lg hover:bg-brown-light transition"
        >
          Verify Code
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
