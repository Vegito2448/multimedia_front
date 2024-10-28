
export const HomeScreen = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
        <img src="https://picsum.photos/seed/picsum/1900/850" className="absolute top-0 left-0 min-h-full object-cover" alt="Background" />
        <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
          <div className="col-span-6">
            <span className="uppercase text-white text-xs font-bold mb-2 block">WE MANAGE CONTENT</span>
            <h1 className="text-white font-extrabold text-5xl mb-8">Manage Multimedia Content Efficiently</h1>
            <p className="text-stone-100 text-base">
              Our platform allows administrators to create and manage categories, themes, and permissions for multimedia content.
            </p>
            <button className="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">Get started</button>
          </div>
        </div>
      </div>
      <div className="bg-[#f7d0b6] py-20">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <div className="max-w-xl">
            <h2 className="font-black text-sky-950 text-3xl mb-4">Accessible Content for All Users</h2>
            <p className="text-base text-sky-950">Our platform ensures that content is accessible to all registered users, with permissions based on their roles.</p>
          </div>
          <button className="text-sky-950 uppercase py-3 text-base px-10 border border-sky-950 hover:bg-sky-950 hover:bg-opacity-10">Learn More</button>
        </div>
      </div>
      <div className="py-12 relative overflow-hidden bg-white">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="w-full flex flex-col items-end pr-16">
            <h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-right mb-12 mt-10">Manage Categories and Themes</h2>
            <div className="h-full mt-auto overflow-hidden relative">
              <img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt="Categories" />
            </div>
          </div>

          <div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
            <div className="relative z-20 pl-12">
              <h2 className="text-[#f7d0b6] font-black text-5xl leading-snug mb-10">Create and Assign Permissions</h2>
              <p className="text-white text-sm">
                Administrators can create new themes and assign content permissions, ensuring that users have the appropriate access.
              </p>
              <button className="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">Talk with an Expert</button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 relative overflow-hidden bg-white">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-[#f7d0b6] before:top-0 before:right-0">
            <div className="relative z-20 pl-12">
              <h2 className="text-sky-950 font-black text-5xl leading-snug mb-10">Content for Readers and Creators</h2>
              <p className="text-sky-950 text-sm">
                Readers can access all available content, while creators can add new content according to the assigned themes.
              </p>
              <button className="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10">Explore Content</button>
            </div>
          </div>
          <div className="w-full flex flex-col pl-16">
            <h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-left mb-12 mt-10">Organize and Manage Content</h2>
            <div className="h-full mt-auto overflow-hidden relative">
              <img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt="Content Management" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 relative overflow-hidden bg-white">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="w-full flex flex-col items-end pr-16">
            <h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-right mb-12 mt-10">Seamless Content Access</h2>
            <div className="h-full mt-auto overflow-hidden relative">
              <img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt="Content Access" />
            </div>
          </div>

          <div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
            <div className="relative z-20 pl-12">
              <h2 className="text-[#f7d0b6] font-black text-5xl leading-snug mb-10">Join Our Platform</h2>
              <p className="text-white text-sm">
                Register as a reader or creator and start accessing or contributing to our extensive multimedia library.
              </p>
              <button className="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};