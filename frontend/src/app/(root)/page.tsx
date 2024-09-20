import MainSection from "@/components/common/MainSection";
import UserPost from "@/components/common/Post";
import Posting from "@/components/common/Posting";
import LeftSidebar from "@/components/navbar/LeftSidebar";
import RightSidebar from "@/components/navbar/RightSidebar";
import { Post } from "@/types/post";
import React from "react";

export default function Home() {
  const posts: Post[] = [{id: 1, user: {username: 'linh', name:'linh', imgSrc: 'linh'}, description: 'hehehehe'}]
  return (
    <>
      <LeftSidebar/>
      <RightSidebar/>
      <MainSection>
        <Posting/>
        {
          posts.map(post => (
            <UserPost
              key={post.id}
              id={post.id}
              user={post.user}
              description={post.description}
            />
          ))
        }
      </MainSection>
    </>
  );
}
