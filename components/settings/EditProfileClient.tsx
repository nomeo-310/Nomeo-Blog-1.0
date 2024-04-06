"use client";

import React from "react";
import { userProps } from "@/types/types";
import AnimationWrapper from "../common/AnimationWrapper";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";
import { toast } from "sonner";
import { uploadImage } from "@/hooks/uploadImage";
import InputBox from "../common/InputBox";
import { BsEnvelope, BsPerson } from "react-icons/bs";
import { HiOutlineAtSymbol } from "react-icons/hi2";
import { BsFacebook, BsInstagram, BsGlobe, BsYoutube, BsTwitter, BsGithub } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { updateUserProfile } from "@/libs/actions/user.action";

type editProfileProps = {
  currentUser: userProps;
};

const EditProfileClient = ({ currentUser }: editProfileProps) => {
  const pathname = usePathname();
  const { name, image, instagram, facebook, website, twitter, email, username, github, bio, youtube, profileImage } = currentUser;
  const bioLimit = 250;

  const [submitting, setSubmitting] = React.useState(false);

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [newProfileImage, setNewProfileImage] = React.useState({public_id: '', secure_url: ''});
  const [newUsername, setNewUsername] = React.useState(username?.split("@")[1]);
  const [newBio, setNewBio] = React.useState(bio);
  const [newInstagram, setNewInstagram] = React.useState(instagram);
  const [newFacebook, setNewFacebook] = React.useState(facebook);
  const [newWebsite, setNewWebsite] = React.useState(website);
  const [newTwitter, setNewTwitter] = React.useState(twitter);
  const [newGithub, setNewGithub] = React.useState(github);
  const [newYoutube, setNewYoutube] = React.useState(youtube);
  const [charactersLeft, setCharactersLeft] = React.useState(newBio ? bioLimit - newBio.length : bioLimit)


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage({...newProfileImage, secure_url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfileImage = async () => {
    let loadingImageToast = toast.loading("...Uploading");
    try {
      const data = await uploadImage(imageFile);
      const imageUrls = { public_id: data?.public_id, secure_url: data?.secure_url};
      setNewProfileImage(imageUrls);
      toast.dismiss(loadingImageToast);
      toast.success("Image successfully uploaded");
    } catch (error) {
      toast.dismiss(loadingImageToast);
      toast.error("Error uploading image");
    }
  };

  const handleCharacterChange = (event:React.ChangeEvent<HTMLTextAreaElement> ) => {
    setNewBio(event.target.value);
    setCharactersLeft(bioLimit - event.target.value.length);
  };

  const updateData = {
    profileImage: newProfileImage.public_id !== '' ? newProfileImage :  profileImage,
    image: newProfileImage.public_id !== '' ? newProfileImage?.secure_url : image,
    bio: newBio,
    instagram: newInstagram,
    facebook: newFacebook,
    twitter: newTwitter,
    github: newGithub,
    youtube: newYoutube,
    website: newWebsite,
    username: `@${newUsername}`,
    path: pathname,
    isNewImage: newProfileImage.public_id !== '' ? true : false
  };

  const handleUpdateUser = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true)
    try {
      await updateUserProfile(updateData)
      .then((response) => {
        if (response?.success) {
          toast.success(response.success)
          window.location.reload();
        }
        if (response?.error) {
          toast.success(response.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
    setSubmitting(false)
  }

  return (
    <AnimationWrapper>
      <form onSubmit={handleUpdateUser}>
        <h1 className="max-md:hidden dark:text-white">Edit Profile</h1>
        <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
          <div className="max-lg:center mb-5 ">
            <label htmlFor="uploadProfileImage" className="cursor-pointer md:w-40 md:h-40 w-48 h-48 rounded-full">
              <div className="relative bg-grey overflow-hidden md:w-44 md:h-44 w-52 h-52 rounded-full flex items-center justify-center">
                {newProfileImage.secure_url ? (
                  <Image src={newProfileImage.secure_url} alt="profile_image" fill/>) : 
                  (<Image src={image ? image : "/images/default_user.png"} alt="profile_image" fill/>
                )}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                  <LuImagePlus className="text-5xl" />
                </div>
              </div>
              <input id="uploadProfileImage" type="file" accept=".png, .jpg, .jpeg"  hidden  className="cursor-pointer"  onChange={handleFileChange} />
            </label>
            <div className="btn-light mt-5 max-lg:center lg:w-full px-10 cursor-pointer dark:text-black" onClick={handleUploadProfileImage}>
              Upload image
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
              <div>
                <InputBox type="text" id="name" value={name} disabled={true} icon={BsPerson} />
              </div>
              <div>
                <InputBox type="email" id="email" value={email} disabled={true} icon={BsEnvelope}/>
              </div>
            </div>
            <InputBox type="text" id="username" value={newUsername} disabled={false} icon={HiOutlineAtSymbol} onChange={(event) => setNewUsername(event.target.value)} />
            <p className="text-dark-grey -mt-3"> Username will be used to search user and will be visible to all users.</p>
            <textarea name="bio" maxLength={bioLimit} className="input-box h-52 lg:h-40 resize-none leading-7 pl-5 mt-5" placeholder="bio" onChange={handleCharacterChange} value={newBio} />
            <p className="text-dark-grey -mt-1"> {charactersLeft} characters left</p>
            <p className="text-dark-grey my-6">Add your social handles below</p>
            <div className="md:grid md:grid-cols-2 gap-x-6">
              <InputBox type="text" id="name" value={newInstagram} icon={BsInstagram} onChange={(event) => setNewInstagram(event.target.value)} placeholder="your instagram link"/>
              <InputBox type="text" id="name" value={newFacebook} icon={BsFacebook} onChange={(event) => setNewFacebook(event.target.value)} placeholder="your facebook link"/>
              <InputBox type="text" id="name" value={newGithub} icon={BsGithub} onChange={(event) => setNewGithub(event.target.value)} placeholder="your github link"/>
              <InputBox type="text" id="name" value={newWebsite} icon={BsGlobe} onChange={(event) => setNewWebsite(event.target.value)} placeholder="your personal website address"/>
              <InputBox type="text" id="name" value={newTwitter} icon={BsTwitter} onChange={(event) => setNewTwitter(event.target.value)} placeholder="your twitter link"/>
              <InputBox type="text" id="name" value={newYoutube} icon={BsYoutube} onChange={(event) => setNewYoutube(event.target.value)} placeholder="your youtube link"/>
            </div>
            <button className="btn-dark w-auto px-10 mt-4 dark:bg-red disabled:bg-black/50 dark:disabled:bg-red/50" type="submit" disabled={submitting}>{submitting ? '...Updating profile' : 'Update' }</button>
          </div>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default EditProfileClient;
