import { getSession } from "@/libs/actions/data.action";
import Authform from "@/components/authform/Authform";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = async () => {
  const session = await getSession();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Authform type="register" />
    </div>
  );
};

export default SignUpPage;
