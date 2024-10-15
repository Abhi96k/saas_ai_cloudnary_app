import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Join Us Today</h1>
        <SignUp
          appearance={{
            elements: {
              rootBox: "space-y-4", 
            },
          }}
        />
      </div>
    </div>
  );
}
