import { Carousel, Typography, Button } from "@material-tailwind/react";
 
function CarouselApp() {
  return (
    <div className="caroseal">
    <Carousel className="rounded-xl" autoplay ="true" loop="true">
      <div className="relative h-full w-full">
        <img
            src="https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image 2"
            className="h-full w-full"
          />
        
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4 ">
           
                  
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Cost Savings
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Optimized routes reduce fuel costs, vehicle wear and 
              tear, and overall operational expenses
            </Typography>
            
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
            src="https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image 2"
            className="h-full w-full object-cover"
          />
        
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4 ">
           
                  
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Time Efficiency
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Faster routes mean quicker deliveries, shorter travel 
              times, and improved customer satisfaction
            </Typography>
            
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
            src="https://plus.unsplash.com/premium_photo-1669613233557-1676c121fe73?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image 2"
            className="h-full w-full object-cover"
          />
        
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4 ">
           
                  
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Environmental Impact
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Reduced mileage contributes to a smaller carbon 
              footprint
            </Typography>
            
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
            src="https://images.unsplash.com/photo-1627666260660-812e4684a600?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image 2"
            className="h-full w-full object-cover"
          />
        
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4 ">
           
                  
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Real-Time Tracking
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Integrate with GPS data to provide real-time tracking and 
              dynamic route adjustments
            </Typography>
            
          </div>
        </div>
      </div>
    </Carousel>
    </div>
  );
}

export default CarouselApp;