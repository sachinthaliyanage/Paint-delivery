'use client';

import React from "react";
import Shopcard from "../Shopcard";
import Header from "../Header";
import { useRouter } from "next/navigation";

const Products: React.FC = () => {
    const router = useRouter();

    const handleLoginClick = () => {
      router.push('/login');
    };

    return (
        <>
            <Header onLoginClick={handleLoginClick} />

            <div className="flex flex-wrap justify-center" style={{marginTop:"60px"}}>
                <div className="flex flex-col items-center justify-center" style={{height:"200px"}}>
                    <h1 className="text-4xl font-bold text-center text-slate-800 mb-6" style={{color: "#4592A5"}}>Welcome to our vibrant world of premium <br /> paints and colors!</h1>
                </div>               
                    <>
                        <div className="flex flex-row">
                            <Shopcard 
                                title="Nippolac Vinyl Matt Emulsion (Colors)"
                                price="LKR 2,370.00 - LKR 37,492.50"
                                logo="https://nippon.s3.ap-southeast-1.amazonaws.com/products/c407d190bf1b4fd6ac9cc472d371163764972d90.jpg" 
                                para="Nippon Vinyl Silk creates a satin-smooth sheen in the interior of your home. It is highly washable with good scrub resistance and gives protection to walls from fungus and algae." 
                            />
                            <Shopcard 
                                title="Nippon Aqua Proof 7 in 1"
                                price="LKR 2,827.50 - LKR 48,675.00"
                                logo="https://nippon.s3.ap-southeast-1.amazonaws.com/products/b883cc229a9bed6ca9484539f6dd5f3ab9079011.jpg" 
                                para="Nippon Aqua Proof 7 in 1 is especially formulated water proofing paint forms an impermeable pigmented barrier to water in interior and exterior walls, blind walls etc." 
                            />
                        </div>
                        <div className="flex flex-row">
                            <Shopcard 
                                title="Anti-Mould Ceiling White"
                                price="LKR 1,980.00 - LKR 34,042.50" 
                                logo="https://nippon.s3.ap-southeast-1.amazonaws.com/products/547edf5c652a998f0600bdee4568a9f2f6859121.jpg" 
                                para="Nippon Anti-Mould Ceiling White is an environmentally favorable green product formulated with anti-mould properties, giving protection against most species of mould." 
                            />
                            <Shopcard 
                                title="Ominis 7 in 1 Emulsion Royal Silk Colours"
                                price="LKR 5000.00 - LKR 63,500.00" 
                                logo="https://multilac.com/uploads/products/1647286284.royal%20silk.png" 
                                para="Multilac platinum Omnis Royal Silk paint is a decorative and protective wall paint based on styrene acrylic for the interior use." 
                            />          
                        </div>
                        <div className="flex flex-row">
                            <Shopcard 
                                title="Multilac Premium Emulsion Paint"
                                price="LKR 3,350.00 - LKR 48,950.00" 
                                logo="https://multilac.com/uploads/products/1647283737.eulsion%20bw.png" 
                                para="Multilac Premium Sheen Emulsion is a specially formulated interior paint that gives your living space a stunning and long-lasting sheen appearance." 
                            />
                            <Shopcard 
                                title="Multilac Super Glitter Gold 24k (Solvent Base)"
                                price="LKR 400.00 - LKR 60,750.00"
                                logo="https://multilac.com/uploads/products/1633605120.24k%20super%20glitter%20gold.png" 
                                para="Multilac 24K glitter gold Paint can be used both Indoors & Outdoors for any kind of decorative work." 
                            />
                        </div> 
                        <div className="flex flex-row">
                            <Shopcard 
                                title="Multilac Glose Enamel Colours"
                                price="LKR 1000.00 - LKR 12,550.00" 
                                logo="https://multilac.com/uploads/products/1647285013.gloss%20enamel.png" 
                                para="Multilac Gloss Enamel is a powerful gloss, highly reflective paint with better rigidity and excellent water resistance." 
                            />                    
                            <Shopcard 
                                title="Apex Ultima"
                                price="LKR 3,450.00 - LKR 53,450.00"
                                logo="https://www.asianpaintscauseway.com/content/dam/ap-sri/products/exterior/packshots/Exterior-Apex-Ultima.png" 
                                para="Apex Ultima is a technological marvel designed with precision to give unparalleled protection to Sri Lankan homes against the harsh weather conditions." 
                            />                                                                              
                        </div>
                        <div className="flex flex-row">                    
                            <Shopcard 
                                title="Royale Health Shield"
                                price="LKR 3,850.00 - LKR 58,750.00"
                                logo="https://www.asianpaintscauseway.com/content/dam/ap-sri/products/interior/packshots/Interior-Royale-Health-Shield.png" 
                                para="Royale Health Shield Luxury Emulsion is a revolutionary indoor anti-Bacterial paint." 
                            />
                            <Shopcard 
                                title="Champ Interior Emulsion"
                                price="LKR 3,250.00 - LKR 46,950.00"      
                                logo="https://www.asianpaintscauseway.com/content/dam/ap-sri/products/interior/packshots/champ-pack-shot-1.png" 
                                para="The low VOC, Kids and adult friendly Champ interior emulsion, is an affordable choice for your beautiful home." 
                            />                                                                                   
                        </div>
                    </>
                
            </div>
        </>
    );
}

export default Products;