import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import tailBot from "../assets/tail-bot.png";
import tailbotLogo1 from "../assets/tailbot-logo-1.png";

export const WelcomePage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f6cbcb] min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-[983px] w-full bg-[#f6cbcb] relative rounded-xl shadow-md p-6">
        <p className="text-center text-black text-2xl font-normal mb-10">
          Your AI-Powered Companion for Animal First Aid & Rescue!
        </p>

        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative w-[292px] h-[292px]">
            <img
              className="absolute w-[292px] h-[292px] object-cover"
              alt="Tailbot logo"
              src={tailbotLogo1}
            />
          </div>
          <img
            className="w-[326px] h-[81px] mt-4"
            alt="Tail bot"
            src={tailBot}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            labelText="Login"
            onClick={() => navigate("/login")}
            className="w-64 bg-m-3black text-m-3white"
            labelTextClassName="text-white"
            showIcon={false}
          />
          <div className="text-black font-m3-label-large">or</div>
          <Button
            labelText="Signup"
            onClick={() => navigate("/signup")}
            className="w-64 bg-m-3black text-m-3white"
            labelTextClassName="text-white"
            showIcon={false}
          />
        </div>
      </div>
    </div>
  );
};
