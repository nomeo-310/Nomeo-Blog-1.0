"use client";

import React from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import WithinPageNavigation from "../common/WithinNavigation";
import LatestBlogs from "./LatestBlogs";
import TrendingBlogs from "./TrendingBlogs";
import { BsGraphUpArrow } from "react-icons/bs";
import NoBlogPostMessage from "./NoBlogPostMessage";
import Loader from "../common/Loader";
import axios from "axios";
import { latestBlogProps, trendingBlogProps } from "@/types/types";
import { categories } from "../constants";
import LoadMoreData from "./LoadMoreData";

export interface blogsProps {
  data: latestBlogProps[],
  blogCount: number,
  page: number
}

const HomeClient = () => {
  const [blogs, setBlogs] = React.useState<blogsProps | null>(null);
  const [moreBlogs, setMoreBlogs] = React.useState<blogsProps | null>(null);
  const [trendingBlog, setTrendingBlog] = React.useState<trendingBlogProps[] | null>(null);
  const [pageState, setPageState] = React.useState("home");
  const [width, setWidth] = React.useState('');
  
  const homeRoutes = [pageState, 'trending blogs'];
  const hiddenRoutes = ["trending blogs"];
  
  const getCategoryBlogs = React.useCallback(({page = 1}:{page:number}) => {
    try {
      axios.post('/api/getCategoryBlogs', {tags: pageState, page: page })
      .then(({data}) => {
        setBlogs(data);
      })
    } catch (error) {
      console.log(error)
    }
  }, [pageState])

  const getLatestBlogs = React.useCallback(({page = 1}:{page:number}) => {
    try {
      axios.post('/api/getLatestBlogs', { page })
      .then(async ({data}) => {
        setBlogs(data);
      })
    } catch (error) {
      console.log(error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoreLatestBlogs = React.useCallback(({page}:{page:number}) => {
    try {
      axios.post('/api/getLatestBlogs', { page: page })
      .then(({data}) => {
        setMoreBlogs(data);
      })
    } catch (error) {
      console.log(error)
    }
  }, []);

  const getMoreCategoryBlogs = React.useCallback(({page}:{page:number}) => {
    try {
      axios.post('/api/getCategoryBlogs', { page: page })
      .then(({data}) => {
        setMoreBlogs(data);
      })
    } catch (error) {
      console.log(error)
    }
  }, []);

  React.useEffect(() => {
    if (pageState === 'home') {
      setWidth('76px')
      getLatestBlogs({page:1});
    } else {
      getCategoryBlogs({page:1});
    }

    if (!trendingBlog) {
      getTrendingBlogs();
    }

  }, [getCategoryBlogs, getLatestBlogs, pageState, trendingBlog]);


  React.useEffect(() => {
    if (moreBlogs !== null && blogs !== null) {
      setBlogs({...blogs, data: [...blogs.data, ...moreBlogs.data], page: moreBlogs.page})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreBlogs]);

  const handleClick = (e:any) => {
    let category = e.innerText.toLowerCase();
    setWidth(e.offsetWidth + 'px')

    setBlogs(null)
    
    if (pageState === category) {
      setPageState("home");
      return;
    }
    
    setPageState(category);
  };

  const getTrendingBlogs = () => {
    try {
      axios.get('/api/getTrendingBlogs')
      .then(({data}) => setTrendingBlog(data))
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <WithinPageNavigation routes={homeRoutes} defaultHidden={hiddenRoutes} defaultActiveIndex={0} width={width}>
            <React.Fragment>
              { blogs === null ? <Loader/> : (
                  blogs.data.length  ? <LatestBlogs latestBlogs={blogs.data} /> : 
                  <NoBlogPostMessage message="No blog posts published yet"/> 
                )
              }
              <LoadMoreData currentData={blogs} getMoreBlogs={getMoreLatestBlogs} getMoreCategories={getMoreCategoryBlogs} pageState={pageState}/>
            </React.Fragment>
            <React.Fragment>
              { trendingBlog === null ? <Loader/> : 
                (trendingBlog.length ? <TrendingBlogs trendingBlogs={trendingBlog} />: 
                  <NoBlogPostMessage message="No trending blog posts yet"/> 
                )
              }
            </React.Fragment>
          </WithinPageNavigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">Stories from all interests</h1>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category: string, index: number) => (
                  <button key={index} className={"tag " + (pageState === category ? "bg-black text-white" : "")} onClick={(e:React.MouseEvent<HTMLButtonElement>) => {handleClick(e.target)}} >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center mb-8 gap-3">
                <h1 className="font-medium text-xl">Trending</h1>
                <BsGraphUpArrow />
              </div>
              <React.Fragment>
                { trendingBlog === null ? <Loader/> : 
                  (trendingBlog.length ? <TrendingBlogs trendingBlogs={trendingBlog} />: 
                    <NoBlogPostMessage message="No trending blog posts yet"/> 
                  )
                }
              </React.Fragment>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomeClient;
