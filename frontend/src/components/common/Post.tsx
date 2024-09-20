import { Post } from '@/types/post'
import React from 'react'
import Avatar from './Avatar'
import dayjs from 'dayjs';
import ReactionButton from './ReactionButton';
import { REACTION } from '@/constants/common';

interface PostProps extends Post {}

const UserPost = ({ id, user, description, postDate, photoURLs, videoURLs, comments } : PostProps) => {
  return (
    <div className='w-full bg-brown-xlight min-h-24 rounded-md shadow-md px-3 pt-3 pb-1 flex flex-col'>
      <div className='flex gap-3'>
        <Avatar/>
        <div>
          <p className='font-bold'>{user.name}</p>
          <p className='text-gray-500 text-sm'>{postDate? dayjs(postDate).format('MMM D, YYYY') : dayjs().format('MMM D, YYYY')}</p>
        </div>
      </div>
      <p>{description}</p>
      <div className='w-full border-brown-light border-b-[1px] flex justify-between'>
        <div className='flex space-x-[-6px] mb-2'>
          <div className='rounded-full w-6 h-6 bg-brown-xlight text-lg'>{REACTION.HAHA}</div>
          <div className='rounded-full w-6 h-6 bg-brown-xlight text-lg'>{REACTION.LOVE}</div>
          <div className='rounded-full w-6 h-6 bg-brown-xlight text-lg'>{REACTION.WOW}</div>
        </div>
      </div>
      <div className='flex justify-between gap-1 pt-1'>
        <ReactionButton/>
        <button className='flex w-1/3 justify-center items-end font-bold gap-2 hover:bg-brown-light rounded-md'>
          <i className="fa-regular fa-comment text-gray-500 mb-[5px] text-xl"></i> <p>Bình luận</p>
        </button>
        <button className='flex w-1/3 justify-center items-end font-bold gap-2 hover:bg-brown-light rounded-md'>
          <i className="fa-solid fa-share text-gray-500 mb-[5px] text-xl"></i> <p>Chia sẻ</p>
        </button>
      </div>
    </div>
  )
}

export default UserPost