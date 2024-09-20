"use client";
import { REACTION } from "@/constants/common";
import { Reaction } from "@/types/post";
import React, { useState } from "react";

const user = { username: "linh", name: "linh", imgSrc: "linh" };

const reactions: Reaction[] = [
  { user: user, emoji: REACTION.LIKE, label: "Thích", color: "text-blue-500" },
  { user: user, emoji: REACTION.LOVE, label: "Yêu thích", color: "text-red-500" },
  { user: user, emoji: REACTION.HAHA, label: "Haha", color: "text-yellow-500" },
  { user: user, emoji: REACTION.WOW, label: "Wow", color: "text-yellow-500" },
  { user: user, emoji: REACTION.SAD, label: "Buồn", color: "text-yellow-500" },
  { user: user, emoji: REACTION.ANGRY, label: "Tức giận", color: "text-red-500" },
];

const ReactionButton: React.FC = () => {
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(
    null
  );

  const handleReactionClick = (reaction: Reaction, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedReaction(reaction);
  };

  return (
    <button
      className="group relative w-1/3 rounded-md flex justify-center items-center"
      onClick={() => {
        if (selectedReaction) setSelectedReaction(null);
        else setSelectedReaction(reactions[0]);
      }}
    >
      {selectedReaction ? (
        <p
          className={`font-bold ${selectedReaction.color} hover:bg-brown-light rounded-md transition flex justify-center items-end duration-200 ease-in-out w-full h-full`}
        >
          <span className="text-2xl">{selectedReaction.emoji}</span>{" "}
          {selectedReaction.label}
        </p>
      ) : (
        <p className="font-bold hover:bg-brown-light rounded-md transition duration-200 ease-in-out w-full h-full">
          <span className="text-2xl opacity-50">👍</span> Thích
        </p>
      )}
      <div className="hidden group-hover:flex space-x-2 absolute top-[-52px] left-0 p-1 bg-brown-xlight border-brown-light border-[1px] rounded-full">
        {reactions.map((reaction) => (
          <div
            key={reaction.label}
            className="text-4xl cursor-pointer hover:scale-125 transform transition-transform duration-200"
            onClick={(event) => handleReactionClick(reaction, event)}
          >
            <span>{reaction.emoji}</span>
          </div>
        ))}
      </div>
    </button>
  );
};

export default ReactionButton;
