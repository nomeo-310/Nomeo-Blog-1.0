import { fullDateGenerator } from '@/hooks/dateGenerator';
import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons';
import { BsFacebook, BsInstagram, BsGlobe, BsYoutube, BsTwitter, BsGithub } from "react-icons/bs";

type Props = {
  bio: string | undefined
  website: string | undefined
  facebook: string | undefined 
  instagram: string | undefined 
  youtube: string | undefined
  twitter: string | undefined
  github: string | undefined
  createdAt: string
  className?: string
}

const AboutUser = ({bio, website, facebook, instagram, youtube, twitter, createdAt, className, github}: Props) => {

  const SocialLink = ({link, icon:Icon}:{link:string | undefined, icon:IconType}) => {
    if (link !== undefined && link.length) {
      return (
        <Link href={link}>
          <Icon className='md:text-2xl text-xl'/>
        </Link>
      )
    }
  }

  const SocialLinks =() => {
    return (
      <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center">
        <SocialLink link={website} icon={BsGlobe}/>
        <SocialLink link={facebook} icon={BsFacebook}/>
        <SocialLink link={instagram} icon={BsInstagram}/>
        <SocialLink link={youtube} icon={BsYoutube}/>
        <SocialLink link={twitter} icon={BsTwitter}/>
        <SocialLink link={github} icon={BsGithub}/>
      </div>
    )
  }

  return (
    <div className={'md:w-[90%] md:mt-7 ' + className}>
      <p className='text-xl leading-7 '>{bio?.length ? bio : 'Nothing to read here'}</p>
      <SocialLinks />
      <p className='text-xl leading-7 text-dark-grey '>Joined on {fullDateGenerator(createdAt)}</p>
    </div>
  )
}

export default AboutUser;