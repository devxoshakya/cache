export default function Blocked() {
return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 px-4">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
        <h1>Account Blocked</h1>
        <p >Blocked by higher authorities due to suspicious actions; further attempts will have severe consequences.</p>
      </div>
    </div>
    );
  }

