import { getSession } from "@/app/actions/data.action";
import Authform from "@/app/components/authform/Authform";
import { redirect } from "next/navigation";
import React from "react";


const SignInPage = async () => {
  const session = await getSession();
  
  if (session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Authform type="login" />
    </div>
  );
};

export default SignInPage;
