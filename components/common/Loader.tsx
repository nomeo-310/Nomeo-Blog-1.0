'use client'

import { PuffLoader } from "react-spinners"

const Loader = ({fullScreen}: {fullScreen?: boolean}) => {
  return (
    <div className={(fullScreen ? "h-screen" : "h-cover") + " flex flex-col justify-center items-center"}>
      <PuffLoader size={80} color={'grey'} />
    </div>
  )
}

export default Loader;