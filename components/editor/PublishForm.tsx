'use client'

import React from "react";
import { blogProps } from "./EditorClient";
import AnimationWrapper from "../common/AnimationWrapper";
import { BsXLg } from "react-icons/bs";
import Image from "next/image";
import BlogTag from "./BlogTag";
import { toast } from "sonner";
import { createBlogPost, createBlogProps } from "@/libs/actions/blog.action";
import { useRouter } from "next/navigation";
import ThemeToggler from "../common/ThemeToggler";

interface publishFormProps {
  blogData: blogProps;
  setBlogData: React.Dispatch<React.SetStateAction<blogProps>>;
  setDisplayPage: React.Dispatch<React.SetStateAction<string>>;
}

const PublishForm = ({ blogData, setDisplayPage, setBlogData }: publishFormProps) => {
  const [singleTag, setSingleTag] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  let characterLimit = 400;
  let tagLimit = 8;

  const handleClose = () => {
    setDisplayPage("editor");
  };

  const updateTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target;
    setBlogData({...blogData, title: input.value})
  };

  const updateDescription = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    let input = event.target;
    setBlogData({...blogData, description: input.value})
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      
      if (blogData.tags.length < tagLimit) {
        if (!blogData.tags.includes(singleTag) && singleTag.length) {
          setBlogData({ ...blogData, tags: [...blogData.tags, singleTag]})
        }
        setSingleTag('');
      } else {
        toast.error(`You can only add maximum of ${tagLimit} tags`)
      }
    }
  };

  const createTags = (event:React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target;
    setSingleTag(input.value)
  }

  const handlePublishForm = async () => {
    if (!blogData.title.length) {
      return toast.error('You need to have a title to publish your post')
    }

    if (!blogData.description.length || blogData.description.length > characterLimit) {
      return toast.error(`Write a description abut your blog not more than ${characterLimit} words`)
    }

    if (!blogData.tags.length) {
      return toast.error('Enter at least 1 tag to help rank your blog')
    }

    setIsLoading(true)
    try {
      await createBlogPost(blogData as createBlogProps)
      toast.success('Blogpost successfully created');
      router.push('/');
    } catch (error) {
      toast.error('Something went wrong')
    }
    setIsLoading(false)
  }

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <button onClick={handleClose} className="absolute right-[5vw] top-[5%] lg:top-[10p%] w-10 h-10 flex items-center justify-center bg-grey rounded-full">
          <BsXLg className="text-xl" />
        </button>
        <div className="absolute left-[5vw] top-[5%] lg:top-[10p%]">
          <ThemeToggler/>
        </div>
        <div className="mx-w-[550px] center">
          <p className="text-dark-grey mb-1 lg:text-xl dark:text-grey">Preview</p>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-grey mt-6">
            <Image src={blogData.banner.secure_url} alt="banner" fill className="rounded" />
          </div>

          <h1 className="text-2xl md:text-3xl font-medium mt-2 leading-tight line-clamp-2 dark:text-grey">{blogData.title}</h1>
          <p className="line-clamp-2 md:text-xl text-lg leading-7 mt-4 dark:text-grey">{blogData.description}</p>
        </div>

        <div className="">

          <p className="text-dark-grey mb-2 mt-5 lg:mt-8 dark:text-grey">Blog Title</p>
          <input type="text" placeholder="Blog Title" value={blogData.title} className="input-box pl-4 " onChange={updateTitle}/>

          <p className="text-dark-grey mb-2 mt-5 lg:mt-8 dark:text-grey">Short description about your blog</p>
          <textarea  placeholder="Short description about your blog" value={blogData.description} className="dark:text-grey lg:h-52 h-60 resize-none input-box leading-7 pl-4 " maxLength={characterLimit} onChange={updateDescription} onKeyDown={handleOnKeyDown}/>
          <p className="mt-1 text-right text-dark-grey text-sm dark:text-grey">{characterLimit - blogData.description.length} characters left</p>

          <p className="text-dark-grey mb-2 mt-5 lg:mt-8 dark:text-grey">Topics - ( Help in searching and ranking your post )</p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input type="text" placeholder="Topic" className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white dark:focus:bg-grey dark:text-lack dark:bg-grey" onKeyDown={handleInputKeyDown} onChange={createTags} value={singleTag}/>
            {
              blogData.tags.map((tag:string, index:number) => (
                <BlogTag tag={tag} key={index} blogData={blogData} setBlogData={setBlogData} tagIndex={index}/>
              ))
            }
          </div>
          <p className="mt-1 text-right text-dark-grey text-sm">{tagLimit - blogData.tags.length} tags left</p>

          <button className="btn-dark px-8" onClick={handlePublishForm} disabled={isLoading}>{isLoading ? '...Publishing Blog' : 'Publish Blog'}</button>

        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
