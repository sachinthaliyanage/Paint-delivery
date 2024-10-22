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

// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import Header from "./Header";
// import About from "./About";
// import Carousel from "./Carousel";
// import Footer from "./Footer";
// import "./style.css";

// const Home: React.FC = () => {
//   const router = useRouter();

//   const handleLoginClick = () => {
//     router.push('/login');
//   };

//   return (
//     <>
//       <div className="my">
//         <Header onLoginClick={handleLoginClick} />
//         <About />
//       </div>
//       <Carousel/>
//       <Footer/>
//     </>
//   );
// };

// export default Home;

'use client';

import React from "react";
import Header from "./Header";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

const Home: React.FC = () => {
    const router = useRouter();

    const handleLoginClick = () => {
      router.push('/login');
    };

    return (
        <>
            <Header onLoginClick={handleLoginClick} />

            <div className="flex flex-wrap justify-center" style={{marginTop:"60px"}}>
                <div className="flex flex-col items-center justify-center" style={{height:"200px"}}>
                    <h1 className="text-4xl font-bold text-center text-slate-800 mb-6" style={{color: "#4592A5"}}>For any tech support and paint orders,<br /> contact us and we'll be thrilled to assist.</h1>
                </div>
                
                <div className="flex flex-row" >
                <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96" style={{backgroundColor:"#D8E1E0", margin:"10px"}}>
            <div class="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border flex items-center justify-center">
                <img
                    style={{width:"200px", height:"200px", objectFit:"contain"}}
                    src="Bandula.png" 
                    alt="card-image"
                    class="rounded-md"
                    style={{height:"500px"}}
                />
            </div>                                                             
            <div class="p-4 flex flex-col">
                <div class="mb-4 text-center">
                    <p class="text-slate-800 text-xl font-semibold mb-2">
                    Bandula Paint Center
                    </p>
                    <p class="text-cyan-600 text-xl font-semibold mb-4">
                    Address:Bandula Paint Center, Colombo Road, Negombo
                    </p>
                </div>
                <a class="text-slate-600 leading-normal font-light text-center" href="support@paintroutex.com">
                Email: support@paintroutex.com
                </a>
                <p class="text-slate-600 leading-normal font-light text-center">
                Contact No: 0777445448
                </p>                                                
            </div>
        </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;