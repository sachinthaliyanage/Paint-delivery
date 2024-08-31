// "use client";

// import React, { useState } from "react";
// import Header from "./Header";
// import Popup from "./Popup";
// import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";
// import About from "./About";
// import Carousel from "./Carousel";
// import Footer from "./Footer";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import "./style.css";

// const Home: React.FC = () => {
//   const [isLoginActive, setIsLoginActive] = useState(false);
//   const [isPopupActive, setIsPopupActive] = useState(false);

//   const handleSignupClick = () => {
//     setIsLoginActive(true);
//   };

//   const handleLoginClick = () => {
//     setIsLoginActive(false);
//   };

//   const handlePopupClick = () => {
//     setIsPopupActive(true);
//   };

//   const handleCloseClick = () => {
//     setIsPopupActive(false);
//   };

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (res?.error) {
//         setError("Invalid Credentials");
//         return;
//       }

//       router.replace("dashboard");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setError("All fields are necessary.");
//       return;
//     }

//     try {
//       const resUserExists = await fetch("api/userExists", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const { user } = await resUserExists.json();

//       if (user) {
//         setError("User already exists.");
//         return;
//       }

//       const res = await fetch("api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       if (res.ok) {
//         const form = e.target as HTMLFormElement;
//         form.reset();
//         router.push("/");
//         handleLoginClick();
//       } else {
//         setError("Registration Failed");
//         console.error("Registration Failed", error);
//       }
//     } catch (error) {
//       console.log("Registration Failed", error);
//     }
//   };

//   return (
//     <>
//     <div className="my">
//       <Header onLoginClick={handlePopupClick} />
//       <About />
//       <Popup
//         isPopupActive={isPopupActive}
//         isLoginActive={isLoginActive}
//         onClose={handleCloseClick}
//       >
//         {isLoginActive ? (
//           <SignupForm
//             onLoginClick={handleLoginClick}
//             onSubmit={handleSubmit}
//             setName={setName}
//             setEmail={setEmail}
//             setPassword={setPassword}
//             error={error}
//           />
//         ) : (
//           <LoginForm
//             onSignupClick={handleSignupClick}
//             onLogin={handleLogin}
//             setEmail={setEmail}
//             setPassword={setPassword}
//             error={error}
//           />
//         )}
//       </Popup>
//     </div>
//     <Carousel/>
//     <Footer/>
//     </>
//   );
// };

// export default Home;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import About from "./About";
import Carousel from "./Carousel";
import Footer from "./Footer";
import "./style.css";

const Home: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <>
      <div className="my">
        <Header onLoginClick={handleLoginClick} />
        <About />
      </div>
      <Carousel/>
      <Footer/>
    </>
  );
};

export default Home;


