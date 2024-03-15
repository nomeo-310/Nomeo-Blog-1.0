import React from "react";
import { getSession } from "../../actions/data.action";
import { redirect } from "next/navigation";
import EditorClient from "../../components/editor/EditorClient";

const EditorPage = async () => {
  // const session = await getSession();

  // if (!session?.user) {
  //   redirect("/sign-in");
  // }

  return <EditorClient />;
};

export default EditorPage;
