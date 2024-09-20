"use client";
import Posting from "@/components/common/Posting";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const PostsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useParams();

  return (
    <section className=" min-h-10 mt-4 w-[65%] rounded-t-md m-auto flex gap-3 mb-4">
      <div className="w-[40%] flex flex-col gap-3">
        <div className="p-3 bg-brown-xlight rounded-md flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Giới thiệu</h2>
          <p>Đây là phần tiểu sử</p>
          <button className="font-bold w-full text-gray-800 bg-brown-light hover:shadow-md rounded-md py-1">
            Chỉnh sửa tiểu sử
          </button>
          <p>Học tại Đại học Bách Khoa Hà Nội</p>
          <button
            className="font-bold w-full text-gray-800 bg-brown-light hover:shadow-md rounded-md py-1"
            onClick={() => {
              router.push(`${pathname}/about`);
            }}
          >
            Chỉnh sửa chi tiết
          </button>
        </div>
        <div className="p-3 bg-brown-xlight rounded-md">
          <h2
            className="text-2xl font-bold hover:underline"
            onClick={() => router.push(`/${userId}/photos`)}
          >
            Ảnh
          </h2>
        </div>
        <div className="p-3 bg-brown-xlight rounded-md">
          <h2
            className="text-2xl font-bold hover:underline"
            onClick={() => router.push(`/${userId}/friends`)}
          >
            Bạn bè
          </h2>
        </div>
      </div>
      <div className="w-[60%] flex flex-col gap-3">
        <Posting/>
        <div className="w-full flex flex-col gap-3">

        </div>
      </div>
    </section>
  );
};

export default PostsSection;
