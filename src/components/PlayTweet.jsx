import React from 'react'

export default function PlayTweet({tweet}) {
  return (
    <div className='c-tweet d-flex flex-direction-column'>
        <p>{tweet.content}</p>
        <span>{tweet.userName}</span>
    </div>
  )
}
