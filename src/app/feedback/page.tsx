"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import ResultsPage from "../resultpage/page";

enum VoteType {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
  NOVOTE = "NOVOTE",
}

const FeedbackSystem: React.FC = () => {
  const [votes, setVotes] = useState<Record<string, VoteType>>({});
  const [userName, setUserName] = useState<string>("");
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);
  const [lastVoted, setLastVoted] = useState<string | null>(null);
  const [aspects, setAspects] = useState<{ id: number; name: string }[]>([]);

  // const [showResults, setShowResults] = useState<boolean>(false); // 🔹 Toggle results page
 
  useEffect(() => {
    if (userName) {
      fetchUserData(userName);
    }
    fetchAspects();
    
  }, [userName]);
  console.log("Votes Data:", votes);

  const fetchUserData = async (name: string) => {
    try {
      const response = await axios.get(`/api/user/${name}`);
      if (response.data) {
        setVotes(response.data.votes || {});
        setUserHasVoted(response.data.hasVoted || false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setVotes({}); // 🔹 Prevent undefined votes
    }
  };

  const checkUserInDatabase = async (name: string): Promise<boolean> => {
    try {
      const response = await axios.post<{ exists: boolean }>("/api/user", {
        name,
      });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  };

  const storeVoteInDatabase = async (
    name: string,
    aspect: string,
    type: VoteType
  ) => {
    try {
      await axios.post("/api/votes", { name, aspect, type });
    } catch (error) {
      console.error("Error storing vote:", error);
    }
  };

  const fetchAspects = async () => {
    try {
      const res = await axios.get("/api/aspects");
      setAspects(res.data.map((a)=>a.name));
    } catch (error) {
      console.error("Error Fetching Aspects:", error);
    }
  };

  const handleVote = async (aspect: string, type: VoteType) => {
    if (userHasVoted) {
      alert("You have already voted!");
      return;
    }

    if (!userName.trim()) {
      alert("Please enter your name before voting.");
      return;
    }

    const userExists = await checkUserInDatabase(userName);
    if (!userExists) {
      alert("User does not exist in the database!");
      return;
    }

    setUserHasVoted(true);
    await storeVoteInDatabase(userName, aspect, type);

    fetchUserData(userName);
    setLastVoted(aspect);
  };

  return (
    <div className="container mx-auto text-center p-8">
      <h1 className="text-3xl font-bold mb-6">Code Review Feedback</h1>

        <div>
          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={userHasVoted}
            className="border-2 border-gray-300 p-2 rounded-md mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aspects.map((aspect, index) => (
              <div
                key={index}
                className={`p-6 border rounded-lg shadow-lg ${
                  lastVoted === aspect.name ? "bg-green-100" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-2">{aspect.name}</h2>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleVote(aspect.name, VoteType.UPVOTE)}
                    disabled={userHasVoted}
                  >
                    👍 Upvote
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleVote(aspect.name, VoteType.DOWNVOTE)}
                    disabled={userHasVoted}
                  >
                    👎 Downvote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default FeedbackSystem;
