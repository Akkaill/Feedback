import React from "react";


const ResultsPage: React.FC<{ userName: string; votes: Vote[] }> = ({
  userName,
  votes,
}) => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Your Voting Summary</h1>
      <p className="text-lg mb-6">Votes cast by: <strong>{userName}</strong></p>

      {votes.length === 0 ? (
        <p className="text-gray-500">No votes recorded yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Aspect</th>
              <th className="border border-gray-300 px-4 py-2">Vote</th>
            </tr>
          </thead>
          <tbody>
            {votes.map((vote, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-300 px-4 py-2">
  {typeof vote.aspect === "object" && vote.aspect.name ? vote.aspect.name : String(vote.aspect)}
</td>

                <td
                  className={`border border-gray-300 px-4 py-2 font-semibold ${
                    vote.type === "UPVOTE" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {vote.type === "UPVOTE" ? "👍 Upvote" : "👎 Downvote"} {/* Render the vote type */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

  
  
export default ResultsPage;
