import React from "react";
import { getSession } from "../actions/data.action";
import { redirect } from "next/navigation";

const EditorPage = async () => {

  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }
  
  return <div>edit page</div>;
};

export default EditorPage;
