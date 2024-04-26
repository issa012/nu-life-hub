import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./forms/login-form";
import RegistrationForm from "./forms/registration-form";
import NU from "../../assets/bg-nu.png";
import logo from "../../assets/nhl-logo.svg";
import { useAuth } from "@/hooks/useAuth";

function AuthPage() {
  const { user } = useAuth();

  let [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "login";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  if (user) {
    return <Navigate to="/" />;
  }

  function handleValueChange(value: string) {
    setActiveTab(value);
    setSearchParams({ tab: activeTab == "login" ? "register" : "login" });
  }

  return (
    <>
      <div className="flex justify-between">
        <img src={logo} className="pl-4 pt-4 md:pl-8 md:pt-6 lg:pl-16 lg:pt-11 " />
      </div>
      <div className="flex justify-between p-4 flex-col gap-6 items-center md:flex-row md:p-8  lg:items-baseline  lg:p-16">
        <div className="max-w-xl">
          <h1 className="font-extrabold  text-4xl md:text-[54px] lg:leading-snug leading-normal text-primary">
            NU Life Hub Connecting Students, Events, Marketplace
          </h1>
          <h2 className="font-light text-base">
            Start your new journey with us and join our community
          </h2>
        </div>
        <div className="">
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={handleValueChange}
            className="min-w-80 w-96 p-4 bg-white shadow-lg rounded-sm"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegistrationForm setActiveTab={setActiveTab} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="fixed left-0 bottom-0 w-full -z-10">
        <img src={NU} className="w-full" />
      </div>
    </>
  );
}
export default AuthPage;
