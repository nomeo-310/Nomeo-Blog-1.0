import { OutputBlockData } from "@editorjs/editorjs";
import Image from "next/image";
import React from "react";

type contentProps = {
  block: OutputBlockData;
};

const Content = ({ block }: contentProps) => {
  const { type, data } = block;

  if (type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }} className="text-lg" />;
  }

  if (type === "header") {
    if (data.level === 3) {
      return (
        <h3 className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }} />
      );
    } else {
      return (
        <h2
          className="text-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></h2>
      );
    }
  }

  if (type === "image") {
    return (
      <div>
        <div className="relative aspect-video rounded overflow-hidden">
          <Image src={data.file.url} alt="image" fill />
        </div>
        {data.caption.length && (
          <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey">{data.caption}</p>
        )}
      </div>
    );
  }

  if (type === 'quote') {
    return (
      <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple rounded">
        <p className="text-xl leading-10 md:text-2xl">{data.text}</p>
        {data.caption.length && (
          <p className="w-full text-base text-purple">{data.caption}</p>
        )}
      </div>
    )
  }

  if (type === 'list') {
    return (
      <ol className={`pl-5 ${data.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
        {data.items.map((listItem:string, index:number) => (
          <li key={index} className="my-4" dangerouslySetInnerHTML={{ __html: listItem }}>
            
          </li>
        ))
        }
      </ol>
    )
  }
};

export default Content;
