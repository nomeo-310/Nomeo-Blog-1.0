'use client'

import React from 'react'
import AnimationWrapper from '../common/AnimationWrapper'
import UserCard from './UserCard'
import { searchedUser } from './SearchClient'

interface Props {
  users:searchedUser[]
}

const SearchedUsers = ({users}:Props) => {
  return (
    <React.Fragment>
      { users.length > 0 && users.map((user:any, index: number) => (
        <AnimationWrapper key={`blog-${index}`} transition={{duration: 1, delay: index*0.1}}>
          <UserCard {...user}/>
        </AnimationWrapper>
        ))
      }
    </React.Fragment>
  )
}

export default SearchedUsers;
