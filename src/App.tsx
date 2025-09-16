@@ .. @@
 function App() {
   // Simple routing based on URL path
   const currentPath = window.location.pathname;
   
   if (currentPath === '/blog') {
     return (
       <AuthProvider>
         <BlogProvider>
           <div className="min-h-screen bg-white">
             <BlogList />
           </div>
         </BlogProvider>
       </AuthProvider>
     );
   }
   
   if (currentPath === '/admin') {
     return (
       <AuthProvider>
         <BlogProvider>
           <BlogApp />
         </BlogProvider>
       </AuthProvider>
     );
   }
 
   return (
     <AuthProvider>
       <BlogProvider>
         <div className="min-h-screen bg-white">
           <Header />
           <Hero />
           <HowItWorks />
           <PartnersMarquee />
           <Benefits />
           <Testimonials />
           <CTA />
           <Footer />
         </div>
       </BlogProvider>
     </AuthProvider>
   );
 }