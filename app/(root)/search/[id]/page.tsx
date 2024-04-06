import React from "react";
import SearchClient from "@/components/search/SearchClient";
import { fetchCurrentUser } from "@/libs/actions/user.action";
import { getSession } from "@/libs/actions/data.action";
import { redirect } from "next/navigation";

const SearchPage = async ({ params }: { params: { id: string } }) => {
  const currentUser = await fetchCurrentUser();
  const session = await getSession();

  const loggedIn = session && session.user && session.user.email === currentUser.email;

  if (!loggedIn) {
    redirect(`/sign-in?next=/search/${params.id}`);
  }
  return <SearchClient id={params.id} />;
};

export default SearchPage;
