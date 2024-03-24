"use client";

import React from "react";
import Logo from "../common/Logo";
import AnimationWrapper from "../common/AnimationWrapper";
import Image from "next/image";
import { toast } from "sonner";
import { blogProps } from "./EditorClient";
import { uploadImage } from "@/hooks/uploadImage";
import EditorJS from "@editorjs/editorjs";
import { tools } from "@/hooks/editorTools";

interface editorProps {
  blogData: blogProps;
  setBlogData: React.Dispatch<React.SetStateAction<blogProps>>;
  setDisplayPage: React.Dispatch<React.SetStateAction<string>>;
}

const EditorForm = ({ blogData, setBlogData, setDisplayPage }: editorProps) => {

  const [image, setImage] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState(blogData.banner);
  const [imageUploaded, setImageUploaded] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const ref = React.useRef<EditorJS>();

  React.useEffect(() => {
    if (imageUrl.secure_url !== "") {
      setImageUrl(imageUrl);
    }
  }, [imageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl({...imageUrl, secure_url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelSelection = () => {
    setImageUploaded(false);
    setImage(null);
    setImageUrl({secure_url: "", public_id: ""});
    setBlogData({...blogData, banner: {secure_url: "", public_id: ""}})
  };

  const handleUploadBanner = async () => {
    let loadingImageToast = toast.loading("...Uploading");
    try {
      const data = await uploadImage(image);
      const imageUrls = {public_id: data?.public_id, secure_url: data?.secure_url}
      setImageUrl(imageUrls);
      toast.dismiss(loadingImageToast);
      toast.success("Image successfully uploaded");
      setImageUploaded(true);
      setBlogData({ ...blogData, banner: imageUrls });
    } catch (error) {
      toast.dismiss(loadingImageToast);
      toast.error("Error uploading image");
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let textInput = event.target;
    textInput.style.height = "auto";
    textInput.style.height = textInput.scrollHeight + "px";
    setBlogData({ ...blogData, title: textInput.value });
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    const init = () => {
      if (!ref.current) {
        const editor = new EditorJS({
          holder: "editorjs",
          data: blogData.content,
          placeholder: "Let's write an awesome story",
          // @ts-ignore:
          tools: tools,
        });
        ref.current = editor;
      }
    };

    if (isMounted) {
      init();
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, [blogData.content, isMounted]);

  const save = () => {
    if (!blogData.banner.secure_url.length) {
      return toast.error('Upload a blog banner to publish it')
    }

    if (!blogData.title.length) {
      return toast.error("Write a blog title to publish it");
    }

    if (ref.current) {
      ref.current.save().then((outputData) => {
        if (outputData.blocks.length > 0) {
          setBlogData({ ...blogData, content: outputData });
          setDisplayPage("publish");
        } else {
          return toast.error("Write something in your blog to publish");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <Logo />
        <p className="max-md:hidden line-clamp-1 w-fit text-lg">
          {blogData.title ? blogData.title : "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={save}>
            Publish
          </button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border border-grey rounded-lg hover:opacity-80 flex items-center justify-center">
              { imageUrl.secure_url ? (
                <React.Fragment>
                  <Image src={imageUrl.secure_url} alt="main_banner_image" fill className="rounded-lg" />
                  <div className="mt-4 absolute right-3 bottom-3 flex items-center gap-4">
                    <button className="btn-light py-2" onClick={handleCancelSelection} >
                      {imageUploaded && blogData.banner.secure_url ? "Change image" : "Cancel"}
                    </button>
                    <button className={ imageUploaded ? "hidden" : "block btn-dark py-2"} onClick={handleUploadBanner} >
                      Upload
                    </button>
                  </div>
                </React.Fragment>
              ) : (
                <label htmlFor="uploadBanner" className="cursor-pointer">
                  <input id="uploadBanner" type="file" accept=".png, .jpg, .jpeg" hidden onChange={handleFileChange} className="cursor-pointer" />
                  <Image src="/images/blog_banner.png" alt="main_banner_image" fill className="rounded-lg" />
                </label>
              )}
            </div>

            <textarea
              placeholder="Blog Title"
              className="text-2xl md:text-3xl font-medium w-full h-20 outline-none resize-none mt-6 md:mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleOnKeyDown}
              onChange={handleTitleChange}
              value={blogData.title}
            />

            <hr className="w-full opacity-20 my-4" />

            <div id="editorjs"></div>

          </div>
        </section>
      </AnimationWrapper>
    </React.Fragment>
  );
};

export default EditorForm;
