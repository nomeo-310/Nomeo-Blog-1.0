'use client'

import React from 'react'

export interface withinPageProps {
  routes: string[]
  defaultActiveIndex: number
  defaultHidden: string[]
  children: React.ReactNode
}

const WithinPageNavigation = ({routes, defaultActiveIndex, defaultHidden, children }: withinPageProps) => {
  const [inPageIndex, setInpageIndex] = React.useState(0);

  let activeTabIndicatorRef = React.useRef<any>();
  let activeTabRef = React.useRef<any>();

  const changePageState = (btn:any, i:number) => {

    const { offsetWidth, offsetLeft } = btn;

    activeTabIndicatorRef.current.style.width = offsetWidth + 'px';
    activeTabIndicatorRef.current.style.left = offsetLeft + 'px';

    setInpageIndex(i) 
  }

  React.useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        { routes.map((route:string, index:number) => (
            <button key={route} className={'p-4 capitalize px-5 ' + (inPageIndex === index ? 'text-black' : 'text-black/30 ') + (defaultHidden.includes(route) ? 'md:hidden' : '')} onClick={(e:React.MouseEvent<HTMLButtonElement>) => {changePageState(e.target, index)}} ref={index === defaultActiveIndex ? activeTabRef : null}>
              {route}
            </button>
          ))
        }
        <hr ref={activeTabIndicatorRef} className='absolute bottom-0 duration-300'/>
      </div>
      {Array.isArray(children) ? children[inPageIndex] : children }
    </React.Fragment>
  )
}

export default WithinPageNavigation;